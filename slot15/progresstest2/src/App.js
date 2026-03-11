import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { AuthProvider } from './contexts/AuthContext'; 
import ProtectedRoute from './routes/ProtectedRoute'; 
import LoginForm from './components/LoginForm'; 
import ExpensesDashboard from './components/ExpensesDashboard';

function App() {
  return (
    <AuthProvider> 
      <BrowserRouter> 
        <Routes> 
          <Route path="/login" element={<LoginForm />} /> [cite: 222]
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
    </AuthProvider>
  );
}

// DÒNG QUAN TRỌNG NHẤT: Đảm bảo có dòng này ở cuối file
export default App; 