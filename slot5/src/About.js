import React from 'react';

function About() {
  return (
    <section className="container py-5 text-white" id="about">
      <h2 className="text-center mb-5 text-warning fw-bold">ABOUT US</h2>
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <img src="/image/banner.jpg" className="img-fluid rounded shadow-lg" alt="About" />
        </div>
        <div className="col-md-6 text-start ps-md-5">
          <h4 className="mb-3">Our Story</h4>
          <p className="lead">Pizza House không chỉ là một nhà hàng, đó là một trải nghiệm ẩm thực Ý đích thực.</p>
          <p>Mỗi chiếc bánh pizza tại đây đều được nhào nặn thủ công và nướng trong lò gạch truyền thống để đảm bảo độ giòn rụm của đế bánh và sự tươi ngon của lớp nhân.</p>
          <p>Chúng tôi tin rằng món ăn ngon nhất là món ăn được làm từ trái tim và những nguyên liệu sạch nhất.</p>
        </div>
      </div>
    </section>
  );
}

export default About;