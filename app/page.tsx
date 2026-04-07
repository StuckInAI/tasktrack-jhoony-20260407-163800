'use client';

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import ProgressBar from '../components/ProgressBar';
import FilterBar from '../components/FilterBar';
import type { Task, FilterType } from '../types/task';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('tasks');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setTasks(parsed);
      } catch {
        setTasks([]);
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, mounted]);

  const addTask = (title: string, description: string, priority: Task['priority']) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, title: string, description: string, priority: Task['priority']) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, title, description, priority } : task
      )
    );
    setEditingTask(null);
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const totalCount = tasks.length;

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        <header style={styles.header}>
          <h1 style={styles.title}>Task Manager</h1>
          <p style={styles.subtitle}>Organize your daily tasks and track progress</p>
        </header>

        <ProgressBar completed={completedCount} total={totalCount} />

        <TaskForm
          onAdd={addTask}
          onUpdate={updateTask}
          editingTask={editingTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          totalCount={totalCount}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={setEditingTask}
        />

        {filteredTasks.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>
              {filter === 'completed'
                ? 'No completed tasks yet'
                : filter === 'active'
                ? 'No active tasks'
                : 'No tasks yet. Add one above!'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  main: {
    minHeight: '100vh',
    padding: '2rem 1rem'
  },
  container: {
    maxWidth: '720px',
    margin: '0 auto'
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: '0.5rem'
  },
  subtitle: {
    fontSize: '1rem',
    color: '#666',
    fontWeight: '400'
  },
  emptyState: {
    textAlign: 'center',
    padding: '3rem 1rem'
  },
  emptyText: {
    color: '#999',
    fontSize: '1.1rem'
  }
};
