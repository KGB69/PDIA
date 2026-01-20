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

// API endpoint for image upload (Raw binary stream)
app.post('/api/upload-image', (req, res) => {
    console.log('Upload request received:', req.query.filename);

    const filename = req.query.filename;
    if (!filename) {
        return res.status(400).json({ error: 'Filename required' });
    }

    const filePath = join(uploadsDir, filename);
    console.log('Writing to:', filePath);

    const writeStream = fs.createWriteStream(filePath);

    req.pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Upload complete:', filename);
        res.json({ url: `/uploads/${filename}` });
    });

    writeStream.on('error', (err) => {
        console.error('Upload write error:', err);
        res.status(500).json({ error: 'Upload failed during write' });
    });

    req.on('error', (err) => {
        console.error('Request stream error:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Upload request failed' });
        }
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
