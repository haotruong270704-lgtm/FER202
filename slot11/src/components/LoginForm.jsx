import React, { useReducer } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const initialFormState = {
    identifier: '',
    password: '',
    errors: {}
};

function formReducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD': return { ...state, [action.field]: action.value };
        case 'SET_ERRORS': return { ...state, errors: action.errors };
        case 'RESET_FORM': return initialFormState;
        default: return state;
    }
}

const LoginForm = ({ show, handleClose }) => {
    const [formState, dispatchForm] = useReducer(formReducer, initialFormState);
    const { login, loading, error, clearError } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatchForm({ type: 'SET_FIELD', field: name, value });
        clearError(); // Xóa lỗi hệ thống khi người dùng bắt đầu nhập lại 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        
        // Required field validation [cite: 309, 570-577]
        if (!formState.identifier.trim()) errors.identifier = 'Username hoặc Email là bắt buộc.';
        if (!formState.password.trim()) errors.password = 'Mật khẩu là bắt buộc.';

        dispatchForm({ type: 'SET_ERRORS', errors });

        if (Object.keys(errors).length === 0) {
            const result = await login(formState.identifier.trim(), formState.password);
            if (result.ok) {
                dispatchForm({ type: 'RESET_FORM' });
                handleClose();
            }
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Đăng Nhập Hệ Thống</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger" dismissible onClose={clearError}>{error}</Alert>}
                
                <Form onSubmit={handleSubmit} noValidate>
                    <Form.Group className="mb-3">
                        <Form.Label>Username hoặc Email</Form.Label>
                        <Form.Control 
                            name="identifier"
                            type="text" 
                            value={formState.identifier}
                            onChange={handleChange}
                            isInvalid={!!formState.errors.identifier}
                            disabled={loading}
                        />
                        <Form.Control.Feedback type="invalid">{formState.errors.identifier}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control 
                            name="password"
                            type="password" 
                            value={formState.password}
                            onChange={handleChange}
                            isInvalid={!!formState.errors.password}
                            disabled={loading}
                        />
                        <Form.Control.Feedback type="invalid">{formState.errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                        {loading ? <><Spinner size="sm" className="me-2" /> Đang kiểm tra...</> : 'Đăng Nhập'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default LoginForm;