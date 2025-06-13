import { Task, TaskFilter, TaskPriority, SortOption } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { format, parse, compareAsc, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';

export const createTask = (
  title: string,
  description: string = '',
  dueDate: string | null = null,
  priority: TaskPriority = TaskPriority.MEDIUM
): Task => {
  return {
    id: uuidv4(),
    title,
    description,
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate,
    priority,
  };
};

export const filterTasks = (tasks: Task[], filter: TaskFilter): Task[] => {
  switch (filter) {
    case 'active':
      return tasks.filter((task) => !task.completed);
    case 'completed':
      return tasks.filter((task) => task.completed);
    default:
      return tasks;
  }
};

export const sortTasks = (tasks: Task[], sortBy: SortOption): Task[] => {
  return [...tasks].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return compareAsc(new Date(a.dueDate), new Date(b.dueDate));
      case 'priority':
        const priorityOrder = {
          [TaskPriority.LOW]: 3,
          [TaskPriority.MEDIUM]: 2,
          [TaskPriority.HIGH]: 1,
        };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      case 'createdAt':
      default:
        return compareAsc(new Date(a.createdAt), new Date(b.createdAt));
    }
  });
};

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return isValid(date) ? format(date, 'dd MMMM yyyy', { locale: fr }) : '';
};

export const parseInputDate = (dateString: string): string | null => {
  try {
    const date = parse(dateString, 'yyyy-MM-dd', new Date());
    return isValid(date) ? date.toISOString() : null;
  } catch (error) {
    return null;
  }
};

export const getPriorityColor = (priority: TaskPriority): string => {
  switch (priority) {
    case TaskPriority.LOW:
      return 'bg-secondary-200 text-secondary-800';
    case TaskPriority.MEDIUM:
      return 'bg-warning-200 text-warning-800';
    case TaskPriority.HIGH:
      return 'bg-error-200 text-error-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

export const getPriorityLabel = (priority: TaskPriority): string => {
  switch (priority) {
    case TaskPriority.LOW:
      return 'Basse';
    case TaskPriority.MEDIUM:
      return 'Moyenne';
    case TaskPriority.HIGH:
      return 'Haute';
    default:
      return '';
  }
};