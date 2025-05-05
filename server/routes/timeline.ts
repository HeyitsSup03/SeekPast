import express from 'express';
import { Request, Response } from 'express';
import { callGeminiAPI, createTimelinePrompt } from '../utils/deepseek.js';
import { GeminiMessage } from '../types/index.js';

const router = express.Router();

/**
 * POST /api/timeline
 * Generates a historical timeline for a given topic
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    const { topic } = req.body;
    
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }
    
    // Create system prompt for timeline generation
    const systemPrompt = createTimelinePrompt();
    
    // Create messages array for Gemini API
    const messages: GeminiMessage[] = [
      { role: 'model', content: systemPrompt },
      { role: 'user', content: topic }
    ];
    
    // Call Gemini API
    const aiResponse = await callGeminiAPI(messages);
    
    // Parse the response as JSON
    const events = JSON.parse(aiResponse);
    
    // Return response
    res.json({
      events,
      timestamp: Date.now()
    });
  } catch (error: any) {
    console.error('Error in timeline endpoint:', error);
    res.status(500).json({
      error: 'Failed to generate timeline',
      message: error.message
    });
  }
});

export default router;