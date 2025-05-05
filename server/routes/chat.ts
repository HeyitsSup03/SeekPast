import express from 'express';
import { ChatRequest, ChatResponse, GeminiMessage } from '../types/index.js';
import { callGeminiAPI, createHistoricalSystemPrompt } from '../utils/deepseek.js';

const router = express.Router();

/**
 * POST /api/chat
 * Handles chat requests and returns AI responses
 */
router.post('/', async (req, res) => {
  try {
    console.log('Received chat request:', req.body);
    const { message, era } = req.body as ChatRequest;
    
    if (!message) {
      console.log('Error: Message is missing from request');
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Create system prompt based on era if provided
    const systemPrompt = createHistoricalSystemPrompt(era);
    console.log('Created system prompt:', systemPrompt);
    
    // Create messages array for Gemini API
    const messages: GeminiMessage[] = [
      { role: 'model', content: systemPrompt },
      { role: 'user', content: message }
    ];
    
    console.log('Calling Gemini API with messages:', messages);
    
    // Call Gemini API
    const aiResponse = await callGeminiAPI(messages);
    console.log('Received response from Gemini API:', aiResponse);
    
    // Return response
    const response: ChatResponse = {
      message: aiResponse,
      timestamp: Date.now()
    };
    
    res.json(response);
  } catch (error: any) {
    console.error('Error in chat endpoint:', error);
    // Send more detailed error information
    res.status(500).json({
      error: 'Failed to process chat request',
      message: error.message,
      details: error.response?.data || 'No additional details available'
    });
  }
});

export default router;
