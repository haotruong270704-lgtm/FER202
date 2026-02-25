import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

// Import các Context Provider [cite: 92, 289]
import { ThemeProvider } from "./contexts/ThemeContext";
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

/**
 * Thành phần hiển thị khi đang tải dữ liệu
 */
const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <div className="spinner-border text-danger" role="status"></div>
    </div>
);

function App() {
    return (
        <AuthProvider> {/* Provider quản lý trạng thái đăng nhập [cite: 91, 289] */}
            <ThemeProvider> {/* Provider quản lý giao diện sáng/tối [cite: 31, 98] */}
                <Router>
                    <div className="App bg-light min-vh-100 d-flex flex-column" style={{ transition: 'all 0.3s ease' }}>
                        
                        {/* NavBar hiện tại sẽ chứa nút Login gọi Modal LoginForm [cite: 93] */}
                        <NavBarPizza />
                        
                        <main className="flex-grow-1">
                            {/* Suspense bao bọc các Route Lazy Loading [cite: 104] */}
                            <Suspense fallback={<LoadingSpinner />}>
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/news" element={<News />} />
                                    <Route path="/quiz" element={<Quiz />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/users" element={<UserList />} />
                                    <Route path="/posts" element={<PostList />} />
                                    
                                    {/* Trang báo lỗi khi không tìm thấy đường dẫn */}
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
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;