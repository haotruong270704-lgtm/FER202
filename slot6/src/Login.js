import React, { useState } from 'react';

function Login() {
  const [account, setAccount] = useState({ username: '', password: '' });

  const handleInput = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  return (
    <div className="card p-4 shadow-sm mb-5">
      <h3>Đăng nhập</h3>
      <div className="mb-3">
        <label>Username</label>
        <input type="text" name="username" className="form-control" onChange={handleInput} />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input type="password" name="password" className="form-control" onChange={handleInput} />
      </div>
      <div className="d-flex gap-2">
        <button className="btn btn-primary">Login</button>
        <button className="btn btn-secondary">Cancel</button>
      </div>
    </div>
  );
}

export default Login;