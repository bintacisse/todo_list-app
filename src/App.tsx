import React, { useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskFilters from './components/TaskFilters';
import TaskList from './components/TaskList';
import { Task } from './types';
import { useApiTasks } from './hooks/useApiTasks';


function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  
  const {
    tasks,
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
  } = useApiTasks();

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <TaskForm
            onAddTask={addTask}
            onUpdateTask={updateTask}
            editingTask={editingTask}
            onCancelEdit={handleCancelEdit}
          />
          
          <TaskFilters
            filter={filter}
            onFilterChange={setFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            stats={stats}
          />
          
          <TaskList
            tasks={tasks}
            onToggleComplete={toggleTaskCompletion}
            onEdit={handleEditTask}
            onDelete={deleteTask}
          />
        </div>
      </main>
      
      <footer className="bg-gray-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>ToDo List Application &copy; {new Date().getFullYear()}</p>
          <p className="mt-1">Une application réalisée avec React, TypeScript et Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}

export default App;