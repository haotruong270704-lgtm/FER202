import React, { useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext'; 

// 1. Khởi tạo trạng thái ban đầu [cite: 113-114]
const initialState = { count: 0 };

// 2. Định nghĩa hàm reducer [cite: 115-116]
function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return initialState;
        default:
            return state;
    }
}

function CounterComponent() {
    // 3. Sử dụng useReducer để quản lý trạng thái [cite: 128-130]
    const [state, dispatch] = useReducer(reducer, initialState);
    
    // 4. Sử dụng ThemeContext từ Custom Hook [cite: 135-136]
    const { theme, toggleTheme } = useTheme();

    return (
        <Card className={`mb-4 shadow-sm ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}> 
            <Card.Body className="text-center">
                <h2>Bộ Đếm Đa Năng</h2>
                <p className="display-6 fw-bold">Giá trị hiện tại: {state.count}</p>
                
                <div className="d-flex justify-content-center gap-2 mt-3">
                    {/* Nút đổi Theme [cite: 152-161] */}
                    <Button 
                        variant={theme === 'light' ? 'secondary' : 'outline-light'}
                        onClick={toggleTheme}
                    >
                        {theme === 'light' ? 'Chế độ Tối' : 'Chế độ Sáng'}
                    </Button>

                    {/* Các nút chức năng bộ đếm [cite: 162-179] */}
                    <Button variant="primary" onClick={() => dispatch({ type: 'increment' })}>Tăng (+1)</Button>
                    <Button variant="warning" onClick={() => dispatch({ type: 'decrement' })}>Giảm (-1)</Button>
                    <Button variant="danger" onClick={() => dispatch({ type: 'reset' })}>Reset</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CounterComponent;