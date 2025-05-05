// Express extended Request interface
declare global {
  namespace Express {
    interface Request {
      upload: any;
    }
  }
}

export interface ChatRequest {
  message: string;
  era?: string;
}

export interface ChatResponse {
  message: string;
  timestamp: number;
}

export interface TimelineRequest {
  topic: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface TimelineResponse {
  events: TimelineEvent[];
  timestamp: number;
}

export interface GeminiMessage {
  role: 'user' | 'model';
  content: string;
}

export interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DeepSeekRequest {
  model: string;
  messages: DeepSeekMessage[];
  temperature?: number;
  max_tokens?: number;
}

export interface DeepSeekChoice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
}

export interface DeepSeekResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: DeepSeekChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface UploadRequest {
  file: Express.Multer.File;
}

export interface UploadResponse {
  message: string;
  timestamp: number;
}

export interface PresetQuestion {
  id: string;
  text: string;
  era?: string;
}

export interface PresetRequest {
  name: string;
  description: string;
}

export interface PresetResponse {
  id: string;
  name: string;
  description: string;
  timestamp: number;
}
