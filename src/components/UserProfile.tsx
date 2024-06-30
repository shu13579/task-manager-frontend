import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserProfileProps {
  experience: number;
}

interface Task {
  id: number;
  title: string;
  status: string;
  priority: number;
  category: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ experience }) => {
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

  const completedTasks = tasks.filter(task => task.status === 'completed');
  const level = Math.floor(experience / 100) + 1;
  const nextLevelXP = level * 100;

  return (
    <div className="row">
      <div className="col-md-6 mb-4">
        <div className="card bg-secondary text-light">
          <div className="card-body">
            <h2 className="card-title text-warning">Hero Profile</h2>
            <p>Level: {level}</p>
            <p>Experience: {experience} / {nextLevelXP}</p>
            <div className="progress">
              <div
                className="progress-bar bg-warning"
                role="progressbar"
                style={{ width: `${(experience % 100) / 100 * 100}%` }}
                aria-valuenow={(experience % 100)}
                aria-valuemin={0}
                aria-valuemax={100}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-6 mb-4">
        <div className="card bg-secondary text-light">
          <div className="card-body">
            <h2 className="card-title text-warning">Achievements</h2>
            <p>Completed Quests: {completedTasks.length}</p>
            <p>Total XP Earned: {experience}</p>
          </div>
        </div>
      </div>
      <div className="col-12">
        <div className="card bg-secondary text-light">
          <div className="card-body">
            <h2 className="card-title text-warning">Quest Statistics</h2>
            <ul className="list-group">
              {Array.from(new Set(tasks.map(task => task.category))).map(category => {
                const categoryTasks = tasks.filter(task => task.category === category);
                const completedCategoryTasks = categoryTasks.filter(task => task.status === 'completed');
                return (
                  <li key={category} className="list-group-item bg-dark text-light">
                    {category}: {completedCategoryTasks.length} / {categoryTasks.length} completed
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;