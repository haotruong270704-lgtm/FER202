import React from 'react';
import { Container, Card } from 'react-bootstrap';

const About = () => {
    return (
        <Container className="my-5">
            <Card className="shadow-sm border-light">
                <Card.Body className="p-4">
                    {/* 1. Thông tin tác giả */}
                    <div className="mb-4">
                        <h4 className="fw-bold mb-3">1. Thông tin tác giả</h4>
                        <ul className="list-unstyled ms-3">
                            <li className="mb-2">
                                <span className="fw-bold">* Mã SV:</span> DE180605
                            </li>
                            <li className="mb-2">
                                <span className="fw-bold">* Họ tên:</span> Haotdn
                            </li>
                            <li className="mb-2">
                                <span className="fw-bold">* GitHub:</span> 
                                <a href="https://github.com/haotdn" target="_blank" rel="noreferrer" className="ms-1 text-decoration-none">
                                    Link Github
                                </a>
                            </li>
                        </ul>
                    </div>

                    <hr className="my-4" />

                    {/* 2. Cấu trúc project đúng mô tả Lab 5 */}
                    <div>
                        <h4 className="fw-bold mb-3">2. Cấu trúc project</h4>
                        <p className="ms-3 text-muted mb-3">
                            Project được tổ chức theo cấu trúc Component-based với React-Bootstrap và áp dụng kỹ thuật Lazy Loading.
                        </p>
                        <ul className="list-unstyled ms-4">
                            <li className="mb-2"><strong>* Components:</strong> Chứa các thành phần giao diện dùng chung như NavBarPizza, SlideBar, và Footer.</li>
                            <li className="mb-2"><strong>* Data:</strong> Quản lý dữ liệu tĩnh cho ứng dụng (newsList, questions, slideImages, menuData).</li>
                            <li className="mb-2"><strong>* Pages:</strong> Các trang chính được tải theo phương thức <code>React.lazy</code> để tối ưu hiệu suất (Home, About, News, Quiz, Contact, UserList, PostList).</li>
                            <li className="mb-2"><strong>* Reducers:</strong> Xử lý logic trạng thái phức tạp cho Form Contact thông qua <code>useReducer</code>.</li>
                            <li className="mb-2"><strong>* Utils:</strong> Chứa các hàm hỗ trợ như API Client (api.js) để fetch dữ liệu từ JSONPlaceholder và các hàm Validation.</li>
                        </ul>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default About;