'use client';

import type { FilterType } from '../types/task';

interface FilterBarProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  totalCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export default function FilterBar({
  filter,
  onFilterChange,
  totalCount,
  completedCount,
  onClearCompleted
}: FilterBarProps) {
  const activeCount = totalCount - completedCount;

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: totalCount },
    { key: 'active', label: 'Active', count: activeCount },
    { key: 'completed', label: 'Completed', count: completedCount }
  ];

  return (
    <div style={styles.bar}>
      <div style={styles.filters}>
        {filters.map(f => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            style={{
              ...styles.filterBtn,
              background: filter === f.key ? '#4f46e5' : '#fff',
              color: filter === f.key ? '#fff' : '#555',
              borderColor: filter === f.key ? '#4f46e5' : '#ddd'
            }}
          >
            {f.label}
            <span
              style={{
                ...styles.badge,
                background: filter === f.key ? 'rgba(255,255,255,0.25)' : '#f0f0f0',
                color: filter === f.key ? '#fff' : '#666'
              }}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button onClick={onClearCompleted} style={styles.clearBtn}>
          Clear Completed
        </button>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  bar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    gap: '0.75rem'
  },
  filters: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  filterBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.45rem 0.9rem',
    border: '1.5px solid #ddd',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.15s'
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '20px',
    height: '20px',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    padding: '0 5px'
  },
  clearBtn: {
    padding: '0.45rem 1rem',
    background: 'transparent',
    border: '1.5px solid #e74c3c',
    color: '#e74c3c',
    borderRadius: '20px',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer'
  }
};
