import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      tailwindcss(),
      {
        name: 'save-content-plugin',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.method === 'POST' && req.url === '/api/save-content') {
              let body = '';
              req.on('data', chunk => {
                body += chunk.toString();
              });
              req.on('end', () => {
                try {
                  const filePath = path.resolve(__dirname, 'content.json');
                  fs.writeFileSync(filePath, body, 'utf8');
                  res.statusCode = 200;
                  res.end('Saved successfully');
                } catch (err) {
                  res.statusCode = 500;
                  res.end('Error saving file');
                }
              });
            } else if (req.method === 'POST' && req.url?.startsWith('/api/upload-image')) {
              const url = new URL(req.url, `http://${req.headers.host}`);
              const filename = url.searchParams.get('filename');
              if (!filename) {
                res.statusCode = 400;
                res.end('Filename required');
                return;
              }

              const chunks: any[] = [];
              req.on('data', chunk => chunks.push(chunk));
              req.on('end', () => {
                try {
                  const buffer = Buffer.concat(chunks);
                  const uploadDir = path.resolve(__dirname, 'public/uploads');
                  if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir, { recursive: true });
                  }
                  const filePath = path.join(uploadDir, filename);
                  fs.writeFileSync(filePath, buffer);
                  res.statusCode = 200;
                  res.end(JSON.stringify({ url: `/uploads/${filename}` }));
                } catch (err) {
                  res.statusCode = 500;
                  res.end('Error uploading file');
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
