import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Select = ({ 
  label, 
  value, 
  onChange, 
  options = [],
  placeholder = 'Select option',
  error,
  required = false,
  className = '',
  ...props 
}) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full px-4 py-3 text-gray-900 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 appearance-none cursor-pointer ${
            error ? 'border-error' : 'border-gray-300'
          }`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ApperIcon 
          name="ChevronDown" 
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
          size={20}
        />
      </div>
      {label && (
        <motion.label
          initial={false}
          animate={{
            top: focused || hasValue ? '0.5rem' : '0.75rem',
            fontSize: focused || hasValue ? '0.75rem' : '1rem',
            color: focused ? '#5B4FE9' : error ? '#FF6B6B' : '#6B7280'
          }}
          transition={{ duration: 0.2 }}
          className="absolute left-4 pointer-events-none font-medium bg-white px-1"
          style={{ transformOrigin: 'left top' }}
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </motion.label>
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-error"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default Select;