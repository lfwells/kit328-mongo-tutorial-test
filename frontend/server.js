import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Tell Express to listen to all network interfaces, not just container-local traffic
app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
});