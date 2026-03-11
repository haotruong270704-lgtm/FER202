import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../services/ExpensesAPI';
import FooterExpenses from './FooterExpenses';
import ModalConfirm from './ModalConfirm';
import { formatCurrency, formatDate } from '../utils/formatters';
import NavbarExpenses from './NavbarExpenses';

function ExpensesDashboard() {
  const { state } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState('All categories');
  const [formData, setFormData] = useState({ name: '', amount: '', category: 'Food', date: '' });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      const userExpenses = data.filter(e => e.userId === state.user.id);
      setExpenses(userExpenses);
    } catch (error) { console.error(error); }
  };

  useEffect(() => { if (state.user) fetchExpenses(); }, [state.user]);

  const categories = [...new Set(expenses.map(e => e.category))];
  const filteredExpenses = filterCategory === 'All categories' 
    ? expenses 
    : expenses.filter(e => e.category === filterCategory);
  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.amount || Number(formData.amount) <= 0) newErrors.amount = 'Amount must be greater than 0.';
    if (!formData.date) newErrors.date = 'Date is required.';
    
    setValidated(true);
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    const expenseData = { ...formData, userId: state.user.id, amount: Number(formData.amount) };
    if (editingId) await updateExpense(editingId, expenseData);
    else await addExpense(expenseData);
    
    fetchExpenses();
    setFormData({ name: '', amount: '', category: 'Food', date: '' });
    setEditingId(null);
    setValidated(false);
  };

  const handleDelete = async () => {
    await deleteExpense(deleteId);
    fetchExpenses();
    setShowModal(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarExpenses />
      <Container className="my-4 flex-grow-1">
        <Row className="mb-4">
          <Col md={6}><Card><Card.Body><h5>Total of Expenses</h5><p>{formatCurrency(totalExpenses)}</p></Card.Body></Card></Col>
          <Col md={6}><Card><Card.Body><h5>Filter</h5><Form.Select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}><option>All categories</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}</Form.Select></Card.Body></Card></Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card><Card.Body>
              <h5>{editingId ? 'Edit Expense' : 'Add Expense'}</h5>
              <Form noValidate onSubmit={handleSave}>
                <Form.Group className="mb-3"><Form.Label>Name</Form.Label><Form.Control name="name" value={formData.name} onChange={handleInputChange} isInvalid={validated && !!errors.name}/><Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback></Form.Group>
                <Form.Group className="mb-3"><Form.Label>Amount</Form.Label><Form.Control name="amount" type="number" value={formData.amount} onChange={handleInputChange} isInvalid={validated && !!errors.amount}/><Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback></Form.Group>
                <Form.Group className="mb-3"><Form.Label>Category</Form.Label><Form.Select name="category" value={formData.category} onChange={handleInputChange}><option value="Food">Food</option><option value="Utilities">Utilities</option><option value="Entertainment">Entertainment</option><option value="Mua sắm">Mua sắm</option></Form.Select></Form.Group>
                <Form.Group className="mb-3"><Form.Label>Date</Form.Label><Form.Control name="date" type="date" value={formData.date} onChange={handleInputChange} isInvalid={validated && !!errors.date}/><Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback></Form.Group>
                <Button variant="primary" type="submit">Save</Button>
              </Form>
            </Card.Body></Card>
          </Col>
          <Col md={8}>
            <Card><Card.Body>
              <h5>Expense Management</h5>
              <Table bordered hover>
                <thead><tr><th>Name</th><th>Amount</th><th>Category</th><th>Date</th><th>Action</th></tr></thead>
                <tbody>{filteredExpenses.map(exp => (
                  <tr key={exp.id}><td>{exp.name}</td><td>{formatCurrency(exp.amount)}</td><td>{exp.category}</td><td>{formatDate(exp.date)}</td>
                  <td><Button variant="warning" size="sm" onClick={() => {setFormData(exp); setEditingId(exp.id);}}>Edit</Button> <Button variant="danger" size="sm" onClick={() => {setDeleteId(exp.id); setShowModal(true);}}>Delete</Button></td></tr>
                ))}</tbody>
              </Table>
            </Card.Body></Card>
          </Col>
        </Row>
      </Container>
      <FooterExpenses />
      <ModalConfirm show={showModal} title="Confirm Delete" message="Are you sure?" onConfirm={handleDelete} onCancel={() => setShowModal(false)} />
    </div>
  );
}
export default ExpensesDashboard;