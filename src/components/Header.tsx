import React from 'react';
import { Link } from 'react-router-dom';
import { History, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  toggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  showNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleSidebar, 
  isSidebarOpen,
  showNav = true
}) => {
  return (
    <motion.header 
      className="fixed top-0 w-full z-50 glassmorphism border-b border-white/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <History className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold text-text">SEEKPAST</span>
        </Link>

        {toggleSidebar && (
          <button 
            className="lg:hidden p-2 text-text hover:text-primary transition-colors"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        )}

        {showNav && (
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/chat" className="text-text hover:text-primary transition-colors">
              Research
            </Link>
            <a 
              href="https://github.com/HeyitsSup03" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://www.instagram.com/talkinbout.sup_?igsh=bm9lMXV5Z3h3czJv" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-text hover:text-primary transition-colors"
            >
              Contact Me
            </a>
          </nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;