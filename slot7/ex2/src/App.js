import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Exercise1 from './Exercise1';
import Exercise2 from './Exercise2';
import Exercise3 from './Exercise3';
import Exercise4 from './Exercise4';

function App() {
  return (
    <Router>
      <div style={styles.appContainer}>
        {/* THANH ĐIỀU HƯỚNG DỌC (SIDEBAR)  */}
        <aside style={styles.sidebar}>
          <div style={styles.logoSection}>
            <h2 style={styles.logoText}>PORTAL</h2>
          </div>
          
          <nav style={styles.navMenu}>
            <NavLink to="/ex1" style={({ isActive }) => isActive ? styles.activeLink : styles.link}>
              <span style={styles.icon}>🔢</span> Exercise 1
            </NavLink>
            <NavLink to="/ex2" style={({ isActive }) => isActive ? styles.activeLink : styles.link}>
              <span style={styles.icon}>🛍️</span> Exercise 2
            </NavLink>
            <NavLink to="/ex3" style={({ isActive }) => isActive ? styles.activeLink : styles.link}>
              <span style={styles.icon}>📋</span> Exercise 3
            </NavLink>
            <NavLink to="/ex4" style={({ isActive }) => isActive ? styles.activeLink : styles.link}>
              <span style={styles.icon}>✅</span> Exercise 4
            </NavLink>
          </nav>

          <div style={styles.footerSidebar}>
            <div style={styles.darkModeToggle}>
              <span>🌙 Dark Mode</span>
              <div style={styles.switch}></div>
            </div>
          </div>
        </aside>

        {/* NỘI DUNG HIỂN THỊ BÊN PHẢI  */}
        <main style={styles.mainContent}>
          <header style={styles.topHeader}>
            <span style={styles.breadcrumb}>Dashboard  ›  Current Exercise</span>
            <div style={styles.userProfile}>AD</div>
          </header>

          <div style={styles.exerciseContainer}>
            <Routes>
              <Route path="/ex1" element={<Exercise1 />} />
              <Route path="/ex2" element={<Exercise2 />} />
              <Route path="/ex3" element={<Exercise3 />} />
              <Route path="/ex4" element={<Exercise4 />} />
              <Route path="/" element={<div style={styles.welcome}>Chào mừng bạn! Hãy chọn bài tập ở thanh bên trái.</div>} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafd'
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#fff',
    borderRight: '1px solid #eef2f6',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    height: '100vh'
  },
  logoSection: {
    padding: '30px 25px',
    borderBottom: '1px solid #f8fafd'
  },
  logoText: {
    margin: 0,
    color: '#3b82f6',
    letterSpacing: '2px',
    fontSize: '22px'
  },
  navMenu: {
    padding: '20px 15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1
  },
  link: {
    textDecoration: 'none',
    color: '#64748b',
    padding: '12px 15px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    transition: 'all 0.2s'
  },
  activeLink: {
    textDecoration: 'none',
    color: '#3b82f6',
    backgroundColor: '#eff6ff',
    padding: '12px 15px',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: '12px',
    fontSize: '18px'
  },
  mainContent: {
    marginLeft: '260px', // Đẩy nội dung sang phải để không bị sidebar che
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  topHeader: {
    height: '70px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eef2f6',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 30px'
  },
  breadcrumb: {
    fontSize: '13px',
    color: '#94a3b8'
  },
  userProfile: {
    width: '35px',
    height: '35px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  exerciseContainer: {
    padding: '30px'
  },
  welcome: {
    textAlign: 'center',
    marginTop: '100px',
    color: '#64748b',
    fontSize: '18px'
  },
  footerSidebar: {
    padding: '20px',
    borderTop: '1px solid #f8fafd'
  },
  darkModeToggle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '14px',
    color: '#64748b'
  },
  switch: {
    width: '34px',
    height: '18px',
    backgroundColor: '#e2e8f0',
    borderRadius: '10px'
  }
};

export default App;