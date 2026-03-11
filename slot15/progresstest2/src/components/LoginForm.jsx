import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { loginAction } from '../services/AuthAPI';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ModalConfirm from './ModalConfirm';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setError] = useState({ message: '' });
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';
    if (username && username.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(username)) newErrors.username = 'Invalid email format';
    }
    if (password && password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    const result = await loginAction(dispatch, { username, password });
    if (result.success) {
      if (result.user.status === 'locked') {
        setError({ message: 'Access is denied. Your account is locked.' });
        return;
      }
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate('/');
      }, 3000);
    } else {
      setError({ message: result.message });
    }
  };

  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setError((prev) => ({ ...prev, [field]: '', message: '' }));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white py-3">
              <h3 className="text-center mb-0">Login</h3>
            </Card.Header>
            <Card.Body className="p-4">
              {(state.error || errors.message) && <Alert variant="danger">{state.error || errors.message}</Alert>}
              <Form noValidate onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Username or email</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={username} 
                    onChange={handleInputChange(setUsername, 'username')} 
                    isInvalid={!!errors.username} 
                  />
                  <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password" 
                    value={password} 
                    onChange={handleInputChange(setPassword, 'password')} 
                    isInvalid={!!errors.password} 
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <div className="d-flex gap-2 mt-4">
                  <Button variant="primary" type="submit" className="flex-fill" disabled={state.loading}>
                    {state.loading ? 'Logging in...' : 'Login'}
                  </Button>
                  <Button variant="secondary" onClick={() => {setUsername(''); setPassword('');}} className="flex-fill">Cancel</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ModalConfirm 
        show={showModal} 
        title="Login Successful" 
        message="You have successfully logged in. Redirecting to dashboard..." 
        onConfirm={() => setShowModal(false)} 
        onCancel={() => setShowModal(false)} 
      />
    </Container>
  );
}
export default LoginForm;