import React, { useState, useEffect } from 'react';
import { Task, TaskPriority } from '../types';
import { createTask, parseInputDate } from '../utils/taskUtils';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
  editingTask: Task | null;
  onCancelEdit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, onUpdateTask, editingTask, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.MEDIUM);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDueDate(editingTask.dueDate ? new Date(editingTask.dueDate).toISOString().split('T')[0] : '');
      setPriority(editingTask.priority);
    } else {
      resetForm();
    }
  }, [editingTask]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority(TaskPriority.MEDIUM);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Le titre est requis');
      return;
    }

    const parsedDueDate = dueDate ? parseInputDate(dueDate) : null;

    if (editingTask) {
      onUpdateTask({
        ...editingTask,
        title,
        description,
        dueDate: parsedDueDate,
        priority,
      });
      onCancelEdit();
    } else {
      const newTask = createTask(title, description, parsedDueDate, priority);
      onAddTask(newTask);
    }

    resetForm();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-card p-4 mb-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {editingTask ? 'Modifier la tâche' : 'Ajouter une nouvelle tâche'}
        </h2>
        {editingTask && (
          <button
            onClick={onCancelEdit}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Annuler"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Titre*
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Qu'est-ce qui doit être fait ?"
          />
          {error && <p className="mt-1 text-sm text-error-600">{error}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Détails supplémentaires..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Date d'échéance
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priorité
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value={TaskPriority.LOW}>Basse</option>
              <option value={TaskPriority.MEDIUM}>Moyenne</option>
              <option value={TaskPriority.HIGH}>Haute</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
        >
          {editingTask ? 'Mettre à jour' : (
            <>
              <Plus className="w-4 h-4 mr-1" />
              Ajouter
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default TaskForm;