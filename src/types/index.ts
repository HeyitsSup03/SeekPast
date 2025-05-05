// API Response Types
export interface ChatResponse {
  message: string;
  timestamp: number;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
}

export interface TimelineResponse {
  events: TimelineEvent[];
}

export interface PresetQuestion {
  id: string;
  text: string;
  era?: string;
}

// Message Types
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
  isLoading?: boolean;
}

export interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  presetQuestions: PresetQuestion[];
  selectedEra: string | null;
  sendMessage: (content: string) => Promise<void>;
  uploadDocument: (file: File) => Promise<void>;
  generateTimeline: (topic: string) => Promise<TimelineEvent[]>;
  setSelectedEra: (era: string | null) => void;
  clearChat: () => void;
}

// Historical Eras
export interface HistoricalEra {
  id: string;
  name: string;
  years: string;
}