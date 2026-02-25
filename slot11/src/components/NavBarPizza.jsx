import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm'; // Import Component vừa tách ở trên
import { useAuth } from '../contexts/AuthContext';

const NavBarPizza = () => {
    const [showLogin, setShowLogin] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();

    return (
        <Navbar bg="light" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="text-danger fw-bold">Pizza App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                        
                        {/* Kiểm tra trạng thái đăng nhập để hiển thị nút phù hợp */}
                        {isAuthenticated ? (
                            <div className="ms-2 d-flex align-items-center">
                                <span className="me-2 text-success small">Hi, {user.username}</span>
                                <Button variant="outline-danger" size="sm" onClick={logout}>Logout</Button>
                            </div>
                        ) : (
                            <Button 
                                variant="primary" 
                                size="sm" 
                                className="ms-2" 
                                onClick={() => setShowLogin(true)}
                            >
                                Login
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>

            {/* Chèn Modal vào đây, nó sẽ ẩn/hiện dựa trên state showLogin */}
            <LoginForm show={showLogin} handleClose={() => setShowLogin(false)} />
        </Navbar>
    );
};

export default NavBarPizza;