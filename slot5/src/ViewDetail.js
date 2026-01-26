import React from 'react';
import { useParams, Link } from 'react-router-dom';

function ViewDetail({ pizzaMenu }) {
  // Lấy id từ thanh địa chỉ URL
  const { id } = useParams();
  const pizza = pizzaMenu[id];

  if (!pizza) return <div className="container mt-5 text-white">Không tìm thấy sản phẩm!</div>;

  return (
    <div className="container mt-5 py-5 text-white animate__animated animate__fadeIn">
      <div className="row">
        <div className="col-md-6">
          <img src={pizza.img} className="img-fluid rounded shadow-lg" alt={pizza.name} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
        </div>
        <div className="col-md-6 ps-md-5">
          <h2 className="display-4 fw-bold text-warning">{pizza.name}</h2>
          <p className="lead mt-4">{pizza.desc}</p>
          <h3 className="text-warning mt-3">Giá: {pizza.price}</h3>
          <div className="mt-5 d-flex gap-3">
            <button className="btn btn-warning btn-lg fw-bold px-5">Đặt Hàng Ngay</button>
            <Link to="/" className="btn btn-outline-light btn-lg px-4">Quay lại Menu</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetail;