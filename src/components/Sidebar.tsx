import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, MessageSquare, Trash2 } from 'lucide-react';
import { HISTORICAL_ERAS } from '../constants';
import { useChat } from '../context/ChatContext';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { 
    presetQuestions, 
    sendMessage, 
    selectedEra, 
    setSelectedEra,
    clearChat
  } = useChat();
  
  const [showEraFilter, setShowEraFilter] = React.useState(false);
  
  // Filter preset questions by selected era
  const filteredQuestions = selectedEra
    ? presetQuestions.filter(q => q.era === selectedEra)
    : presetQuestions;

  const sidebarVariants = {
    hidden: { x: '-100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 40
      }
    }
  };

  const handlePresetClick = (question: string) => {
    sendMessage(question);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleClearChat = () => {
    clearChat();
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-background/80 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            className="fixed top-0 left-0 bottom-0 w-72 glassmorphism z-50 flex flex-col pt-16"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-text">Historical Research</h2>
              <button onClick={onClose} className="lg:hidden text-text hover:text-primary">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Era filter section */}
              <div className="space-y-2">
                <button 
                  className="w-full flex items-center justify-between text-text hover:text-primary"
                  onClick={() => setShowEraFilter(!showEraFilter)}
                >
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter by Era</span>
                  </div>
                  <span>{showEraFilter ? '−' : '+'}</span>
                </button>
                
                {showEraFilter && (
                  <div className="pl-6 space-y-1 animate-in fade-in duration-200">
                    <button
                      className={cn(
                        "w-full text-left px-2 py-1 rounded text-sm",
                        selectedEra === null 
                          ? "bg-primary/20 text-primary" 
                          : "hover:bg-background-lighter/30 text-text-muted"
                      )}
                      onClick={() => setSelectedEra(null)}
                    >
                      All Eras
                    </button>
                    
                    {HISTORICAL_ERAS.map(era => (
                      <button
                        key={era.id}
                        className={cn(
                          "w-full text-left px-2 py-1 rounded text-sm flex flex-col",
                          selectedEra === era.id 
                            ? "bg-primary/20 text-primary" 
                            : "hover:bg-background-lighter/30 text-text-muted"
                        )}
                        onClick={() => setSelectedEra(era.id)}
                      >
                        <span>{era.name}</span>
                        <span className="text-xs text-text-dark">{era.years}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Preset questions */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-text-muted flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    Suggested Questions
                  </h3>
                  {selectedEra && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">
                      {HISTORICAL_ERAS.find(era => era.id === selectedEra)?.name || ''}
                    </span>
                  )}
                </div>
                
                <div className="space-y-1">
                  {filteredQuestions.length > 0 ? (
                    filteredQuestions.map(question => (
                      <button
                        key={question.id}
                        className="w-full text-left px-3 py-2 rounded text-sm glassmorphism hover:bg-background-lighter/30 transition-colors"
                        onClick={() => handlePresetClick(question.text)}
                      >
                        {question.text}
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-text-dark italic px-3 py-2">
                      No suggestions for this era.
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Footer actions */}
            <div className="p-4 border-t border-white/10">
              <button 
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded glassmorphism hover:bg-red-500/20 transition-colors text-red-400"
                onClick={handleClearChat}
              >
                <Trash2 className="h-4 w-4" />
                Clear Conversation
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;