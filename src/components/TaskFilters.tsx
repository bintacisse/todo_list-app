import React from 'react';
import { TaskFilter, SortOption } from '../types';
import { ListFilter, Calendar, Clock, Flag } from 'lucide-react';

interface TaskFiltersProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  stats: {
    total: number;
    completed: number;
    active: number;
  };
}

const TaskFilters: React.FC<TaskFiltersProps> = ({
  filter,
  onFilterChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  stats,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-card p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-3 md:mb-0 flex items-center">
          <ListFilter className="w-5 h-5 mr-2 text-primary-600" />
          Filtres et Tri
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
            Total: {stats.total}
          </span>
          <span className="px-2 py-1 bg-success-100 text-success-800 text-xs rounded-full">
            Terminées: {stats.completed}
          </span>
          <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full">
            Actives: {stats.active}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Rechercher
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher une tâche..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
            Afficher
          </label>
          <div className="flex rounded-md overflow-hidden border border-gray-300">
            <button
              className={`flex-1 py-2 px-3 text-sm ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => onFilterChange('all')}
            >
              Toutes
            </button>
            <button
              className={`flex-1 py-2 px-3 text-sm ${
                filter === 'active'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => onFilterChange('active')}
            >
              Actives
            </button>
            <button
              className={`flex-1 py-2 px-3 text-sm ${
                filter === 'completed'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => onFilterChange('completed')}
            >
              Terminées
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">
            Trier par
          </label>
          <div className="relative">
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
            >
              <option value="createdAt">Date de création</option>
              <option value="dueDate">Date d'échéance</option>
              <option value="priority">Priorité</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              {sortBy === 'dueDate' && <Calendar className="w-4 h-4 text-gray-500" />}
              {sortBy === 'createdAt' && <Clock className="w-4 h-4 text-gray-500" />}
              {sortBy === 'priority' && <Flag className="w-4 h-4 text-gray-500" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;