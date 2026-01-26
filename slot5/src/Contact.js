import React from 'react';

function Contact() {
  return (
    <section className="container mt-5 pb-5 text-white" id="contact">
      <h3 className="text-center mb-4">Contact Us</h3>
      <div className="row justify-content-center">
        <div className="col-lg-8 bg-secondary p-4 rounded shadow">
          <div className="row g-3">
            <div className="col-md-6"><input className="form-control" placeholder="Tên của bạn *" /></div>
            <div className="col-md-6"><input className="form-control" placeholder="Email *" /></div>
            <div className="col-12">
              <textarea className="form-control" rows="3" placeholder="Lời nhắn..."></textarea>
            </div>
            <div className="col-12">
              <button className="btn btn-warning w-100 fw-bold">Gửi tin nhắn</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact; // QUAN TRỌNG: Phải có dòng này