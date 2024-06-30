import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  status: string;
  priority: number;
  category: string;
}

const TaskDashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>(`${process.env.REACT_APP_BACKEND_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="row">
      <div className="col-md-6 mb-4">
        <div className="card bg-secondary text-light">
          <div className="card-body">
            <h2 className="card-title text-warning">Active Quests</h2>
            <p>You have {pendingTasks.length} active quests</p>
            <Link to="/list" className="btn btn-primary">View Quests</Link>
          </div>
        </div>
      </div>
      <div className="col-md-6 mb-4">
        <div className="card bg-secondary text-light">
          <div className="card-body">
            <h2 className="card-title text-warning">Completed Quests</h2>
            <p>You have completed {completedTasks.length} quests</p>
            <Link to="/list" className="btn btn-success">View Achievements</Link>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="card bg-secondary text-light">
          <div className="card-body">
            <h2 className="card-title text-warning">Quest Categories</h2>
            <ul className="list-group">
              {Array.from(new Set(tasks.map(task => task.category))).map(category => (
                <li key={category} className="list-group-item bg-dark text-light">
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;