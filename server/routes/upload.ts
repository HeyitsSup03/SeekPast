import express from 'express';
import fs from 'fs';
import path from 'path';
import Tesseract from 'tesseract.js';
import { fileURLToPath } from 'url';
import { callGeminiAPI, createDocumentAnalysisPrompt } from '../utils/deepseek.js';
import { GeminiMessage } from '../types/index.js';
import multer from 'multer';
import { Request, Response } from 'express';

const router = express.Router();

// Get the __dirname equivalent in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * POST /api/upload
 * Handles document uploads, extracts text, and returns AI analysis
 */
router.post('/', (req: Request, res: Response) => {
  const upload = req.upload.single('file');
  
  upload(req, res, async (err: multer.MulterError | Error | null) => {
    try {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Extract text from the uploaded file using Tesseract.js
      const { data: { text } } = await Tesseract.recognize(
        req.file.path,
        'eng',
        { logger: m => console.log(m) }
      );

      if (!text) {
        return res.status(400).json({ error: 'Could not extract text from the file' });
      }

      // Create system prompt for document analysis
      const systemPrompt = createDocumentAnalysisPrompt();

      // Create messages array for Gemini API
      const messages: GeminiMessage[] = [
        { role: 'model', content: systemPrompt },
        { role: 'user', content: text }
      ];

      // Call Gemini API for analysis
      const aiResponse = await callGeminiAPI(messages);

      // Clean up the uploaded file
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });

      // Return response
      res.json({
        message: aiResponse,
        timestamp: Date.now()
      });
    } catch (error: any) {
      console.error('Error in upload endpoint:', error);
      
      // Clean up file if it exists
      if (req.file && req.file.path) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
      
      res.status(500).json({
        error: 'Failed to process upload',
        message: error.message
      });
    }
  });
});

export default router;