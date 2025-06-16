import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TaskList from '@/components/organisms/TaskList';
import TaskForm from '@/components/molecules/TaskForm';
import CategoryFilter from '@/components/molecules/CategoryFilter';
import { taskService, categoryService } from '@/services';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Filter tasks based on category and search
  const filteredTasks = useMemo(() => {
    let filtered = tasks.filter(task => !task.archived);
    
    if (selectedCategory) {
      filtered = filtered.filter(task => task.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query)
      );
    }
    
    // Sort by priority and due date
    return filtered.sort((a, b) => {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [tasks, selectedCategory, searchQuery]);

  // Calculate task counts per category
  const taskCounts = useMemo(() => {
    const counts = {};
    const activeTasks = tasks.filter(task => !task.archived);
    
    categories.forEach(category => {
      counts[category.name] = activeTasks.filter(task => task.category === category.name).length;
    });
    
    return counts;
  }, [tasks, categories]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [tasksData, categoriesData] = await Promise.all([
        taskService.getAll(),
        categoryService.getAll()
      ]);
      
      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err.message || 'Failed to load data');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTaskUpdate = () => {
    loadData();
  };

  const handleTaskDelete = () => {
    loadData();
  };

  const handleTaskArchive = () => {
    loadData();
  };

  const handleTaskCreated = () => {
    loadData();
    setShowForm(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleQuickAdd = () => {
    setShowForm(true);
    // Scroll to form
    setTimeout(() => {
      const formElement = document.getElementById('task-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                taskCounts={taskCounts}
              />
              
              {/* Task Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-surface rounded-lg p-4 shadow-sm"
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-3 font-heading">
                  Statistics
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Tasks</span>
                    <span className="font-medium">{tasks.filter(t => !t.archived).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-medium text-success">
                      {tasks.filter(t => t.completed && !t.archived).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending</span>
                    <span className="font-medium text-warning">
                      {tasks.filter(t => !t.completed && !t.archived).length}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Task Form */}
            {showForm && (
              <motion.div
                id="task-form"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <TaskForm
                  onTaskCreated={handleTaskCreated}
                  categories={categories}
                />
              </motion.div>
            )}
            
            {/* Task List Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 font-heading">
                  {selectedCategory ? `${selectedCategory} Tasks` : 'All Tasks'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>
              
              {!showForm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowForm(true)}
                  className="lg:hidden bg-primary text-white px-4 py-2 rounded-lg font-medium shadow-sm"
                >
                  Add Task
                </motion.button>
              )}
            </div>
            
            {/* Task List */}
            <TaskList
              tasks={filteredTasks}
              loading={loading}
              error={error}
              onTaskUpdate={handleTaskUpdate}
              onTaskDelete={handleTaskDelete}
              onTaskArchive={handleTaskArchive}
              onRetry={loadData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;