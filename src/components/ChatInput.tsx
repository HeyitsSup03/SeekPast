import React, { useState, useRef } from 'react';
import { Send, Upload, History } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../constants';

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  onUploadFile: (file: File) => Promise<void>;
  onRequestTimeline: () => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onUploadFile,
  onRequestTimeline,
  isLoading
}) => {
  const [message, setMessage] = useState('');
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      await onSendMessage(message);
      setMessage('');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const fileExt = file.name.split('.').pop()?.toLowerCase() || '';
    if (!ALLOWED_FILE_TYPES.includes(fileExt)) {
      setFileError(`Unsupported file type. Please upload: ${ALLOWED_FILE_TYPES.join(', ')}`);
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      return;
    }

    setFileError(null);
    await onUploadFile(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="p-4 border-t border-white/10">
      {fileError && (
        <div className="bg-red-500/20 text-text p-2 rounded-lg mb-2 text-sm">
          {fileError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={ALLOWED_FILE_TYPES.map(ext => `.${ext}`).join(',')}
          className="hidden"
        />
        
        <button
          type="button"
          onClick={handleFileUploadClick}
          disabled={isLoading}
          className="p-3 rounded-lg glassmorphism hover:bg-background-lighter/30 transition-colors disabled:opacity-50"
          title="Upload document or image"
        >
          <Upload className="h-5 w-5 text-primary" />
        </button>
        
        <button
          type="button"
          onClick={onRequestTimeline}
          disabled={isLoading}
          className="p-3 rounded-lg glassmorphism hover:bg-background-lighter/30 transition-colors disabled:opacity-50"
          title="Generate timeline"
        >
          <History className="h-5 w-5 text-primary" />
        </button>
        
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask about any historical event, person, or era..."
          className="input-primary flex-1"
          disabled={isLoading}
        />
        
        <motion.button
          type="submit"
          disabled={!message.trim() || isLoading}
          className={cn(
            "p-3 rounded-lg glassmorphism transition-colors",
            message.trim() && !isLoading 
              ? "bg-primary hover:bg-primary-dark" 
              : "opacity-50 cursor-not-allowed"
          )}
          whileTap={{ scale: 0.95 }}
        >
          <Send className="h-5 w-5 text-text" />
        </motion.button>
      </form>
    </div>
  );
};

export default ChatInput;