import { HistoricalEra, PresetQuestion } from '../types';

export const HISTORICAL_ERAS: HistoricalEra[] = [
  { id: 'ancient', name: 'Ancient History', years: '3000 BCE - 500 CE' },
  { id: 'medieval', name: 'Medieval Period', years: '500 - 1500 CE' },
  { id: 'renaissance', name: 'Renaissance', years: '1300 - 1600 CE' },
  { id: 'early-modern', name: 'Early Modern Period', years: '1500 - 1800 CE' },
  { id: 'industrial', name: 'Industrial Age', years: '1760 - 1914 CE' },
  { id: 'ww1-ww2', name: 'World Wars Era', years: '1914 - 1945 CE' },
  { id: 'cold-war', name: 'Cold War Era', years: '1945 - 1991 CE' },
  { id: 'modern', name: 'Modern History', years: '1991 - Present' },
];

export const INITIAL_PRESET_QUESTIONS: PresetQuestion[] = [
  { id: '1', text: 'What caused the French Revolution?', era: 'early-modern' },
  { id: '2', text: 'How did Ancient Egypt build the pyramids?', era: 'ancient' },
  { id: '3', text: 'What were the causes of World War I?', era: 'ww1-ww2' },
  { id: '4', text: 'How did the Black Death affect Europe?', era: 'medieval' },
  { id: '5', text: 'What was the Space Race?', era: 'cold-war' },
  { id: '6', text: 'How did the Renaissance change art?', era: 'renaissance' },
  { id: '7', text: 'Who were the major philosophers of Ancient Greece?', era: 'ancient' },
  { id: '8', text: 'What was the significance of the Industrial Revolution?', era: 'industrial' },
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ROUTES = {
  CHAT: `${API_BASE_URL}/api/chat`,
  UPLOAD: `${API_BASE_URL}/api/upload`,
  PRESETS: `${API_BASE_URL}/api/presets`,
  TIMELINE: `${API_BASE_URL}/api/timeline`,
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = ['pdf', 'jpg', 'jpeg', 'png'];
