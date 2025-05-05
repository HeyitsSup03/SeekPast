import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, History } from 'lucide-react';
import Header from '../components/Header';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-text flex flex-col">
      <Header showNav={true} />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-12 flex items-center justify-center">
        <motion.div 
          className="max-w-md w-full text-center glassmorphism p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <motion.div
              className="inline-block text-primary"
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <History className="h-16 w-16 mx-auto" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl mb-8 text-text-muted">
            This page is lost in history.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="button-primary">
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
            
            <Link to="/chat" className="button-secondary">
              <History className="h-5 w-5" />
              Start Researching
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default NotFoundPage;