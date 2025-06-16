import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Checkbox = ({ 
  checked = false, 
  onChange, 
  label,
  disabled = false,
  className = '',
  ...props 
}) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
          {...props}
        />
        <motion.div
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
            checked 
              ? 'bg-primary border-primary' 
              : 'bg-white border-gray-300 hover:border-primary'
          }`}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
        >
          <motion.div
            initial={false}
            animate={{
              scale: checked ? 1 : 0,
              opacity: checked ? 1 : 0
            }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <ApperIcon name="Check" className="text-white" size={14} />
          </motion.div>
        </motion.div>
      </div>
      {label && (
        <span className="ml-3 text-gray-700 select-none">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;