import React, { createContext, useReducer, useContext } from 'react';

// Dữ liệu mẫu [cite: 262-287]
const mockAccounts = [
    { id: 1, username: 'admin', email: 'admin@example.com', password: '123456', role: 'admin', status: 'active' },
    { id: 2, username: 'user1', email: 'user1@example.com', password: '123456', role: 'user', status: 'active' }
];

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { ...state, isAuthenticated: true, user: action.payload, error: null };
        case 'LOGIN_FAILURE':
            return { ...state, isAuthenticated: false, user: null, error: action.payload };
        case 'LOGOUT':
            return { isAuthenticated: false, user: null, error: null };
        default: return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { isAuthenticated: false, user: null, error: null });

    const login = (username, password) => {
        const account = mockAccounts.find(acc => acc.username === username && acc.password === password);
        if (account && account.role === 'admin') {
            dispatch({ type: 'LOGIN_SUCCESS', payload: account });
            return true;
        }
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Chỉ Admin mới có quyền đăng nhập!' });
        return false;
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout: () => dispatch({ type: 'LOGOUT' }) }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);