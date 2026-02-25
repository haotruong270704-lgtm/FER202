import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

// Import các Context Provider và hook useTheme [cite: 425-426, 430]
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

// Import các thành phần giao diện cố định
import NavBarPizza from './components/NavBarPizza';
import Footer from './components/Footer';

// Cấu hình Lazy Loading cho các trang
const HomePage = lazy(() => import('./pages/HomePage'));
const About = lazy(() => import('./pages/About'));
const News = lazy(() => import('./pages/News'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Contact = lazy(() => import('./pages/Contact'));
const UserList = lazy(() => import('./pages/UserList'));
const PostList = lazy(() => import('./pages/PostList'));

const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <div className="spinner-border text-danger" role="status"></div>
    </div>
);

/**
 * Component con để có thể truy cập useTheme() [cite: 435-438]
 */
const AppContent = () => {
    const { theme } = useTheme(); // Lấy trạng thái theme hiện tại

    return (
        /* Sử dụng template literal để thay đổi class 'bg-dark' hoặc 'bg-light' động [cite: 435] */
        <div className={`App min-vh-100 d-flex flex-column ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`} 
             style={{ transition: 'all 0.3s ease' }}>
            
            <NavBarPizza />
            
            <main className="flex-grow-1">
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/quiz" element={<Quiz />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/users" element={<UserList />} />
                        <Route path="/posts" element={<PostList />} />
                        
                        <Route path="*" element={
                            <Container className="text-center mt-5">
                                <h1 className="display-1 fw-bold text-muted">404</h1>
                                <p className="lead">Trang không tồn tại.</p>
                            </Container>
                        } />
                    </Routes>
                </Suspense>
            </main>
            
            <Footer />
        </div>
    );
};

function App() {
    return (
        <AuthProvider> 
            <ThemeProvider> 
                <Router>
                    <AppContent />
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;