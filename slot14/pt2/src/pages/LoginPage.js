import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { getUsers } from '../services/api';

const LoginPage = () => {
  const [input, setInput] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!input.username || !input.password) {
      return setError("Username and password are required"); // [cite: 19, 20]
    }
    if (input.password.length < 6) {
      return setError("Password must be at least 6 characters"); // 
    }

    try {
      const { data } = await getUsers();
      const user = data.find(u => u.username === input.username && u.password === input.password);
      if (user) {
        dispatch({ type: 'LOGIN', payload: user });
        navigate('/home'); // [cite: 22]
      } else {
        setError("Invalid username or password!");
      }
    } catch (err) { setError("Server error!"); }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }} className="p-4 shadow">
        <h1 className="text-center mb-4">Login</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={e => setInput({...input, username: e.target.value})} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={e => setInput({...input, password: e.target.value})} />
            <Form.Text className="text-muted">(at least 6 characters)</Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Login</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginPage;