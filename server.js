import express from 'express';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files first
app.use(express.static('dist'));

// Ensure uploads directory exists
const uploadsDir = join(__dirname, 'dist', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        // Use the filename query param if provided, otherwise fallback to originalname
        const filename = req.query.filename || file.originalname;
        console.log('Multer saving file as:', filename);
        cb(null, filename);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// API endpoint for image upload (Multipart/form-data via Multer)
app.post('/api/upload-image', (req, res) => {
    // Manually handle upload to catch errors
    const uploadSingle = upload.single('file');

    uploadSingle(req, res, (err) => {
        if (err) {
            console.error('Multer upload error:', err);
            return res.status(500).json({ error: 'Upload failed: ' + err.message });
        }

        if (!req.file) {
            console.error('No file in request');
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('Upload successful:', req.file.filename);
        res.json({ url: `/uploads/${req.file.filename}` });
    });
});

// API endpoint for saving content (Use JSON middleware only here)
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

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', environment: process.env.NODE_ENV });
});

// Handle 404 for undefined API routes to prevent SPA fallback confusion
app.all('/api/*', (req, res) => {
    res.status(404).json({ error: 'API route not found' });
});

// Serve index.html for all other routes (SPA)
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Uploads directory: ${uploadsDir}`);
});
