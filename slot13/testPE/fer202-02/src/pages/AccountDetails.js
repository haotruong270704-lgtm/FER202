import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

const AccountDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch dữ liệu user cụ thể dựa trên ID từ URL
    axios.get(`http://localhost:9999/accounts/${id}`)
      .then(res => setUser(res.data))
      .catch(err => console.error("Error fetching user details", err));
  }, [id]);

  if (!user) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm border-0">
        <Card.Title className="mb-4 text-primary"><h3>Account Details</h3></Card.Title>
        <Row className="align-items-center">
          <Col md={4} className="text-center border-end">
            <img 
              src={user.avatar} 
              alt={user.username} 
              className="img-fluid rounded shadow-sm" 
              style={{ maxWidth: '200px' }} 
            />
          </Col>
          <Col md={8} className="ps-md-5">
            <div className="mb-3">
              <h6 className="text-muted fw-bold">Username</h6>
              <p className="fs-5">{user.username}</p>
            </div>
            <div className="mb-3">
              <h6 className="text-muted fw-bold">Email</h6>
              <p className="fs-5">{user.email}</p>
            </div>
            <div className="mb-3">
              <h6 className="text-muted fw-bold">Role</h6>
              <p className="fs-5 text-capitalize">{user.role}</p>
            </div>
            <div className="mb-3">
              <h6 className="text-muted fw-bold">Status</h6>
              <p className={`fs-5 text-capitalize ${user.status === 'active' ? 'text-success' : 'text-danger'}`}>
                {user.status}
              </p>
            </div>
          </Col>
        </Row>
        <Card.Footer className="bg-white border-0 mt-4 text-end">
          <Button variant="secondary" onClick={() => navigate('/accounts')}>
            Back to list
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default AccountDetails;