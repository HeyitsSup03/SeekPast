import React from 'react';
import { X, BookOpen, Upload, History, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FirstTimeModalProps {
  onClose: () => void;
}

const FirstTimeModal: React.FC<FirstTimeModalProps> = ({ onClose }) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80">
        <motion.div 
          className="relative glassmorphism max-w-lg rounded-xl overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <button 
            className="absolute top-3 right-3 text-text hover:text-primary"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Welcome to SEEKPAST</h2>
            <p className="text-text-muted mb-6">
              Your AI-powered time machine for historical research. Here's how to get started:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MessageCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-text">Ask Historical Questions</h3>
                  <p className="text-sm text-text-muted">
                    Just type your question in the chat and get instant, well-researched answers from our AI.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Upload className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-text">Upload Documents</h3>
                  <p className="text-sm text-text-muted">
                    Upload historical images or PDFs to extract and analyze their content.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <History className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-text">Generate Timelines</h3>
                  <p className="text-sm text-text-muted">
                    Ask for a chronological timeline of any historical event or period.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <BookOpen className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-text">Filter by Era</h3>
                  <p className="text-sm text-text-muted">
                    Select specific historical periods to focus your research.
                  </p>
                </div>
              </div>
            </div>
            
            <button 
              className="button-primary w-full"
              onClick={onClose}
            >
              Get Started
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default FirstTimeModal;