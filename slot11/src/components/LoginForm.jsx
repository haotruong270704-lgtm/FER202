import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = ({ show, handleClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // Thêm state để quản lý lỗi validation khi để trống
    const [errors, setErrors] = useState({ username: '', password: '' });
    
    const { login, error: authError } = useAuth(); // Lấy hàm login và lỗi từ Context [cite: 53, 290]

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Khởi tạo đối tượng chứa lỗi mới
        let validationErrors = { username: '', password: '' };
        let isValid = true;

        // Kiểm tra validation từng trường 
        if (!username.trim()) {
            validationErrors.username = 'Tên đăng nhập không được để trống';
            isValid = false;
        }
        if (!password.trim()) {
            validationErrors.password = 'Mật khẩu không được để trống';
            isValid = false;
        }

        setErrors(validationErrors);

        if (isValid) {
            const success = login(username, password); // Thực hiện login từ AuthContext [cite: 262-287]
            if (success) {
                // Reset form và đóng modal nếu thành công
                setUsername('');
                setPassword('');
                setErrors({ username: '', password: '' });
                handleClose();
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Đăng Nhập Admin</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Lỗi đăng nhập sai từ AuthContext [cite: 290] */}
                {authError && <Alert variant="danger">{authError}</Alert>}
                
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            isInvalid={!!errors.username}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                        {/* Hiển thị chữ đỏ ngay dưới ô Username  */}
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            isInvalid={!!errors.password}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                        {/* Hiển thị chữ đỏ ngay dưới ô Password  */}
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Đăng Nhập
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LoginForm;