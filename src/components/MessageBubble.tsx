import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot } from 'lucide-react';
import { Message } from '../types';
import { formatDate } from '../lib/utils';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUserMessage = message.role === 'user';
  
  const bubbleVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 500,
        damping: 30 
      }
    }
  };
  
  const bubbleClass = isUserMessage 
    ? 'message-user ml-auto'
    : 'message-ai mr-auto';
  
  return (
    <motion.div
      className={`flex max-w-3xl ${isUserMessage ? 'justify-end ml-auto' : 'justify-start mr-auto'}`}
      initial="hidden"
      animate="visible"
      variants={bubbleVariants}
    >
      <div className={`flex items-start gap-3 mb-4 ${isUserMessage ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center glassmorphism ${isUserMessage ? 'bg-primary/20' : 'bg-secondary/20'}`}>
          {isUserMessage ? (
            <User className="h-4 w-4 text-primary" />
          ) : (
            <Bot className="h-4 w-4 text-secondary" />
          )}
        </div>
        
        <div className="flex flex-col gap-1">
          <div className={bubbleClass}>
            {message.isLoading ? (
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-text rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-text rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-text rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            ) : (
              // Display message content with paragraph breaks
              message.content.split('\n').map((text, i) => (
                <React.Fragment key={i}>
                  {text}
                  {i < message.content.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))
            )}
          </div>
          <span className={`text-xs text-text-dark ${isUserMessage ? 'text-right' : 'text-left'}`}>
            {formatDate(message.timestamp)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;