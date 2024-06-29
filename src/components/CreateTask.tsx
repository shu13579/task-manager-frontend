import React, { useState } from 'react';
import axios from 'axios';
import '../styles/styles.css';

interface CreateTaskProps {
  onTaskCreated: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/tasks', { title, description });
      setTitle('');
      setDescription('');
      onTaskCreated();
    } catch (error) {
      console.error('タスクの作成に失敗しました', error);
    }
  };

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <h2>新しいタスクを作成</h2>
      <div>
        <label htmlFor="title">タイトル:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">説明:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">タスクを作成</button>
    </form>
  );
};

export default CreateTask;