import React, { createContext, useReducer, useContext } from 'react';

const ExpenseContext = createContext();

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXPENSES': return { ...state, expenses: action.payload };
    case 'ADD_EXPENSE': return { ...state, expenses: [...state.expenses, action.payload] };
    case 'DELETE_EXPENSE': return { ...state, expenses: state.expenses.filter(e => e.id !== action.payload) };
    case 'UPDATE_EXPENSE': return {
      ...state,
      expenses: state.expenses.map(e => e.id === action.payload.id ? action.payload : e)
    };
    default: return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, { expenses: [] });
  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);