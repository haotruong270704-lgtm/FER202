import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { newLists } from '../data/newsList';

const News = () => {
    return (
        <Container className="my-5">
            {/* Tiêu đề danh mục màu đỏ đặc trưng */}
            <h2 className="text-danger fw-bold mb-4" style={{ fontSize: '2rem' }}>
                News Category
            </h2>
            
            <Row>
                {newLists.map((news) => (
                    <Col lg={3} md={6} sm={12} key={news.id} className="mb-4">
                        <Card className="h-100 border-light shadow-sm">
                            {/* Hình ảnh tin tức với kích thước đồng nhất */}
                            <Card.Img 
                                variant="top" 
                                src={news.images} 
                                style={{ height: '220px', objectFit: 'cover' }}
                                alt={news.title}
                            />
                            <Card.Body className="d-flex flex-column p-3">
                                {/* Tiêu đề tin tức ngắn gọn */}
                                <Card.Title className="fs-6 fw-bold text-dark mb-2" style={{ minHeight: '3.5rem', lineHeight: '1.4' }}>
                                    {news.title}
                                </Card.Title>
                                
                                {/* Mô tả ngắn gọn */}
                                <Card.Text className="text-muted small mb-3" style={{ fontSize: '0.85rem' }}>
                                    {news.description.length > 120 
                                        ? news.description.substring(0, 120) + "..." 
                                        : news.description}
                                </Card.Text>
                                
                                {/* Link chi tiết màu xanh đặc trưng */}
                                <a href="#!" className="mt-auto text-primary small text-decoration-underline" style={{ fontSize: '0.8rem' }}>
                                    {news.title}
                                </a>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default News;