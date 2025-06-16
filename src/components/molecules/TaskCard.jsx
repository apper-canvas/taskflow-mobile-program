import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, isToday, isPast, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Checkbox from '@/components/atoms/Checkbox';
import Button from '@/components/atoms/Button';
import { taskService } from '@/services';

const TaskCard = ({ 
  task, 
  onUpdate, 
  onDelete,
  onArchive,
  showArchived = false,
  onRestore,
  className = '',
  ...props 
}) => {
  const [isCompleting, setIsCompleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const isOverdue = task.dueDate && isPast(parseISO(task.dueDate)) && !task.completed;
  const isDueToday = task.dueDate && isToday(parseISO(task.dueDate));

  const priorityColors = {
    High: '#FF6B6B',
    Medium: '#FFD93D',
    Low: '#4ECDC4'
  };

  const handleToggleComplete = async () => {
    if (task.completed) return;
    
    setIsCompleting(true);
    try {
      await taskService.toggleComplete(task.id);
      
      // Animate completion
      setTimeout(() => {
        onUpdate();
        toast.success('Task completed! 🎉');
      }, 400);
    } catch (error) {
      toast.error('Failed to update task');
      setIsCompleting(false);
    }
  };

  const handleEdit = async () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    if (editTitle.trim() === '') {
      toast.error('Task title cannot be empty');
      return;
    }

    try {
      await taskService.update(task.id, { title: editTitle.trim() });
      setIsEditing(false);
      onUpdate();
      toast.success('Task updated');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await taskService.delete(task.id);
      onDelete();
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleArchive = async () => {
    try {
      await taskService.archive(task.id);
      onArchive();
      toast.success('Task archived');
    } catch (error) {
      toast.error('Failed to archive task');
    }
  };

  const handleRestore = async () => {
    try {
      await taskService.restore(task.id);
      onRestore();
      toast.success('Task restored');
    } catch (error) {
      toast.error('Failed to restore task');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(task.title);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isCompleting ? 0 : 1, 
        x: isCompleting ? 100 : 0,
        scale: isCompleting ? 0.95 : 1
      }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ 
        y: -2, 
        scale: 1.02,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}
      transition={{ duration: 0.2 }}
      className={`bg-surface rounded-lg p-4 shadow-sm border-l-4 hover:shadow-md transition-all duration-200 ${className}`}
      style={{ borderLeftColor: priorityColors[task.priority] || '#E5E7EB' }}
      {...props}
    >
      <div className="flex items-start gap-3">
        {!showArchived && (
          <div className="flex-shrink-0 mt-1">
            <Checkbox
              checked={task.completed}
              onChange={handleToggleComplete}
              disabled={task.completed}
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onBlur={handleEdit}
                  className="w-full p-1 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  autoFocus
                />
              ) : (
                <h3 
                  className={`font-medium text-gray-900 break-words ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}
                  onClick={() => !showArchived && setIsEditing(true)}
                  style={{ cursor: showArchived ? 'default' : 'pointer' }}
                >
                  {task.title}
                </h3>
              )}
            </div>
            
            <div className="flex items-center gap-1">
<AnimatePresence>
                {!showArchived && !isEditing && (
                  <>
                    <motion.div
                      key="edit-button"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="Edit2"
                        onClick={() => setIsEditing(true)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </motion.div>
                    
                    <motion.div
                      key="archive-button"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        icon="Archive"
                        onClick={handleArchive}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </motion.div>
                  </>
                )}
                
                {showArchived && (
                  <motion.div
                    key="restore-button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      icon="RotateCcw"
                      onClick={handleRestore}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.div>
                )}
                
                <motion.div
                  key="delete-button"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    icon="Trash2"
                    onClick={handleDelete}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-error hover:text-error"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge color={priorityColors[task.priority]}>
                {task.priority}
              </Badge>
              
              <Badge variant="default">
                {task.category}
              </Badge>
            </div>
            
            {task.dueDate && (
              <div className={`flex items-center gap-1 text-sm ${
                isOverdue ? 'text-error' : 
                isDueToday ? 'text-warning' : 
                'text-gray-500'
              }`}>
                <ApperIcon name="Calendar" size={14} />
                <span className="font-medium">
                  {isToday(parseISO(task.dueDate)) ? 'Today' : 
                   format(parseISO(task.dueDate), 'MMM d')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;