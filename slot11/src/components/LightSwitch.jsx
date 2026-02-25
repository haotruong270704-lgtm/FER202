import React, { useReducer } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext'; // Import hook để điều khiển theme hệ thống

const initialState = { isOn: true }; // Mặc định đèn bật (trang sáng)

function reducer(state, action) {
    switch (action.type) {
        case 'toggle': return { isOn: !state.isOn };
        case 'turnOn': return { isOn: true };
        case 'turnOff': return { isOn: false };
        default: return state;
    }
}

function LightSwitch() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { theme, toggleTheme } = useTheme(); // Lấy theme và hàm chuyển đổi từ ThemeContext

    // Hàm xử lý đồng bộ giữa trạng thái Đèn và Theme toàn trang
    const handleSwitch = (actionType) => {
        dispatch({ type: actionType });

        // Nếu người dùng chọn Tắt đèn mà trang đang Sáng -> Chuyển toàn trang sang Tối
        if (actionType === 'turnOff' && theme === 'light') {
            toggleTheme();
        } 
        // Nếu người dùng chọn Bật đèn mà trang đang Tối -> Chuyển toàn trang sang Sáng
        else if (actionType === 'turnOn' && theme === 'dark') {
            toggleTheme();
        }
        // Nếu dùng nút Chuyển đổi (Toggle)
        else if (actionType === 'toggle') {
            toggleTheme();
        }
    };

    return (
        <Card className={`mb-4 shadow-sm ${theme === 'dark' ? 'bg-dark text-white border-secondary' : 'bg-light text-dark'}`}>
            <Card.Body className="text-center">
                <i className={`bi ${state.isOn ? 'bi-lightbulb-fill text-warning' : 'bi-lightbulb text-muted'}`} style={{ fontSize: '3rem' }}></i>
                <h2 className="mt-3">Chế Độ Hệ Thống</h2>
                <p className="lead">
                    Trạng thái: <strong>{state.isOn ? 'Đang Sáng' : 'Đang Tối'}</strong>
                </p>

                <div className="d-flex justify-content-center gap-3 mt-4">
                    <Button 
                        variant={state.isOn ? "outline-dark" : "success"} 
                        onClick={() => handleSwitch('turnOn')}
                        disabled={state.isOn}
                    >
                        <i className="bi bi-sun-fill me-2"></i>Bật Đèn (Sáng)
                    </Button>
                    
                    <Button 
                        variant={!state.isOn ? "outline-light" : "danger"} 
                        onClick={() => handleSwitch('turnOff')}
                        disabled={!state.isOn}
                    >
                        <i className="bi bi-moon-stars-fill me-2"></i>Tắt Đèn (Tối)
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default LightSwitch;