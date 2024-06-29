import React, { useState } from 'react';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import './styles/styles.css';

const App: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskCreated = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Task Manager</h1>
      </header>
      <CreateTask onTaskCreated={handleTaskCreated} />
      <TaskList key={refreshKey} />
    </div>
  );
};

export default App;