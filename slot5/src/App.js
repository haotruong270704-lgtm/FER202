import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import About from './About';
import Contact from './Contact';
import ViewDetail from './ViewDetail';

// Thành phần Trang Chủ (Home)
function Home({ pizzaMenu }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="position-relative text-center overflow-hidden">
        <img src="/image/banner.jpg" className="w-100" alt="Banner" style={{ maxHeight: '400px', objectFit: 'cover', filter: 'brightness(40%)' }} />
        <div className="position-absolute top-50 start-50 translate-middle">
          <h2 className="display-4 fw-bold text-white">NEAPOLITAN PIZZA</h2>
        </div>
      </div>

      <div className="container mt-5">
        <h3 className="mb-4 text-white">Our Menu</h3>
        <div className="row g-4 pb-5">
          {pizzaMenu.map((pizza, index) => (
            <div className="col-12 col-md-6 col-lg-3" key={index}>
              <div className="card h-100 text-dark border-0 shadow">
                <img src={pizza.img} className="card-img-top" alt={pizza.name} style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body text-center">
                  <h5 className="fw-bold">{pizza.name}</h5>
                  <p className="text-warning fw-bold">{pizza.price}</p>
                  <div className="d-grid gap-2">
                    {/* Sửa nút View Details để nhảy trang */}
                    <button 
                      className="btn btn-outline-dark btn-sm" 
                      onClick={() => navigate(`/pizza/${index}`)}
                    >
                      View Details
                    </button>
                    <button className="btn btn-dark btn-sm">Buy</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <About />
      <Contact />
    </>
  );
}

function App() {
  const pizzaMenu = [
    { name: 'Margherita Pizza', price: '$24.00', img: '/image/nepolitan.jpg', desc: 'Pizza truyền thống Ý với sốt cà chua, Mozzarella và húng tây tươi.' },
    { name: 'Mushroom Pizza', price: '$25.00', img: '/image/hawai.jpg', desc: 'Sự kết hợp tuyệt vời giữa các loại nấm rừng và phô mai béo.' },
    { name: 'Hawaiian Pizza', price: '$30.00', img: '/image/ham.jpg', desc: 'Hương vị nhiệt đới đặc trưng với dứa tươi và thịt Ham xông khói.' },
    { name: 'Pesto Pizza', price: '$30.00', img: '/image/pesto.jpg', desc: 'Sốt Pesto húng tây xanh mướt kết hợp hạt thông bùi ngậy.' }
  ];

  return (
    <Router>
      <div className="bg-dark text-white min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 border-bottom sticky-top shadow">
          <Link className="navbar-brand fw-bold" to="/">Pizza House</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home pizzaMenu={pizzaMenu} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Định nghĩa Route cho trang chi tiết với tham số :id */}
          <Route path="/pizza/:id" element={<ViewDetail pizzaMenu={pizzaMenu} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;