import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import { ListOfUsers } from './ListOfUsers';

function App() {
  const [view, setView] = useState('home');

  return (
    <div className="skybound-app">
      {/* NAVIGATION BAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 py-2 sticky-top">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold d-flex align-items-center" href="#" onClick={() => setView('home')}>
            <img src="https://cdn-icons-png.flaticon.com/512/784/784665.png" alt="logo" width="30" className="me-2"/>
            SkyBound
          </a>
          <div className="mx-auto d-none d-lg-flex gap-4">
            <a href="#" className={`nav-link ${view === 'home' ? 'fw-bold border-bottom border-primary' : ''}`} onClick={() => setView('home')}>Flights</a>
            <a href="#" className="nav-link">Hotels</a>
            <a href="#" className="nav-link">Packages</a>
            <a href="#" className={`nav-link ${view === 'explore' ? 'text-primary fw-bold' : ''}`} 
               onClick={(e) => { e.preventDefault(); setView('explore'); }}>Explore</a>
          </div>
          <div className="d-flex align-items-center gap-3">
            <i className="bi bi-moon fs-5"></i>
            <button className="btn btn-primary rounded-pill px-4 fw-bold">Sign In</button>
          </div>
        </div>
      </nav>

      {view === 'home' ? (
        <>
          {/* HERO SECTION - Giao diện cửa sổ máy bay */}
          <header className="hero-section text-center text-white d-flex align-items-center justify-content-center">
            <div className="container hero-inner">
              <h1 className="display-4 fw-bold mb-3">Where will your <span className="text-info-custom">journey</span> take you?</h1>
              <p className="lead mb-5 opacity-75">Discover extraordinary destinations with the world's most awarded airline.<br/>Experience luxury and comfort at 35,000 feet.</p>

              {/* BOOKING CARD */}
              <div className="booking-card mx-auto p-4 rounded-4 shadow-lg text-dark">
                <div className="d-flex gap-4 mb-4 border-bottom pb-2">
                  <span className="text-primary fw-bold border-bottom border-primary border-3 pb-2 cursor-pointer">Round Trip</span>
                  <span className="text-secondary cursor-pointer">One Way</span>
                  <span className="text-secondary cursor-pointer">Multi-city</span>
                </div>

                <div className="row g-3 text-start mb-3">
                  <div className="col-md-3">
                    <label className="small fw-bold text-secondary">FROM</label>
                    <div className="input-with-icon"><i className="bi bi-airplane"></i><input type="text" className="form-control" placeholder="Departure City" /></div>
                  </div>
                  <div className="col-md-3">
                    <label className="small fw-bold text-secondary">TO</label>
                    <div className="input-with-icon"><i className="bi bi-geo-alt"></i><input type="text" className="form-control" placeholder="Arrival City" /></div>
                  </div>
                  <div className="col-md-6">
                    <label className="small fw-bold text-secondary">TRAVELERS & CLASS</label>
                    <div className="input-with-icon"><i className="bi bi-person"></i><select className="form-select"><option>1 Adult, Economy</option></select></div>
                  </div>
                </div>

                <div className="row g-3 text-start align-items-end">
                  <div className="col-md-3">
                    <label className="small fw-bold text-secondary">DEPARTURE</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="col-md-3">
                    <label className="small fw-bold text-secondary">RETURN</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <button className="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm"><i className="bi bi-search me-2"></i>Find Flights</button>
                  </div>
                </div>

                <div className="d-flex gap-3 mt-3 small text-secondary">
                  <div className="form-check"><input className="form-check-input" type="radio" checked readOnly/><label className="form-check-label">Direct flights only</label></div>
                  <div className="form-check"><input className="form-check-input" type="radio" /><label className="form-check-label">Flexible dates</label></div>
                </div>
              </div>

              {/* PROMO TAG */}
              <div className="promo-tag mt-4 d-inline-block px-4 py-2 rounded-pill shadow-sm">
                <i className="bi bi-megaphone-fill text-warning me-2"></i>
                Limited time: Use code <strong>SKY2024</strong> for 15% off international routes!
              </div>
            </div>
          </header>

          {/* POPULAR DESTINATIONS */}
          <section className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold">Popular Destinations</h2>
              <a href="#" className="text-primary text-decoration-none fw-bold">View All <i className="bi bi-arrow-right"></i></a>
            </div>
            <div className="row g-4">
              <DestinationCard img="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad" city="London, UK" price="499" region="EUROPE" />
              <DestinationCard img="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e" city="Tokyo, JP" price="850" region="ASIA" />
              <DestinationCard img="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9" city="Sydney, AU" price="920" region="OCEANIA" />
            </div>
          </section>
        </>
      ) : (
        /* EXPLORE VIEW - LOGIN & MANAGE USERS */
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card shadow-sm border-0 p-4 rounded-4">
                <h2 className="fw-bold mb-4">Login</h2>
                <div className="mb-3"><label className="form-label fw-bold">Username</label><input type="text" className="form-control bg-light border-0 py-2" /></div>
                <div className="mb-3"><label className="form-label fw-bold">Password</label><input type="password" className="form-control bg-light border-0 py-2" /></div>
                <button className="btn btn-primary w-100 py-2 fw-bold mt-3">Login</button>
              </div>
            </div>
            <div className="col-lg-8">
              <h2 className="fw-bold mb-4">Manage Users</h2>
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-dark">
                    <tr><th className="ps-4">ID</th><th>Avatar</th><th>UserName</th><th>Status</th><th>Password</th><th className="text-center">Action</th></tr>
                  </thead>
                  <tbody>
                    {ListOfUsers.map(u => (
                      <tr key={u.id}>
                        <td className="ps-4 text-muted">{u.id}</td>
                        <td><img src={u.avatar} className="rounded-circle border" width="40" alt="avt" /></td>
                        <td className="fw-bold">{u.username}</td>
                        <td><span className={`badge rounded-pill px-3 py-2 ${u.status === 'Active' ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'}`}>{u.status}</span></td>
                        <td><code className="text-pink">{u.password}</code></td>
                        <td className="text-center"><button className="btn btn-info btn-sm text-white me-2">Edit</button><button className="btn btn-warning btn-sm text-white">Lock</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="py-4 border-top text-center text-muted small mt-auto">
        <div className="container d-flex justify-content-between">
          <span>SkyBound</span>
          <div><a href="#" className="me-3 text-muted">Privacy Policy</a> <a href="#" className="text-muted">Terms of Service</a></div>
          <span>© 2024 SkyBound Airlines.</span>
        </div>
      </footer>
    </div>
  );
}

function DestinationCard({ img, city, price, region }) {
  return (
    <div className="col-md-4">
      <div className="card border-0 rounded-4 overflow-hidden shadow-sm destination-card text-white">
        <img src={img} className="card-img" alt={city} style={{ height: '400px', objectFit: 'cover' }} />
        <div className="card-img-overlay d-flex flex-column justify-content-end p-4 bg-gradient-dark">
          <small className="text-uppercase fw-bold opacity-75">{region}</small>
          <h4 className="fw-bold mb-0">{city}</h4>
          <p className="small mb-0">Starting from ${price}</p>
        </div>
      </div>
    </div>
  );
}

export default App;