import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
// Thay đổi import từ Context sang Redux
import { useSelector, useDispatch } from 'react-redux'; 
import { logout } from '../redux/slices/authSlice'; 
import { useNavigate } from 'react-router-dom';

function NavbarExpenses() {
  // Lấy state từ Redux [cite: 1551, 1553]
  const { isAuthenticated, user } = useSelector((state) => state.auth); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Sử dụng action từ authSlice [cite: 1558]
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>Personal Budget</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {isAuthenticated && (
              <>
                <Navbar.Text className="me-3">
                  Signed in as <strong>{user?.fullName}</strong>
                </Navbar.Text>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarExpenses;