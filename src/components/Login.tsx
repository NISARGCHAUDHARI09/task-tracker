import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setIsLoading(true);
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    onLogin(username.trim());
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">👤</div>
          <h1>Welcome Back</h1>
          <p>Enter your username to access your tasks</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={!username.trim() || isLoading}
            className="login-btn"
          >
            {isLoading ? (
              <div className="spinner"></div>
            ) : (
              <>
                <span>🔑</span>
                Sign In
              </>
            )}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Your tasks are stored locally in your browser</p>
        </div>
      </div>
    </div>
  );
};

export default Login;