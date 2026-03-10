import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { addExpense } from '../services/api';
import { useExpenses } from '../contexts/ExpenseContext';

const ExpenseForm = () => {
  const [formData, setFormData] = useState({ name: '', amount: '', category: 'Food', date: '' });
  const { dispatch } = useExpenses();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || formData.amount <= 0) {
      alert("Name and Category must not be empty and Amount must be greater than 0");
      return;
    }

    const { data } = await addExpense({ ...formData, userId: "1" }); // Mặc định userId=1 cho anhnv
    dispatch({ type: 'ADD_EXPENSE', payload: data });
    setFormData({ name: '', amount: '', category: 'Food', date: '' });
  };

  return (
    <Card className="p-3 shadow-sm">
      <h5>Add Expense</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Amount</Form.Label>
          <Form.Control type="number" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Category</Form.Label>
          <Form.Select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
            <option value="Food">Food</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">Add Expense</Button>
      </Form>
    </Card>
  );
};

export default ExpenseForm;