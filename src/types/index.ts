export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  dueDate: string | null;
  priority: TaskPriority;
}

export type TaskFilter = 'all' | 'active' | 'completed';
export type SortOption = 'dueDate' | 'priority' | 'createdAt';