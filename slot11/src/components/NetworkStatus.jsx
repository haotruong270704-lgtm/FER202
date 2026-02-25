import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleStatusChange = () => setIsOnline(navigator.onLine);
        
        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);

        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, []);

    if (!isOnline) {
        return (
            <Alert variant="danger" className="mb-4 shadow-sm border-2 py-3 mx-auto">
                <div className="d-flex align-items-center justify-content-center gap-3">
                    <i className="bi bi-wifi-off fs-4"></i>
                    <div>
                        <strong>Cảnh báo:</strong> Bạn đang ngoại tuyến. Danh sách bài viết có thể không được cập nhật mới nhất.
                    </div>
                </div>
            </Alert>
        );
    }

    return null;
};

export default NetworkStatus;