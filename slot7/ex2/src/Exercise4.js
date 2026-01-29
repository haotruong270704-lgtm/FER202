import React, { useState } from 'react';

function Exercise4() {
  const [task, setTask] = useState(""); 
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review exercise 4 documentation' },
    { id: 2, text: 'lam khung' },
    { id: 3, text: 'Set up modern dashboard layout' }
  ]); 

  const handleAdd = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), text: task }]); 
      setTask("");
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id)); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <div style={styles.header}>
          <h2 style={styles.mainTitle}>My Tasks</h2>
          <p style={styles.subtitle}>Stay focused and track your progress.</p>
        </div>

        {/* Khu vực nhập Task mới */}
        <div style={styles.inputCard}>
          <span style={styles.plusIcon}>+</span>
          <input 
            style={styles.input}
            value={task} 
            onChange={(e) => setTask(e.target.value)} 
            placeholder="Add a new task..." 
          />
          <button style={styles.btnAdd} onClick={handleAdd}>Add Task</button>
        </div>

        {/* Danh sách Task */}
        <div style={styles.todoList}>
          {todos.map(todo => (
            <div key={todo.id} style={styles.todoItem}>
              <div style={styles.todoLeft}>
                <div style={styles.checkbox}></div>
                <span style={styles.todoText}>{todo.text}</span>
              </div>
              <button 
                style={styles.btnDelete} 
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          ))}

          {todos.length === 0 && (
            <div style={styles.emptyState}>
              <span style={{fontSize: '24px'}}>✅</span>
              <p>You're doing great! Keep adding tasks to your list.</p>
            </div>
          )}
        </div>

        {/* Phần thống kê bên dưới (Stats) */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <span style={styles.statLabel}>COMPLETED</span>
            <span style={styles.statValue}>12</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statLabel}>PENDING</span>
            <span style={styles.statValue}>{todos.length.toString().padStart(2, '0')}</span>
          </div>
          <div style={styles.statCard}>
            <span style={styles.statLabel}>EFFICIENCY</span>
            <span style={{...styles.statValue, color: '#6366f1'}}>84%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f8fafd', // Nền xám nhạt cực sang trọng
    minHeight: '100vh',
    padding: '40px 20px',
    fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center'
  },
  contentWrapper: {
    maxWidth: '800px',
    width: '100%',
  },
  header: {
    marginBottom: '30px'
  },
  mainTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0
  },
  subtitle: {
    color: '#64748b',
    fontSize: '14px',
    marginTop: '5px'
  },
  inputCard: {
    backgroundColor: '#fff',
    padding: '10px 15px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 2px 15px rgba(0,0,0,0.03)',
    marginBottom: '25px',
    border: '1px solid #f1f5f9'
  },
  plusIcon: { color: '#94a3b8', fontSize: '20px', marginRight: '10px' },
  input: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '15px',
    color: '#334155'
  },
  btnAdd: {
    backgroundColor: '#6366f1', // Màu tím xanh hiện đại
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  todoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '40px'
  },
  todoItem: {
    backgroundColor: '#fff',
    padding: '15px 20px',
    borderRadius: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    border: '1px solid #f1f5f9',
    transition: 'transform 0.2s'
  },
  todoLeft: { display: 'flex', alignItems: 'center', gap: '15px' },
  checkbox: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid #e2e8f0',
    cursor: 'pointer'
  },
  todoText: { color: '#334155', fontWeight: '500', fontSize: '15px' },
  btnDelete: {
    backgroundColor: 'transparent',
    color: '#ef4444',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '13px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#94a3b8',
    border: '2px dashed #e2e8f0',
    borderRadius: '12px'
  },
  statsRow: {
    display: 'flex',
    gap: '20px'
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    border: '1px solid #f1f5f9'
  },
  statLabel: { fontSize: '11px', fontWeight: '700', color: '#94a3b8', letterSpacing: '0.5px' },
  statValue: { fontSize: '24px', fontWeight: '700', color: '#1e293b', marginTop: '5px' }
};

export default Exercise4;