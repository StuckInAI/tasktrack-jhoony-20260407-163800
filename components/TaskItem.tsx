'use client';

import { useState } from 'react';
import type { Task } from '../types/task';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

const priorityConfig: Record<Task['priority'], { label: string; color: string; bg: string }> = {
  low: { label: 'Low', color: '#15803d', bg: '#dcfce7' },
  medium: { label: 'Medium', color: '#b45309', bg: '#fef3c7' },
  high: { label: 'High', color: '#dc2626', bg: '#fee2e2' }
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const pConfig = priorityConfig[task.priority];

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete(task.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 2500);
    }
  };

  return (
    <div
      style={{
        ...styles.card,
        opacity: task.completed ? 0.75 : 1,
        borderLeft: `4px solid ${pConfig.color}`
      }}
    >
      <div style={styles.top}>
        <button
          onClick={() => onToggle(task.id)}
          style={{
            ...styles.checkbox,
            background: task.completed ? '#4f46e5' : '#fff',
            borderColor: task.completed ? '#4f46e5' : '#ccc'
          }}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6L5 9L10 3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>

        <div style={styles.content}>
          <span
            style={{
              ...styles.title,
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#999' : '#1a1a2e'
            }}
          >
            {task.title}
          </span>

          {task.description && (
            <p
              style={{
                ...styles.description,
                color: task.completed ? '#bbb' : '#666'
              }}
            >
              {task.description}
            </p>
          )}

          <div style={styles.meta}>
            <span
              style={{
                ...styles.priorityBadge,
                color: pConfig.color,
                background: pConfig.bg
              }}
            >
              {pConfig.label}
            </span>
            <span style={styles.date}>{formattedDate}</span>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            onClick={() => onEdit(task)}
            style={styles.editButton}
            disabled={task.completed}
            aria-label="Edit task"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>

          <button
            onClick={handleDelete}
            style={{
              ...styles.deleteButton,
              background: confirmDelete ? '#dc2626' : undefined,
              color: confirmDelete ? '#fff' : undefined
            }}
            aria-label={confirmDelete ? 'Confirm delete' : 'Delete task'}
          >
            {confirmDelete ? (
              <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>Confirm</span>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: '#fff',
    borderRadius: '10px',
    padding: '1rem 1.25rem',
    boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
    transition: 'opacity 0.2s'
  },
  top: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.85rem'
  },
  checkbox: {
    width: '22px',
    height: '22px',
    minWidth: '22px',
    borderRadius: '50%',
    border: '2px solid #ccc',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2px',
    transition: 'all 0.2s'
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.3rem'
  },
  title: {
    fontSize: '1rem',
    fontWeight: '600',
    lineHeight: '1.4'
  },
  description: {
    fontSize: '0.875rem',
    lineHeight: '1.5'
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginTop: '0.3rem'
  },
  priorityBadge: {
    display: 'inline-block',
    padding: '0.2rem 0.6rem',
    borderRadius: '20px',
    fontSize: '0.75rem',
    fontWeight: '600'
  },
  date: {
    fontSize: '0.78rem',
    color: '#aaa'
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  },
  editButton: {
    width: '34px',
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.5px solid #e0e0e0',
    borderRadius: '8px',
    background: '#f9f9f9',
    color: '#555',
    cursor: 'pointer',
    transition: 'background 0.15s'
  },
  deleteButton: {
    width: '34px',
    height: '34px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1.5px solid #e0e0e0',
    borderRadius: '8px',
    background: '#f9f9f9',
    color: '#888',
    cursor: 'pointer',
    transition: 'background 0.15s, color 0.15s'
  }
};
