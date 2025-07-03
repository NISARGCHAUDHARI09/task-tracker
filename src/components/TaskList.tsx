import React from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  createdAt: Date;
}

interface TaskListProps {
  tasks: Task[];
  filter: 'all' | 'pending' | 'completed';
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Task>) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, filter, onToggle, onDelete, onEdit }) => {
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const completedTasks = filteredTasks.filter(task => task.completed);
  const pendingTasks = filteredTasks.filter(task => !task.completed);

  if (filteredTasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📝</div>
        <h3>
          {filter === 'completed' && 'No completed tasks yet'}
          {filter === 'pending' && 'No pending tasks'}
          {filter === 'all' && 'No tasks yet'}
        </h3>
        <p>
          {filter === 'all' ? 'Add your first task to get started!' : 'Tasks will appear here once available.'}
        </p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {/* Show pending tasks first */}
      {pendingTasks.length > 0 && (filter === 'all' || filter === 'pending') && (
        <div className="task-section">
          {filter === 'all' && (
            <div className="section-header">
              <span className="section-icon">⏳</span>
              <h3>Pending Tasks ({pendingTasks.length})</h3>
            </div>
          )}
          <div className="tasks-container">
            {pendingTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      )}

      {/* Show completed tasks */}
      {completedTasks.length > 0 && (filter === 'all' || filter === 'completed') && (
        <div className="task-section">
          {filter === 'all' && (
            <div className="section-header">
              <span className="section-icon">✅</span>
              <h3>Completed Tasks ({completedTasks.length})</h3>
            </div>
          )}
          <div className="tasks-container">
            {completedTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;