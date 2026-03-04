import React, { useState, useContext } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { getAccounts } from '../services/api';
import MessageModal from '../components/MessageModal';

const LoginPage = () => {
  const [input, setInput] = useState({ identifier: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // Lưu user để hiện Modal
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError('');
    
    let err = {};
    if (!input.identifier) err.identifier = "Username or Email is required.";
    if (!input.password) err.password = "Password is required.";
    
    if (Object.keys(err).length > 0) return setErrors(err);

    try {
      const { data } = await getAccounts();
      const foundUser = data.find(u => 
        (u.username === input.identifier || u.email === input.identifier) && 
        u.password === input.password
      );

      // 1. Kiểm tra tài khoản tồn tại [cite: 27]
      if (!foundUser) return setServerError("Invalid username/email or password!");

      // 2. Kiểm tra LOCKED trước (Dành cho loanlt) 
      if (foundUser.status === 'locked') {
        return setServerError("Account is locked. Please contact admin.");
      }

      // 3. Kiểm tra quyền ADMIN [cite: 28, 29]
      if (foundUser.role !== 'admin') {
        return setServerError("Access denied. Only admin users can log in.");
      }

      // Đăng nhập thành công 
      setLoggedInUser(foundUser);
      dispatch({ type: 'LOGIN', payload: foundUser });
      setShowModal(true);
    } catch (error) { 
      setServerError("Server error!"); 
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: '400px' }} className="shadow-sm">
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {serverError && (
            <Alert variant="danger" dismissible onClose={() => setServerError('')}>
              {serverError}
            </Alert>
          )}
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username or email</Form.Label>
              <Form.Control 
                isInvalid={!!errors.identifier} 
                onChange={e => setInput({...input, identifier: e.target.value})} 
                placeholder="Enter username or email"
              />
              <Form.Control.Feedback type="invalid">{errors.identifier}</Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                isInvalid={!!errors.password} 
                onChange={e => setInput({...input, password: e.target.value})} 
                placeholder="Enter password"
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            
            <div className="d-flex gap-2">
              <Button type="submit" className="w-50" variant="primary">Login</Button>
              <Button variant="secondary" className="w-50" onClick={() => setInput({ identifier: '', password: '' })}>Cancel</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      
      <MessageModal 
        show={showModal} 
        username={loggedInUser?.username} 
        onContinue={() => navigate('/accounts')} 
      />
    </Container>
  );
};

export default LoginPage;