import React from 'react';
import { Task, TaskPriority } from '../types';
import { formatDate, getPriorityColor, getPriorityLabel } from '../utils/taskUtils';
import { CheckCircle, Circle, Pencil, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-lg shadow-card hover:shadow-card-hover transition-shadow p-4 mb-3 border-l-4 ${
        task.completed ? 'border-success-500' : 'border-primary-500'
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleComplete(task.id)}
          className="mt-1 text-gray-500 hover:text-primary-600 transition-colors"
          aria-label={task.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée'}
        >
          {task.completed ? (
            <CheckCircle className="w-5 h-5 text-success-500" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {task.title}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="text-gray-500 hover:text-primary-600 transition-colors"
                aria-label="Modifier"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-gray-500 hover:text-error-600 transition-colors"
                aria-label="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {task.description && (
            <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {task.dueDate && (
              <div className="flex items-center text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(task.dueDate)}
              </div>
            )}
            <div className={`flex items-center text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
              <AlertCircle className="w-3 h-3 mr-1" />
              {getPriorityLabel(task.priority)}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskCard;