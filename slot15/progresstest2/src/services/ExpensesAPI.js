import axios from 'axios';
const API_URL = 'http://localhost:3001/expenses';

export const getExpenses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addExpense = async (expense) => {
  const response = await axios.post(API_URL, expense);
  return response.data;
};

export const updateExpense = async (id, updatedExpense) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedExpense);
  return response.data;
};

export const deleteExpense = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};