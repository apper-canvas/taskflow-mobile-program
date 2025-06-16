import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'react-toastify';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import Button from '@/components/atoms/Button';
import { taskService, categoryService } from '@/services';

const TaskForm = ({ onTaskCreated, categories = [], className = '' }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: '',
    dueDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const priorityOptions = [
    { value: 'Low', label: 'Low Priority' },
    { value: 'Medium', label: 'Medium Priority' },
    { value: 'High', label: 'High Priority' }
  ];

  const categoryOptions = categories.map(cat => ({
    value: cat.name,
    label: cat.name
  }));

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    if (!formData.priority) {
      newErrors.priority = 'Priority is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await taskService.create(formData);
      
      // Reset form
      setFormData({
        title: '',
        category: '',
        priority: '',
        dueDate: ''
      });
      
      onTaskCreated();
      toast.success('Task created successfully!');
    } catch (error) {
      toast.error('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-surface rounded-lg p-6 shadow-sm border ${className}`}
      onSubmit={handleSubmit}
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4 font-heading">
        Add New Task
      </h2>
      
      <div className="space-y-4">
        <Input
          label="Task Title"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Enter task title"
          error={errors.title}
          required
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            options={categoryOptions}
            placeholder="Select category"
            error={errors.category}
            required
          />
          
          <Select
            label="Priority"
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            options={priorityOptions}
            placeholder="Select priority"
            error={errors.priority}
            required
          />
        </div>
        
        <Input
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange('dueDate', e.target.value)}
          min={format(new Date(), 'yyyy-MM-dd')}
        />
        
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            icon="Plus"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Add Task'}
          </Button>
        </div>
      </div>
    </motion.form>
  );
};

export default TaskForm;