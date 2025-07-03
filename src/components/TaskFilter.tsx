import React from 'react';

interface TaskCounts {
  all: number;
  pending: number;
  completed: number;
}

interface TaskFilterProps {
  activeFilter: 'all' | 'pending' | 'completed';
  onFilterChange: (filter: 'all' | 'pending' | 'completed') => void;
  taskCounts: TaskCounts;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ activeFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { key: 'all' as const, label: 'All Tasks', count: taskCounts.all },
    { key: 'pending' as const, label: 'Pending', count: taskCounts.pending },
    { key: 'completed' as const, label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="task-filter">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`filter-btn ${activeFilter === key ? 'active' : ''}`}
        >
          {label}
          <span className="count-badge">{count}</span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;