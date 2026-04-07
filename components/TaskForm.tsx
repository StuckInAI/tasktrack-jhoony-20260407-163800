'use client';

import { useState, useEffect } from 'react';
import type { Task } from '../types/task';

interface TaskFormProps {
  onAdd: (title: string, description: string, priority: Task['priority']) => void;
  onUpdate: (id: string, title: string, description: string, priority: Task['priority']) => void;
  editingTask: Task | null;
  onCancelEdit: () => void;
}

export default function TaskForm({ onAdd, onUpdate, editingTask, onCancelEdit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setError('');
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setError('');
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    if (editingTask) {
      onUpdate(editingTask.id, title.trim(), description.trim(), priority);
    } else {
      onAdd(title.trim(), description.trim(), priority);
    }
    setTitle('');
    setDescription('');
    setPriority('medium');
    setError('');
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.fieldGroup}>
          <label style={styles.label} htmlFor="title">
            Title <span style={styles.required}>*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter task title..."
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter task description (optional)..."
            style={styles.textarea}
            rows={3}
          />
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label} htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={e => setPriority(e.target.value as Task['priority'])}
            style={styles.select}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div style={styles.buttonRow}>
          <button type="submit" style={styles.submitButton}>
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
          {editingTask && (
            <button type="button" onClick={onCancelEdit} style={styles.cancelButton}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#1a1a2e',
    marginBottom: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem'
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: '500',
    color: '#444'
  },
  required: {
    color: '#e74c3c'
  },
  input: {
    padding: '0.65rem 0.9rem',
    border: '1.5px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%'
  },
  textarea: {
    padding: '0.65rem 0.9rem',
    border: '1.5px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    width: '100%'
  },
  select: {
    padding: '0.65rem 0.9rem',
    border: '1.5px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    background: '#fff',
    width: '100%',
    cursor: 'pointer'
  },
  error: {
    color: '#e74c3c',
    fontSize: '0.85rem',
    marginTop: '0.2rem'
  },
  buttonRow: {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap'
  },
  submitButton: {
    padding: '0.7rem 1.5rem',
    background: '#4f46e5',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer'
  },
  cancelButton: {
    padding: '0.7rem 1.5rem',
    background: '#f0f2f5',
    color: '#444',
    border: '1.5px solid #ddd',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer'
  }
};
