'use client';

interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <span style={styles.label}>Progress</span>
        <span style={styles.count}>
          {completed} / {total} tasks completed
        </span>
      </div>
      <div style={styles.track}>
        <div
          style={{
            ...styles.fill,
            width: `${percentage}%`,
            background:
              percentage === 100
                ? '#16a34a'
                : percentage >= 50
                ? '#4f46e5'
                : '#6366f1'
          }}
        />
      </div>
      <div style={styles.percentageRow}>
        <span style={styles.percentage}>{percentage}%</span>
        {percentage === 100 && total > 0 && (
          <span style={styles.congrats}>All tasks completed! 🎉</span>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '1.25rem 1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem'
  },
  label: {
    fontWeight: '600',
    color: '#1a1a2e',
    fontSize: '1rem'
  },
  count: {
    fontSize: '0.875rem',
    color: '#666'
  },
  track: {
    height: '10px',
    background: '#e9ecef',
    borderRadius: '999px',
    overflow: 'hidden'
  },
  fill: {
    height: '100%',
    borderRadius: '999px',
    transition: 'width 0.4s ease, background 0.4s ease'
  },
  percentageRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginTop: '0.5rem'
  },
  percentage: {
    fontSize: '0.85rem',
    color: '#888',
    fontWeight: '500'
  },
  congrats: {
    fontSize: '0.85rem',
    color: '#16a34a',
    fontWeight: '600'
  }
};
