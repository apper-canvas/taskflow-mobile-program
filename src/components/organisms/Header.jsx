import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import SearchBar from '@/components/molecules/SearchBar';
import Button from '@/components/atoms/Button';

const Header = ({ onSearch, onQuickAdd, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    onSearch?.('');
  };

  const isTasksPage = location.pathname === '/tasks' || location.pathname === '/';

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex-shrink-0 bg-surface border-b border-gray-200 px-6 py-4 z-40 ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"
          >
            <ApperIcon name="CheckSquare" className="text-white" size={20} />
          </motion.div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 font-heading">
              TaskFlow
            </h1>
            <p className="text-xs text-gray-500">
              Organize your tasks efficiently
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {isTasksPage && (
            <>
              <div className="hidden md:block">
                <SearchBar
                  onSearch={handleSearch}
                  onClear={handleClearSearch}
                  placeholder="Search tasks..."
                  className="w-80"
                />
              </div>
              
              <Button
                variant="primary"
                size="md"
                icon="Plus"
                onClick={onQuickAdd}
                className="hidden sm:flex"
              >
                Add Task
              </Button>
              
              <Button
                variant="primary"
                size="md"
                icon="Plus"
                onClick={onQuickAdd}
                className="sm:hidden"
              />
            </>
          )}
          
          <div className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <ApperIcon name="User" className="text-gray-600" size={16} />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Mobile search bar */}
      {isTasksPage && (
        <div className="md:hidden mt-4">
          <SearchBar
            onSearch={handleSearch}
            onClear={handleClearSearch}
            placeholder="Search tasks..."
          />
        </div>
      )}
    </motion.header>
  );
};

export default Header;