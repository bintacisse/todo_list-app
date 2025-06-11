import React from 'react';
import { Task } from '../types';
import TaskCard from './TaskCard';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-card p-8 text-center">
        <ClipboardList className="w-12 h-12 mx-auto text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-800 mb-1">Aucune tâche trouvée</h3>
        <p className="text-gray-600">
          Créez une nouvelle tâche ou modifiez vos filtres pour voir les tâches.
        </p>
      </div>
    );
  }

  return (
    <div>
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;