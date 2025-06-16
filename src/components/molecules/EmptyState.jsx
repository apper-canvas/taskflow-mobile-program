import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const EmptyState = ({ 
  title, 
  description, 
  actionLabel, 
  onAction,
  icon = 'CheckSquare',
  className = '',
  ...props 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`text-center py-12 px-6 ${className}`}
      {...props}
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="inline-block mb-4"
      >
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} className="w-8 h-8 text-gray-400" />
        </div>
      </motion.div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {description}
      </p>
      
      {actionLabel && onAction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="primary"
            size="md"
            icon="Plus"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EmptyState;