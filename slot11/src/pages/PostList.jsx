import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { fetchPosts } from '../utils/api';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [isOnline, setIsOnline] = useState(navigator.onLine); 

    useEffect(() => {
        const handleStatusChange = () => setIsOnline(navigator.onLine);
        window.addEventListener('online', handleStatusChange);
        window.addEventListener('offline', handleStatusChange);

        fetchPosts().then(data => setPosts(data.slice(0, 10))); 

        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, []);

    return (
        <div className="bg-white min-vh-100">
            <div className="py-5 mb-4 shadow-sm" style={{ backgroundColor: '#1a034d', color: 'white' }}>
                <Container className="text-center">
                    <h1 className="display-4 fw-bold mb-0">Posts</h1>
                </Container>
            </div>

            <Container>
                {/* Thông báo nội bộ trang Post */}
                {!isOnline && (
                    <Alert variant="danger" className="mb-4 shadow-sm border-2">
                        <i className="bi bi-wifi-off me-2"></i>
                        <strong>Cảnh báo:</strong> Bạn đang ngoại tuyến. Danh sách bài viết có thể không được cập nhật mới nhất.
                    </Alert>
                )}

                <Row className="g-5"> 
                    {posts.map((post) => (
                        <Col md={6} key={post.id}>
                            <div className="px-2">
                                <h3 className="post-title text-capitalize mb-2" style={{ fontWeight: '700', lineHeight: '1.2' }}>
                                    {post.title}
                                </h3>
                                <p className="post-body text-muted" style={{ lineHeight: '1.4', textAlign: 'justify' }}>
                                    {post.body}
                                </p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};
export default PostList;