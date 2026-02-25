import React, { useReducer } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { formReducer, initialState } from '../reducers/formReducer';

const DangKy = () => {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        dispatch({ type: 'SET_VALIDATED' });
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
        <Container className="mt-4">
            <Form noValidate validated={state.validated} onSubmit={handleSubmit}>
                {/* Row 1: First Name, Last Name, Username */}
                <Row className="mb-3">
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="firstName"
                            placeholder="First name"
                            defaultValue={state.formData.firstName}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustom02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            defaultValue={state.formData.lastName}
                            onChange={handleChange}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Username"
                                aria-describedby="inputGroupPrepend"
                                required
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Row>

                {/* Row 2: City, State, Zip */}
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom03">
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="city" 
                            placeholder="City" 
                            required 
                            onChange={handleChange} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid city.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom04">
                        <Form.Label>State</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="state" 
                            placeholder="State" 
                            required 
                            onChange={handleChange} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid state.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="validationCustom05">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="zip" 
                            placeholder="Zip" 
                            required 
                            onChange={handleChange} 
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid zip.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                {/* Row 3: Agree to terms */}
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

                <Button type="submit">Submit form</Button>
            </Form>
        </Container>
    );
};

export default DangKy;