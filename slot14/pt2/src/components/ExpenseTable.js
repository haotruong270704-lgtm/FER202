import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useExpenses } from '../contexts/ExpenseContext';
import { deleteExpense } from '../services/api';

const ExpenseTable = () => {
  const { state, dispatch } = useExpenses();

  const handleDelete = async (id) => {
    if (window.confirm("Do you really want to delete this expense?")) {
      await deleteExpense(id);
      dispatch({ type: 'DELETE_EXPENSE', payload: id });
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {state.expenses.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{formatCurrency(item.amount)}</td>
            <td>{item.category}</td>
            <td>{formatDate(item.date)}</td>
            <td>
              <Button variant="warning" size="sm" className="me-2">Edit</Button>
              <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ExpenseTable;