import React from 'react';
import { CheckSquare, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-primary-600 text-white shadow-md"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <CheckSquare className="w-8 h-8 mr-3" />
            <h1 className="text-2xl font-bold">ToDo List</h1>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-primary-700 transition-colors"
            aria-label={darkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;