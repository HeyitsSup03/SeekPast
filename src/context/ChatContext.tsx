import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { Message, ChatContextType, PresetQuestion, TimelineEvent } from '../types';
import { API_ROUTES } from '../constants';
import { generateId } from '../lib/utils';
import { INITIAL_PRESET_QUESTIONS } from '../constants';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [presetQuestions, setPresetQuestions] = useState<PresetQuestion[]>(INITIAL_PRESET_QUESTIONS);
  const [selectedEra, setSelectedEra] = useState<string | null>(null);

  // Fetch preset questions from API
  React.useEffect(() => {
    async function fetchPresetQuestions() {
      try {
        const response = await axios.get(API_ROUTES.PRESETS);
        if (response.data && response.data.length > 0) {
          setPresetQuestions(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch preset questions:', error);
        // Fallback to initial preset questions already set
      }
    }
    
    fetchPresetQuestions();
  }, []);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      content,
      role: 'user',
      timestamp: Date.now(),
    };

    // Add temporary assistant message with loading state
    const tempAssistantMessage: Message = {
      id: generateId(),
      content: '',
      role: 'assistant',
      timestamp: Date.now(),
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, tempAssistantMessage]);
    setIsLoading(true);

    try {
      const response = await axios.post(API_ROUTES.CHAT, {
        message: content,
        era: selectedEra,
      });

      // Update assistant message with response
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempAssistantMessage.id
            ? { ...msg, content: response.data.message, isLoading: false }
            : msg
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Update with error message
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempAssistantMessage.id
            ? { 
                ...msg, 
                content: 'Sorry, there was an error processing your request. Please try again later.',
                isLoading: false 
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const uploadDocument = async (file: File) => {
    // Add user message about the upload
    const userMessage: Message = {
      id: generateId(),
      content: `I'm uploading a document: ${file.name}`,
      role: 'user',
      timestamp: Date.now(),
    };

    // Add temporary assistant message with loading state
    const tempAssistantMessage: Message = {
      id: generateId(),
      content: '',
      role: 'assistant',
      timestamp: Date.now(),
      isLoading: true,
    };

    setMessages(prev => [...prev, userMessage, tempAssistantMessage]);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(API_ROUTES.UPLOAD, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update assistant message with response
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempAssistantMessage.id
            ? { ...msg, content: response.data.summary, isLoading: false }
            : msg
        )
      );
    } catch (error) {
      console.error('Error uploading document:', error);
      
      // Update with error message
      setMessages(prev => 
        prev.map(msg => 
          msg.id === tempAssistantMessage.id
            ? { 
                ...msg, 
                content: 'Sorry, there was an error processing your document. Please try again with a different file.',
                isLoading: false 
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const generateTimeline = async (topic: string): Promise<TimelineEvent[]> => {
    try {
      const response = await axios.post(API_ROUTES.TIMELINE, { topic });
      return response.data.events;
    } catch (error) {
      console.error('Error generating timeline:', error);
      return [];
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const value: ChatContextType = {
    messages,
    isLoading,
    presetQuestions,
    selectedEra,
    sendMessage,
    uploadDocument,
    generateTimeline,
    setSelectedEra,
    clearChat,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}