import React, { useReducer } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { formReducer, initialState } from '../reducers/formReducer';

const Contact = () => {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        
        // Kích hoạt hiển thị lỗi/thành công
        dispatch({ type: 'SET_VALIDATED' });

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            alert("Form submitted successfully!");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        dispatch({
            type: 'UPDATE_FIELD',
            field: name,
            value: type === 'checkbox' ? checked : value
        });
    };

    return (
        <Container className="mt-5 p-4 bg-white rounded shadow-sm">
            <Form noValidate validated={state.validated} onSubmit={handleSubmit}>
                {/* Hàng 1: First name, Last name, Username */}
                <Row className="mb-3">
                    <Form.Group as={Col} md="4">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="firstName"
                            defaultValue={state.formData.firstName}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="lastName"
                            defaultValue={state.formData.lastName}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text>@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Username"
                                required
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>

                {/* Hàng 2: City, State, Zip */}
                <Row className="mb-3">
                    <Form.Group as={Col} md="6">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" name="city" placeholder="City" required onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">Please provide a valid city.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" name="state" placeholder="State" required onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">Please provide a valid state.</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control type="text" name="zip" placeholder="Zip" required onChange={handleChange} />
                        <Form.Control.Feedback type="invalid">Please provide a valid zip.</Form.Control.Feedback>
                    </Form.Group>
                </Row>

                {/* Checkbox đồng ý điều khoản */}
                <Form.Group className="mb-3">
                    <Form.Check
                        required
                        name="agree"
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        feedbackType="invalid"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button type="submit" className="px-4">Submit form</Button>
            </Form>
        </Container>
    );
};

export default Contact;