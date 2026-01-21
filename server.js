import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads directory exists (outside dist to persist across builds)
const uploadsDir = join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    console.log('Creating uploads directory:', uploadsDir);
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// --- MIDDLEWARE FIRST ---

// Global request logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Content-Type: ${req.headers['content-type']}`);
    next();
});

// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const filename = req.query.filename || file.originalname;
        console.log('Multer saving file as:', filename);
        cb(null, filename);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }
});

// --- API ROUTES (Strictly before static files) ---

// Debug endpoint to verify deployment
app.get('/api/debug', (req, res) => {
    res.json({
        message: 'Server is running with latest code',
        timestamp: new Date().toISOString(),
        uploadsDir,
        nodeVersion: process.version,
        env: process.env.NODE_ENV
    });
});

// Image Upload Endpoint
app.post('/api/upload-image', (req, res) => {
    console.log('=== UPLOAD REQUEST START ===');
    console.log('Query params:', req.query);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Content-Length:', req.headers['content-length']);

    const uploadSingle = upload.single('file');

    uploadSingle(req, res, (err) => {
        if (err) {
            console.error('Multer upload error:', err);
            return res.status(500).json({ error: 'Upload middleware failed: ' + err.message });
        }

        if (!req.file) {
            console.error('No file in request. Body:', req.body);
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log(`Upload successful: ${req.file.filename} (${req.file.size} bytes)`);
        console.log('=== UPLOAD REQUEST END ===');

        res.json({ url: `/uploads/${req.file.filename}` });
    });
});

// Save Content Endpoint
app.post('/api/save-content', express.json({ limit: '50mb' }), (req, res) => {
    console.log('Save content request received');
    const contentPath = join(__dirname, 'dist', 'content.json');
    try {
        fs.writeFileSync(contentPath, JSON.stringify(req.body, null, 2));
        console.log('Content saved successfully');
        res.json({ success: true });
    } catch (error) {
        console.error('Error saving content:', error);
        res.status(500).json({ error: 'Failed to save content' });
    }
});

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', environment: process.env.NODE_ENV, uploadsDir });
});

// Explicit 404 for API
app.all('/api/*', (req, res) => {
    console.warn(`404 API Request: ${req.url}`);
    res.status(404).json({ error: 'API route not found' });
});

// --- STATIC FILES AFTER API ---
// Serve uploads directory (persistent across builds)
app.use('/uploads', express.static(uploadsDir));

// Serve built app
app.use(express.static('dist'));

// SPA Fallback
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Uploads directory: ${uploadsDir}`);
    console.log(`Node version: ${process.version}`);
});
