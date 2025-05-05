import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock } from 'lucide-react';
import { TimelineEvent } from '../types';
import { useChat } from '../context/ChatContext';

interface TimelineModalProps {
  onClose: () => void;
}

const TimelineModal: React.FC<TimelineModalProps> = ({ onClose }) => {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const { generateTimeline } = useChat();

  const handleGenerateTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const events = await generateTimeline(topic);
      if (events.length === 0) {
        setError('Could not generate timeline. Please try a different topic.');
      } else {
        setTimelineEvents(events);
      }
    } catch (err) {
      setError('An error occurred while generating the timeline.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80">
      <motion.div 
        className="relative glassmorphism max-w-3xl w-full rounded-xl max-h-[90vh] flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-primary flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Historical Timeline Generator
          </h2>
          <button 
            className="text-text hover:text-primary transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto flex-1">
          <form onSubmit={handleGenerateTimeline} className="mb-6">
            <div className="mb-4">
              <label htmlFor="topic" className="block text-sm font-medium text-text-muted mb-1">
                Enter a historical topic, event, or period
              </label>
              <input
                type="text"
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., World War II, Ancient Egypt, The Renaissance"
                className="input-primary"
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              disabled={!topic.trim() || isLoading}
              className="button-primary w-full"
            >
              {isLoading ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  Generating Timeline...
                </>
              ) : (
                'Generate Timeline'
              )}
            </button>
          </form>
          
          {error && (
            <div className="p-3 bg-red-500/20 text-text rounded-lg mb-4">
              {error}
            </div>
          )}
          
          {timelineEvents.length > 0 && (
            <div className="relative pl-8 border-l-2 border-primary/50 space-y-6">
              <h3 className="text-lg font-medium text-primary mb-4 -ml-8 border-l-0">
                Timeline: {topic}
              </h3>
              
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute -left-10 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-text"></div>
                  </div>
                  
                  <div className="glassmorphism p-3 rounded-lg">
                    <div className="text-primary font-medium">{event.date}</div>
                    <h4 className="font-semibold text-text mb-1">{event.title}</h4>
                    <p className="text-text-muted text-sm">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineModal;