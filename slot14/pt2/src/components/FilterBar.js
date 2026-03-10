import React, { useState, useEffect } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useExpenses } from '../contexts/ExpenseContext';
import { getExpenses } from '../services/api';

const FilterBar = () => {
  const { state, dispatch } = useExpenses();
  const [category, setCategory] = useState('All categories');

  const handleFilter = async (e) => {
    const selected = e.target.value;
    setCategory(selected);

    // Gọi lại API để lấy dữ liệu gốc
    const { data } = await getExpenses();
    
    if (selected === 'All categories') {
      dispatch({ type: 'SET_EXPENSES', payload: data });
    } else {
      // Lọc các khoản chi tiêu có Category khớp với lựa chọn
      const filtered = data.filter(exp => exp.category === selected);
      dispatch({ type: 'SET_EXPENSES', payload: filtered });
    }
  };

  return (
    <Card className="mb-3 p-3 shadow-sm">
      <Form.Group>
        <Form.Label><strong>Filter by Category</strong></Form.Label>
        <Form.Select value={category} onChange={handleFilter}>
          <option value="All categories">All categories</option>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
        </Form.Select>
      </Form.Group>
    </Card>
  );
};

export default FilterBar;