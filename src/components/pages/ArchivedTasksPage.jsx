import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import TaskList from '@/components/organisms/TaskList';
import Button from '@/components/atoms/Button';
import { taskService } from '@/services';

const ArchivedTasksPage = () => {
  const [archivedTasks, setArchivedTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadArchivedTasks = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const tasks = await taskService.getArchived();
      setArchivedTasks(tasks);
    } catch (err) {
      setError(err.message || 'Failed to load archived tasks');
      toast.error('Failed to load archived tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArchivedTasks();
  }, []);

  const handleTaskRestore = () => {
    loadArchivedTasks();
  };

  const handleTaskDelete = () => {
    loadArchivedTasks();
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to permanently delete all archived tasks? This action cannot be undone.')) {
      return;
    }

    try {
      await Promise.all(
        archivedTasks.map(task => taskService.delete(task.id))
      );
      
      setArchivedTasks([]);
      toast.success('All archived tasks cleared');
    } catch (error) {
      toast.error('Failed to clear archived tasks');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-heading">
                Archived Tasks
              </h1>
              <p className="text-gray-600 mt-1">
                {archivedTasks.length} {archivedTasks.length === 1 ? 'task' : 'tasks'} archived
              </p>
            </div>
            
            {archivedTasks.length > 0 && (
              <Button
                variant="danger"
                size="md"
                icon="Trash2"
                onClick={handleClearAll}
              >
                Clear All
              </Button>
            )}
          </div>
        </motion.div>
        
        <TaskList
          tasks={archivedTasks}
          loading={loading}
          error={error}
          onTaskRestore={handleTaskRestore}
          onTaskDelete={handleTaskDelete}
          onRetry={loadArchivedTasks}
          showArchived={true}
        />
      </div>
    </div>
  );
};

export default ArchivedTasksPage;