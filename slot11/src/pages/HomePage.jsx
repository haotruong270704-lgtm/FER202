import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import SlideBar from '../components/SlideBar';
import { menuCircles } from '../data/menuData';

// Import các component để làm Exercise 1 [cite: 21, 93-94]
import CounterComponent from '../components/CounterComponent';
import LightSwitch from '../components/LightSwitch';

const HomePage = () => {
    return (
        <div className="pb-5">
            {/* Phần SlideBar khống chế chiều cao 500px */}
            <SlideBar />

            <Container className="mt-5">
                {/* 1. Hiển thị các Component sử dụng ThemeContext để kiểm tra bài tập [cite: 100-101] */}
                <Row className="mb-5 justify-content-center">
                    <Col md={6}>
                        <CounterComponent />
                    </Col>
                    <Col md={6}>
                        <LightSwitch />
                    </Col>
                </Row>

                <hr className="my-5" />

                {/* 2. Hàng chứa các món ăn hình tròn */}
                <Row className="justify-content-center text-center">
                    {menuCircles.map((item) => (
                        <Col xs={4} md={2} key={item.id} className="mb-4">
                            <div className="menu-item-wrapper">
                                <Image 
                                    src={item.image} 
                                    roundedCircle 
                                    thumbnail
                                    className="shadow-sm border-2 hover-zoom"
                                    style={{ 
                                        width: '120px', 
                                        height: '120px', 
                                        objectFit: 'cover',
                                        cursor: 'pointer' 
                                    }}
                                />
                            </div>
                        </Col>
                    ))}
                </Row>

                {/* 3. Tiêu đề trang dưới cùng */}
                <div className="mt-5 pt-3">
                    <h2 className="text-danger fw-bold display-6">This is Home Page</h2>
                    <div style={{ width: '60px', height: '4px', backgroundColor: '#dc3545' }}></div>
                </div>
            </Container>
        </div>
    );
};

export default HomePage;