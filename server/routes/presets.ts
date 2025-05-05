import express from 'express';
import { PresetQuestion } from '../types/index.js';

const router = express.Router();

// Preset questions
const presetQuestions: PresetQuestion[] = [
  { id: '1', text: 'What caused the French Revolution?', era: 'early-modern' },
  { id: '2', text: 'How did Ancient Egypt build the pyramids?', era: 'ancient' },
  { id: '3', text: 'What were the major causes of World War I?', era: 'ww1-ww2' },
  { id: '4', text: 'How did the Black Death affect medieval Europe?', era: 'medieval' },
  { id: '5', text: 'What was the Space Race and why was it significant?', era: 'cold-war' },
  { id: '6', text: 'How did the Renaissance change European art and culture?', era: 'renaissance' },
  { id: '7', text: 'Who were the major philosophers of Ancient Greece?', era: 'ancient' },
  { id: '8', text: 'What were the key innovations of the Industrial Revolution?', era: 'industrial' },
  { id: '9', text: 'How did the Cold War affect international relations?', era: 'cold-war' },
  { id: '10', text: 'What led to the fall of the Roman Empire?', era: 'ancient' },
  { id: '11', text: 'How did the Enlightenment influence modern political thought?', era: 'early-modern' },
  { id: '12', text: 'What was life like for common people in medieval Europe?', era: 'medieval' },
  { id: '13', text: 'How did World War II change the global power structure?', era: 'ww1-ww2' },
  { id: '14', text: 'What were the causes and effects of the Great Depression?', era: 'ww1-ww2' },
  { id: '15', text: 'How has technology changed society in the modern era?', era: 'modern' }
];

/**
 * GET /api/presets
 * Returns preset historical questions
 */
router.get('/', (req, res) => {
  res.json(presetQuestions);
});

export default router;