import { motion } from 'framer-motion';
import Badge from '@/components/atoms/Badge';

const CategoryFilter = ({ 
  categories = [], 
  selectedCategory, 
  onCategoryChange,
  taskCounts = {},
  className = '' 
}) => {
  const allTaskCount = Object.values(taskCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className={`bg-surface rounded-lg p-4 shadow-sm ${className}`}>
      <h3 className="text-sm font-semibold text-gray-900 mb-3 font-heading">
        Filter by Category
      </h3>
      
      <div className="space-y-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onCategoryChange('')}
          className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all duration-200 ${
            selectedCategory === '' 
              ? 'bg-primary text-white' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="font-medium">All Tasks</span>
          <Badge 
            variant={selectedCategory === '' ? 'default' : 'default'}
            size="sm"
            className={selectedCategory === '' ? 'bg-white/20 text-white' : ''}
          >
            {allTaskCount}
          </Badge>
        </motion.button>
        
        {categories.map(category => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onCategoryChange(category.name)}
            className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all duration-200 ${
              selectedCategory === category.name 
                ? 'bg-primary text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: category.color }}
              />
              <span className="font-medium">{category.name}</span>
            </div>
            <Badge 
              variant={selectedCategory === category.name ? 'default' : 'default'}
              size="sm"
              className={selectedCategory === category.name ? 'bg-white/20 text-white' : ''}
            >
              {taskCounts[category.name] || 0}
            </Badge>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;