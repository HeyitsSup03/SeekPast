import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Upload, History, Search } from 'lucide-react';
import Header from '../components/Header';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <Header showNav={true} />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <section className="py-20 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <motion.div 
              className="mb-6 text-primary"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <History className="h-16 w-16 mx-auto" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Explore History with AI
            </motion.h1>
            
            <motion.p 
              className="text-xl text-text-muted mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              SEEKPAST uses advanced AI to help you research historical events, analyze documents, 
              and discover meaningful connections throughout human history.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link 
                to="/chat" 
                className="button-primary text-lg py-3 px-8"
              >
                <Search className="h-5 w-5" />
                Start Exploring the Past
              </Link>
            </motion.div>
          </motion.div>
        </section>
        
        <section className="py-16">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              className="text-3xl font-bold mb-12 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Powerful Features for Historical Research
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div 
                className="glassmorphism p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <div className="text-primary mb-4">
                  <BookOpen className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered Research</h3>
                <p className="text-text-muted">
                  Ask questions about any historical event, person, or era and get detailed, accurate responses based on historical knowledge.
                </p>
              </motion.div>
              
              <motion.div 
                className="glassmorphism p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="text-primary mb-4">
                  <Upload className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Document Analysis</h3>
                <p className="text-text-muted">
                  Upload historical documents or images and get intelligent summaries and analysis extracted from their contents.
                </p>
              </motion.div>
              
              <motion.div 
                className="glassmorphism p-6 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <div className="text-primary mb-4">
                  <History className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Timeline Generation</h3>
                <p className="text-text-muted">
                  Generate visual timelines for any historical topic to see events in chronological context with key details.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="glassmorphism p-8 rounded-xl flex flex-col lg:flex-row items-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              <div className="lg:w-2/3">
                <h2 className="text-2xl font-bold mb-4">Powered by Advanced AI Technology</h2>
                <p className="text-text-muted mb-4">
                SEEKPAST harnesses cutting-edge artificial intelligence to deliver accurate, 
                nuanced historical insights. From ancient civilizations to modern events, 
                our system uncovers patterns, connections, and meanings that traditional research 
                methods may overlook.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">Accurate Research</span>
                  <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm">Historical Context</span>
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">Verifiable Sources</span>
                  <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm">Chronological Analysis</span>
                </div>
              </div>
              <div className="lg:w-1/3 flex justify-center">
                <motion.div
                  className="relative w-48 h-48 rounded-full bg-gradient-to-r from-primary to-secondary p-1"
                  animate={{ 
                    rotate: [0, 360],
                    boxShadow: [
                      '0 0 20px rgba(20, 184, 166, 0.3)',
                      '0 0 30px rgba(20, 184, 166, 0.5)',
                      '0 0 20px rgba(20, 184, 166, 0.3)'
                    ]
                  }}
                  transition={{ 
                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <History className="h-20 w-20 text-primary" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <footer className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 text-center text-text-dark">
          <p>© 2025 SEEKPAST — AI-Powered Historical Research Tool</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;