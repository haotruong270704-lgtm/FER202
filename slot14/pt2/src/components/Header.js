import React, { useContext } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#home">PersonalBudget</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="me-3">
            Signed in as: <strong>{state.user?.fullName}</strong>
          </Navbar.Text>
          <Button variant="outline-danger" size="sm" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;