import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Provider } from 'react-redux';
import store from './redux/store';
import ProtectedRoute from './routes/ProtectedRoute'; 
import LoginForm from './components/LoginForm'; 
import ExpensesDashboard from './components/ExpensesDashboard';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter> 
        <Routes> 
          <Route path="/login" element={<LoginForm />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <ExpensesDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;