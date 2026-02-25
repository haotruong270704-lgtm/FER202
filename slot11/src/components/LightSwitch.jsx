import React, { useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

// 1. Khởi tạo trạng thái ban đầu cho đèn
const initialState = { isOn: false };

// 2. Định nghĩa hàm reducer quản lý trạng thái đèn
function reducer(state, action) {
    switch (action.type) {
        case 'toggle':
            return { isOn: !state.isOn };
        case 'turnOn':
            return { isOn: true };
        case 'turnOff':
            return { isOn: false };
        default:
            return state;
    }
}

function LightSwitch() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { theme, toggleTheme } = useTheme(); // Sử dụng ThemeContext

    return (
        <Card className={`mb-4 shadow-sm ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
            <Card.Body className="text-center">
                <h2>Công Tắc Đèn</h2>
                <p className="display-6 fw-bold">
                    Đèn hiện đang: <span className={state.isOn ? "text-success" : "text-danger"}>
                        {state.isOn ? 'Bật' : 'Tắt'}
                    </span>
                </p>

                <div className="d-flex justify-content-center gap-2 mt-3">
                    {/* Nút đổi Theme đồng bộ với CounterComponent */}
                    <Button 
                        variant={theme === 'light' ? 'secondary' : 'outline-light'} 
                        onClick={toggleTheme}
                    >
                        {theme === 'light' ? 'Chế độ Tối' : 'Chế độ Sáng'}
                    </Button>

                    <Button variant="primary" onClick={() => dispatch({ type: 'toggle' })}>Chuyển Đổi</Button>
                    <Button variant="success" onClick={() => dispatch({ type: 'turnOn' })}>Bật Đèn</Button>
                    <Button variant="danger" onClick={() => dispatch({ type: 'turnOff' })}>Tắt Đèn</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default LightSwitch;