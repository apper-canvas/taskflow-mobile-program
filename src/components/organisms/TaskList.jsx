import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from '@/components/molecules/TaskCard';
import EmptyState from '@/components/molecules/EmptyState';
import LoadingState from '@/components/molecules/LoadingState';
import ErrorState from '@/components/molecules/ErrorState';

const TaskList = ({ 
  tasks = [], 
  loading = false, 
  error = null,
  onTaskUpdate,
  onTaskDelete,
  onTaskArchive,
  onRetry,
  showArchived = false,
  onTaskRestore,
  className = '' 
}) => {
  if (loading) {
    return <LoadingState count={5} className={className} />;
  }

  if (error) {
    return (
      <ErrorState 
        message={error}
        onRetry={onRetry}
        className={className}
      />
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        title={showArchived ? "No archived tasks" : "No tasks yet"}
        description={showArchived 
          ? "Completed tasks will appear here when archived"
          : "Create your first task to get started with organizing your workflow"
        }
        actionLabel={showArchived ? null : "Create Your First Task"}
        onAction={showArchived ? null : () => window.scrollTo(0, 0)}
        icon={showArchived ? "Archive" : "CheckSquare"}
        className={className}
      />
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <AnimatePresence mode="popLayout">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.2,
              delay: index * 0.05,
              layout: { duration: 0.3 }
            }}
            className="group"
          >
            <TaskCard
              task={task}
              onUpdate={onTaskUpdate}
              onDelete={onTaskDelete}
              onArchive={onTaskArchive}
              onRestore={onTaskRestore}
              showArchived={showArchived}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;