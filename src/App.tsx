import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import Header from './components/Header';
import TaskDashboard from './components/TaskDashboard';
import CreateTask from './components/CreateTask';
import TaskList from './components/TaskList';
import UserProfile from './components/UserProfile';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const [experience, setExperience] = useState(0);

  const handleTaskCreated = () => {
    // タスク作成時の処理（必要に応じて）
  };

  const handleTaskCompleted = (taskPriority: number) => {
    setExperience(exp => exp + taskPriority * 10);
  };

  return (
    <BrowserRouter>
      <div className="bg-dark text-light min-vh-100">
        <Header experience={experience} />
        <div className="container py-4">
          <Routes>
            <Route index element={<TaskDashboard />} />
            <Route path="create" element={<CreateTask onTaskCreated={handleTaskCreated} />} />
            <Route path="list" element={<TaskList onTaskCompleted={handleTaskCompleted} />} />
            <Route path="profile" element={<UserProfile experience={experience} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

const Layout: React.FC = () => {
  return (
    <div>
      <nav>
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link to="/" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/create" className="nav-link">New Quest</Link>
          </li>
          <li className="nav-item">
            <Link to="/list" className="nav-link">Quest Log</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">Hero Profile</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default App;