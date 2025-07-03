const TASKS_KEY = 'tasks';
const USER_KEY = 'user';

export const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const loadTasks = () => {
  const tasks = localStorage.getItem(TASKS_KEY);
  if (!tasks) return [];
  
  return JSON.parse(tasks).map((task) => ({
    ...task,
    createdAt: new Date(task.createdAt)
  }));
};

export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const loadUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};