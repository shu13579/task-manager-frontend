import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  priority: number;
  category: string;
}

interface TaskListProps {
  onTaskCompleted: (priority: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ onTaskCompleted }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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

  const updateTask = async (task: Task) => {
    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/tasks/${task.id}`, task);
      fetchTasks();
      setEditingTask(null);
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task', error);
    }
  };

  const completeTask = async (task: Task) => {
    try {
      const updatedTask = { ...task, status: 'completed' };
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/tasks/${task.id}`, updatedTask);
      onTaskCompleted(task.priority);
      fetchTasks();
    } catch (error) {
      console.error('Failed to complete task', error);
    }
  };

  const getPriorityLabel = (priority: number) => {
    switch (priority) {
      case 1:
        return 'Low';
      case 2:
        return 'Medium';
      case 3:
        return 'High';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="card bg-secondary text-light">
      <div className="card-body">
        <h2 className="card-title text-center mb-4 text-warning">Quest Log</h2>
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item bg-dark text-light mb-2">
              {editingTask?.id === task.id ? (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  updateTask(editingTask);
                }}>
                  <input
                    className="form-control mb-2 bg-secondary text-light"
                    value={editingTask.title}
                    onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                  />
                  <textarea
                    className="form-control mb-2 bg-secondary text-light"
                    value={editingTask.description}
                    onChange={(e) => setEditingTask({...editingTask, description: e.target.value})}
                  />
                  <select
                    className="form-select mb-2 bg-secondary text-light"
                    value={editingTask.priority}
                    onChange={(e) => setEditingTask({...editingTask, priority: Number(e.target.value)})}
                  >
                    <option value="1">Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                  </select>
                  <input
                    className="form-control mb-2 bg-secondary text-light"
                    value={editingTask.category}
                    onChange={(e) => setEditingTask({...editingTask, category: e.target.value})}
                  />
                  <button type="submit" className="btn btn-success btn-sm me-2">Save</button>
                  <button onClick={() => setEditingTask(null)} className="btn btn-secondary btn-sm">Cancel</button>
                </form>
              ) : (
                <>
                  <h5 className="mb-1">{task.title}</h5>
                  <p className="mb-1">{task.description}</p>
                  <span className={`badge ${task.status === 'completed' ? 'bg-success' : 'bg-warning'} text-dark me-2`}>
                    {task.status}
                  </span>
                  <span className={`badge bg-info text-dark me-2`}>
                    Priority: {getPriorityLabel(task.priority)}
                  </span>
                  <span className={`badge bg-secondary text-light`}>
                    {task.category}
                  </span>
                  <div className="mt-2">
                    {task.status === 'pending' && (
                      <button onClick={() => completeTask(task)} className="btn btn-success btn-sm me-2">Complete</button>
                    )}
                    <button onClick={() => setEditingTask(task)} className="btn btn-primary btn-sm me-2">Edit</button>
                    <button onClick={() => deleteTask(task.id)} className="btn btn-danger btn-sm">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;