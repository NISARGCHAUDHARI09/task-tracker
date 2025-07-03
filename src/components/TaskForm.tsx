import React, { useState } from 'react';

interface Task {
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
}

interface TaskFormProps {
  onAddTask: (task: Task) => void;
  onClose?: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddTask({
      title: title.trim(),
      description: description.trim() || undefined,
      completed: false,
      priority,
      category: category.trim() || undefined,
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('');
    onClose?.();
  };

  return (
    <div className="task-form-container">
      <div className="task-form-header">
        <h2>Add New Task</h2>
        {onClose && (
          <button onClick={onClose} className="close-btn">
            ✕
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description (optional)"
            rows={3}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Work, Personal"
            />
          </div>
        </div>

        <button type="submit" className="add-task-btn">
          <span>➕</span>
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;