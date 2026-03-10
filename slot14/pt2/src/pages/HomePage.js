import React, { useEffect, useContext } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import FilterBar from '../components/FilterBar';
import Footer from '../components/Footer'; // Thêm Import Footer 
import { useExpenses } from '../contexts/ExpenseContext';
import { AuthContext } from '../contexts/AuthContext'; // Để lọc theo user [cite: 38]
import { getExpenses } from '../services/api';

const HomePage = () => {
  const { state, dispatch } = useExpenses();
  const { state: authState } = useContext(AuthContext); // Lấy thông tin user hiện tại [cite: 28, 38]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getExpenses();
        // Chỉ lấy danh sách chi tiêu của người dùng đang đăng nhập 
        const currentUserExpenses = data.filter(exp => exp.userId === authState.user?.id);
        dispatch({ type: 'SET_EXPENSES', payload: currentUserExpenses });
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    if (authState.user?.id) {
      fetchData();
    }
  }, [dispatch, authState.user?.id]);

  // Tính tổng tiền định dạng VNĐ [cite: 46, 47, 48]
  const total = state.expenses.reduce((sum, item) => sum + Number(item.amount), 0);
  const formattedTotal = new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND' 
  }).format(total); // Tự động cập nhật khi amount thay đổi [cite: 49]

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header /> {/* Header hiển thị tên và nút Logout [cite: 26, 28] */}
      
      <Container className="mt-4 flex-grow-1">
        <Row>
          <Col md={4}>
            {/* Card hiển thị tổng chi tiêu [cite: 29, 46] */}
            <Card className="mb-3 p-3 shadow-sm">
              <h5>Total of Expenses</h5>
              <h3 className="text-primary">{formattedTotal}</h3>
            </Card>
            
            {/* Form thêm/sửa chi tiêu [cite: 32, 41] */}
            <ExpenseForm />
          </Col>
          
          <Col md={8}>
            {/* Bộ lọc theo Category [cite: 30, 50] */}
            <FilterBar />
            
            {/* Bảng quản lý chi tiêu [cite: 34, 35] */}
            <ExpenseTable />
          </Col>
        </Row>
      </Container>

      <Footer /> {/* Footer hiển thị bản quyền và công nghệ  */}
    </div>
  );
};

export default HomePage;