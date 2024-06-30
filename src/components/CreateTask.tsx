import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface CreateTaskProps {
  onTaskCreated: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(1);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/tasks`, { title, description, priority, category, status: 'pending' });
      onTaskCreated();
      navigate('/list');
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  return (
    <div className="card bg-secondary text-light">
      <div className="card-body">
        <h2 className="card-title text-center mb-4 text-warning">New Quest</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Quest Title</label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Quest Description</label>
            <textarea
              className="form-control bg-dark text-light"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">Quest Priority</label>
            <select
              className="form-select bg-dark text-light"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
            >
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Quest Category</label>
            <input
              type="text"
              className="form-control bg-dark text-light"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning btn-lg w-100">Embark on Quest</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;