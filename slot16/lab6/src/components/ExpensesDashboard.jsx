import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Form, Button } from 'react-bootstrap';
// Sử dụng useSelector và useDispatch từ react-redux [cite: 253, 293]
import { useSelector, useDispatch } from 'react-redux'; 
import { fetchExpensesThunk } from '../redux/slices/expensesSlice';
import { addExpense, updateExpense, deleteExpense } from '../services/ExpensesAPI';
import FooterExpenses from './FooterExpenses';
import ModalConfirm from './ModalConfirm';
import { formatCurrency, formatDate } from '../utils/formatters';
import NavbarExpenses from './NavbarExpenses';

function ExpensesDashboard() {
  // Lấy dữ liệu từ Redux Store [cite: 280, 513]
  const user = useSelector((state) => state.auth.user);
  const { items: expenses, loading } = useSelector((state) => state.expenses);
  const dispatch = useDispatch();

  const [filterCategory, setFilterCategory] = useState('All categories');
  const [formData, setFormData] = useState({ name: '', amount: '', category: 'Food', date: '' });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  // Dispatch action để lấy dữ liệu từ server [cite: 283, 399]
  const loadData = () => {
    dispatch(fetchExpensesThunk());
  };

  useEffect(() => { 
    if (user) loadData(); 
  }, [user]);

  const categories = [...new Set(expenses.map(e => e.category))];
  const filteredExpenses = expenses.filter(e => {
    const isUserExpense = e.userId === user?.id;
    const matchesCategory = filterCategory === 'All categories' || e.category === filterCategory;
    return isUserExpense && matchesCategory;
  });

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

    const expenseData = { ...formData, userId: user.id, amount: Number(formData.amount) };
    if (editingId) await updateExpense(editingId, expenseData);
    else await addExpense(expenseData);
    
    loadData();
    handleReset();
  };

  const handleReset = () => {
    setFormData({ name: '', amount: '', category: 'Food', date: '' });
    setEditingId(null);
    setValidated(false);
  };

  const handleDelete = async () => {
    await deleteExpense(deleteId);
    loadData();
    setShowModal(false);
  };

  // PHẦN QUAN TRỌNG: Trả về giao diện JSX
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarExpenses />
      <Container className="my-4 flex-grow-1">
        {loading && <p className="text-center">Loading expenses...</p>}
        <Row className="mb-4">
          <Col md={6}><Card><Card.Body><h5>Total of Expenses</h5><p className="h4 text-primary">{formatCurrency(totalExpenses)}</p></Card.Body></Card></Col>
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
                <div className="d-flex gap-2">
                  <Button variant="secondary" onClick={handleReset} className="w-100">Reset</Button>
                  <Button variant="primary" type="submit" className="w-100">Save</Button>
                </div>
              </Form>
            </Card.Body></Card>
          </Col>
          <Col md={8}>
            <Card><Card.Body>
              <h5>Expense Management</h5>
              <Table bordered hover responsive>
                <thead className="table-light"><tr><th>Name</th><th>Amount</th><th>Category</th><th>Date</th><th>Action</th></tr></thead>
                <tbody>
                  {filteredExpenses.length > 0 ? (
                    filteredExpenses.map(exp => (
                      <tr key={exp.id}><td>{exp.name}</td><td>{formatCurrency(exp.amount)}</td><td>{exp.category}</td><td>{formatDate(exp.date)}</td>
                      <td><Button variant="warning" size="sm" onClick={() => {setFormData(exp); setEditingId(exp.id);}}>Edit</Button> <Button variant="danger" size="sm" onClick={() => {setDeleteId(exp.id); setShowModal(true);}}>Delete</Button></td></tr>
                    ))
                  ) : (
                    <tr><td colSpan="5" className="text-center">No expenses found.</td></tr>
                  )}
                </tbody>
              </Table>
            </Card.Body></Card>
          </Col>
        </Row>
      </Container>
      <FooterExpenses />
      <ModalConfirm show={showModal} title="Confirm Delete" message="Are you sure you want to delete this expense?" onConfirm={handleDelete} onCancel={() => setShowModal(false)} />
    </div>
  );
}

export default ExpensesDashboard;