import { useEffect, useState } from 'react';
import axios from 'axios';
import { Task, TaskFilter, SortOption } from '../types';
import { filterTasks, sortTasks } from '../utils/taskUtils';

const API_URL = 'http://localhost:3000/api/tasks';

export const useApiTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('createdAt');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get<Task[]>(API_URL);
    setTasks(res.data);
  };

  const addTask = async (task: Task) => {
    const res = await axios.post<Task>(API_URL, task);
    setTasks(prev => [...prev, res.data]);
  };

  const updateTask = async (updatedTask: Task) => {
    const res = await axios.put<Task>(`${API_URL}/${updatedTask.id}`, updatedTask);
    setTasks(prev => prev.map(task => (task.id === updatedTask.id ? res.data : task)));
  };

  const deleteTask = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    const updated = { ...task, completed: !task.completed };
    await updateTask(updated);
  };

  const filteredAndSortedTasks = sortTasks(
    filterTasks(
      tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
      filter
    ),
    sortBy
  );

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
  };

  return {
    tasks: filteredAndSortedTasks,
    addTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    stats,
  };
};
