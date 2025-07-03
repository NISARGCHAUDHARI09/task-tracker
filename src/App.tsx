import React, { useState, useEffect } from 'react';
import { loadTasks, saveTasks, loadUser, saveUser, clearUser } from './utils/localStorage';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import './styles/App.css';

interface User {
  username: string;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  createdAt: Date;
}

function App() {
  const [user, setUser] = useState<User | null>(loadUser());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user) {
      const savedTasks = loadTasks();
      setTasks(savedTasks);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      saveTasks(tasks);
    }
  }, [tasks, user]);

  const handleLogin = (username: string) => {
    const newUser = { username };
    setUser(newUser);
    saveUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
    clearUser();
    setTasks([]);
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleEditTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, ...updates } : task
      )
    );
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const taskCounts = {
    all: filteredTasks.length,
    completed: filteredTasks.filter(task => task.completed).length,
    pending: filteredTasks.filter(task => !task.completed).length,
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <div className="logo-icon">📋</div>
              <div>
                <h1>Task Tracker</h1>
                <p>Welcome back, {user.username}!</p>
              </div>
            </div>
          </div>
          
          <button onClick={handleLogout} className="logout-btn">
            <span>🚪</span>
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </header>
      
      <main className="main-content">
        <div className="dashboard">
          <div className="dashboard-header">
            <div className="dashboard-title">
              <h2>Your Tasks</h2>
              <p>Stay organized and productive</p>
            </div>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
          
          <TaskFilter
            activeFilter={filter}
            onFilterChange={setFilter}
            taskCounts={taskCounts}
          />
        </div>

        <TaskForm onAddTask={handleAddTask} />

        <TaskList
          tasks={filteredTasks}
          filter={filter}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </main>
    </div>
  );
}

export default App;