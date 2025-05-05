import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import Sidebar from '../components/Sidebar';
import TimelineModal from '../components/TimelineModal';
import { useChat } from '../context/ChatContext';

const ChatPage: React.FC = () => {
  const { messages, isLoading, sendMessage, uploadDocument } = useChat();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSendMessage = async (message: string) => {
    await sendMessage(message);
  };

  const handleUploadFile = async (file: File) => {
    await uploadDocument(file);
  };

  const handleRequestTimeline = () => {
    setShowTimelineModal(true);
  };

  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <Header 
        toggleSidebar={toggleSidebar} 
        isSidebarOpen={isSidebarOpen} 
        showNav={false}
      />
      
      <div className="flex-1 flex pt-16">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        
        <main className="flex-1 flex flex-col h-[calc(100vh-4rem)]">
          <div className="flex-1 overflow-y-auto p-4 pt-6">
            {messages.length === 0 ? (
              <motion.div 
                className="h-full flex flex-col items-center justify-center text-center p-6 max-w-lg mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-primary mb-4">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 5, 0, -5, 0]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4"/>
                      <path d="M12 2v2"/>
                      <path d="M12 20v2"/>
                      <path d="m4.9 4.9 1.4 1.4"/>
                      <path d="m17.7 17.7 1.4 1.4"/>
                      <path d="M2 12h2"/>
                      <path d="M20 12h2"/>
                      <path d="m6.3 17.7-1.4 1.4"/>
                      <path d="m19.1 4.9-1.4 1.4"/>
                    </svg>
                  </motion.div>
                </div>
                
                <h2 className="text-2xl font-bold mb-3">Begin Your Historical Journey</h2>
                <p className="text-text-muted mb-6">
                  Ask any question about history, upload documents, or generate timelines to explore the past.
                </p>
                
                <div className="glassmorphism p-4 rounded-lg w-full">
                  <h3 className="font-medium mb-2">Try asking:</h3>
                  <ul className="space-y-2 text-left">
                    <li className="p-2 hover:bg-primary/10 rounded cursor-pointer" onClick={() => sendMessage("What were the main causes of World War I?")}>
                      What were the main causes of World War I?
                    </li>
                    <li className="p-2 hover:bg-primary/10 rounded cursor-pointer" onClick={() => sendMessage("How did Ancient Egypt build the pyramids?")}>
                      How did Ancient Egypt build the pyramids?
                    </li>
                    <li className="p-2 hover:bg-primary/10 rounded cursor-pointer" onClick={() => sendMessage("Explain the significance of the French Revolution")}>
                      Explain the significance of the French Revolution
                    </li>
                  </ul>
                </div>
              </motion.div>
            ) : (
              <>
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          
          <ChatInput 
            onSendMessage={handleSendMessage}
            onUploadFile={handleUploadFile}
            onRequestTimeline={handleRequestTimeline}
            isLoading={isLoading}
          />
        </main>
      </div>

      {showTimelineModal && (
        <TimelineModal onClose={() => setShowTimelineModal(false)} />
      )}
    </div>
  );
};

export default ChatPage;