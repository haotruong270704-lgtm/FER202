import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="mt-5 py-3 border-top bg-light">
      <Container className="d-flex justify-content-between align-items-center">
        <span className="text-muted">© 2025 PersonalBudget Demo</span>
        <span className="text-muted">Built with React, Redux Toolkit & JSON Server</span>
      </Container>
    </footer>
  );
};

export default Footer;