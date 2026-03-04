import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const FilterBar = ({ onSearch, onFilterStatus, onFilterRole, onSort }) => {
  return (
    <Row className="mb-3">
      {/* Search by username or email [cite: 43] */}
      <Col md={4}>
        <Form.Control
          type="text"
          placeholder="Search by username or email"
          onChange={(e) => onSearch(e.target.value)}
        />
      </Col>

      {/* Filter by Status [cite: 45] */}
      <Col md={2}>
        <Form.Select onChange={(e) => onFilterStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="active">Active</option>
          <option value="locked">Locked</option>
        </Form.Select>
      </Col>

      {/* Filter by Role [cite: 46] */}
      <Col md={2}>
        <Form.Select onChange={(e) => onFilterRole(e.target.value)}>
          <option value="All">All Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Form.Select>
      </Col>

      {/* Sorting [cite: 47] */}
      <Col md={4}>
        <Form.Select onChange={(e) => onSort(e.target.value)}>
          <option value="">Sort</option>
          <option value="user_asc">Username (A-Z)</option>
          <option value="user_desc">Username (Z-A)</option>
          <option value="role">By Role</option>
          <option value="status">By Status</option>
        </Form.Select>
      </Col>
    </Row>
  );
};

export default FilterBar;