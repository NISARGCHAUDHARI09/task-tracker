import React, { useState } from 'react';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Task>) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEdit(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(task.id);
    setShowDeleteConfirm(false);
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '🟡';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <button
          onClick={() => onToggle(task.id)}
          className={`toggle-btn ${task.completed ? 'checked' : ''}`}
        >
          {task.completed ? '✅' : '⭕'}
        </button>

        <div className="task-details">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="edit-input"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="edit-textarea"
                rows={2}
                placeholder="Description (optional)"
              />
              <div className="edit-actions">
                <button onClick={handleSave} className="save-btn">
                  Save
                </button>
                <button onClick={() => setIsEditing(false)} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className={`task-title ${task.completed ? 'strikethrough' : ''}`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className={`task-description ${task.completed ? 'strikethrough' : ''}`}>
                  {task.description}
                </p>
              )}

              <div className="task-meta">
                <div className="meta-item">
                  <span>📅</span>
                  {task.createdAt.toLocaleDateString()}
                </div>
                
                <div className={`priority-badge ${getPriorityClass(task.priority)}`}>
                  <span>{getPriorityIcon(task.priority)}</span>
                  {task.priority}
                </div>
                
                {task.category && (
                  <div className="category-badge">
                    <span>🏷️</span>
                    {task.category}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="task-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="edit-btn"
              title="Edit task"
            >
              ✏️
            </button>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="delete-btn"
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm">
          <p>Are you sure you want to delete this task? This action cannot be undone.</p>
          <div className="confirm-actions">
            <button onClick={handleDelete} className="confirm-delete-btn">
              Delete
            </button>
            <button onClick={() => setShowDeleteConfirm(false)} className="cancel-delete-btn">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;