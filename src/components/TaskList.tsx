import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>('http://localhost:3000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('タスクの取得に失敗しました', error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      await axios.put(`http://localhost:3000/tasks/${task.id}`, task);
      fetchTasks();
      setEditingTask(null);
    } catch (error) {
      console.error('タスクの更新に失敗しました', error);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('タスクの削除に失敗しました', error);
    }
  };

  return (
    <div className="task-list">
      <h2>タスク一覧</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTask?.id === task.id ? (
              <form onSubmit={(e) => {
                e.preventDefault();
                updateTask(editingTask);
              }}>
                <input
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({...editingTask, title: e.target.value})}
                />
                <select
                  value={editingTask.status}
                  onChange={(e) => setEditingTask({...editingTask, status: e.target.value as 'pending' | 'completed'})}
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
                <button type="submit">Save</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </form>
            ) : (
              <>
                {task.title} ({task.description}) - {task.status}
                <button onClick={() => setEditingTask(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;