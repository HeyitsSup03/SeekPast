import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { Request, Response, NextFunction } from 'express';

// Load environment variables first
dotenv.config();

// Create express app
const app = express();
const PORT = process.env.PORT || 3001;

// Get the __dirname equivalent in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Make multer available to route handlers
app.use((req, res, next) => {
  req.upload = upload;
  next();
});

// Import routes
let chatRoutes, uploadRoutes, presetRoutes, timelineRoutes;

try {
  console.log('Starting to import routes...');
  
  console.log('Importing chat route...');
  chatRoutes = (await import('./routes/chat.js')).default;
  console.log('Chat route imported successfully');
  
  console.log('Importing upload route...');
  uploadRoutes = (await import('./routes/upload.js')).default;
  console.log('Upload route imported successfully');
  
  console.log('Importing presets route...');
  presetRoutes = (await import('./routes/presets.js')).default;
  console.log('Presets route imported successfully');
  
  console.log('Importing timeline route...');
  timelineRoutes = (await import('./routes/timeline.js')).default;
  console.log('Timeline route imported successfully');
  
  // Routes
  app.use('/api/chat', chatRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/presets', presetRoutes);
  app.use('/api/timeline', timelineRoutes);
  
  console.log('All routes mounted successfully');
} catch (error: any) {
  console.error('Error importing routes:', error);
  if (error.stack) {
    console.error('Stack trace:', error.stack);
  }
  process.exit(1);
}

// Default route
app.get('/', (req, res) => {
  res.send('SEEKPAST API is running');
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});

export default app;
