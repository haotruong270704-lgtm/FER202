import React, { useState } from 'react';

function Exercise3() {
  // Sử dụng một Object duy nhất để quản lý form 
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Kỹ thuật "spread" object để cập nhật trạng thái 
    setForm({ ...form, [name]: value });
  };

  const handleReset = () => {
    setForm({ name: '', price: '', category: '' });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>Product Entry Form</h2>
            <p style={styles.subtitle}>Complete details to list a new product in the store.</p>
          </div>
          <span style={styles.icon}>📋</span>
        </div>

        <div style={styles.formGroup}>
          <div style={styles.inputRow}>
            <div style={styles.inputContainer}>
              <label style={styles.label}>Tên sản phẩm <span style={{color: 'red'}}>*</span></label>
              <input 
                name="name"
                style={styles.input}
                placeholder="Ví dụ: iPhone 15 Pro Max"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div style={styles.inputContainer}>
              <label style={styles.label}>Giá bán <span style={{color: 'red'}}>*</span></label>
              <div style={styles.priceWrapper}>
                <input 
                  name="price"
                  type="number"
                  style={styles.inputPrice}
                  placeholder="Nhập giá"
                  value={form.price}
                  onChange={handleChange}
                />
                <span style={styles.currency}>VND</span>
              </div>
            </div>
          </div>

          <div style={styles.inputRow}>
            <div style={styles.inputContainer}>
              <label style={styles.label}>Danh mục</label>
              <select 
                name="category"
                style={styles.select}
                value={form.category}
                onChange={handleChange}
              >
                <option value="">-- Chọn danh mục --</option>
                <option value="Electronics">Điện tử</option>
                <option value="Fashion">Thời trang</option>
              </select>
            </div>
            <div style={styles.inputContainer}>
               {/* Chỗ này trong hình của bạn là một input giá khác hoặc trường trống */}
               <label style={styles.label}>Giá cũ</label>
               <input style={styles.input} disabled placeholder="N/A" />
            </div>
          </div>

          <div style={styles.buttonRow}>
            <button onClick={handleReset} style={styles.btnReset}>Làm lại</button>
            <button style={styles.btnSubmit}>💾 Lưu sản phẩm</button>
          </div>
        </div>
      </div>

      <div style={styles.previewCard}>
        <h4 style={styles.previewTitle}>{} Dữ liệu hiện tại:</h4>
        <div style={styles.jsonBox}>
          <div style={styles.jsonHeader}>
            <span>JSON PREVIEW</span>
            <div style={styles.dots}>
              <span style={{...styles.dot, backgroundColor: '#ff5f56'}}></span>
              <span style={{...styles.dot, backgroundColor: '#ffbd2e'}}></span>
              <span style={{...styles.dot, backgroundColor: '#27c93f'}}></span>
            </div>
          </div>
          <pre style={styles.pre}>
            {JSON.stringify(form, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#f8fafd',
    minHeight: '100vh',
    padding: '40px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    maxWidth: '900px',
    margin: '0 auto 30px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '20px',
    marginBottom: '30px'
  },
  title: { margin: 0, color: '#1a1a1a', fontSize: '24px' },
  subtitle: { margin: '5px 0 0', color: '#888', fontSize: '14px' },
  icon: { fontSize: '24px', color: '#ccd1d9' },
  inputRow: { display: 'flex', gap: '20px', marginBottom: '20px' },
  inputContainer: { flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { fontWeight: '600', fontSize: '14px', color: '#444' },
  input: {
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #e0e6ed',
    outline: 'none',
    fontSize: '15px'
  },
  priceWrapper: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputPrice: {
    width: '100%',
    padding: '12px 60px 12px 15px',
    borderRadius: '8px',
    border: '1px solid #e0e6ed',
    outline: 'none'
  },
  currency: { position: 'absolute', right: '15px', color: '#aaa', fontWeight: '500' },
  select: {
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #e0e6ed',
    backgroundColor: '#fff',
    outline: 'none'
  },
  buttonRow: { display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' },
  btnReset: {
    padding: '10px 25px',
    backgroundColor: 'transparent',
    border: 'none',
    color: '#666',
    cursor: 'pointer',
    fontWeight: '500'
  },
  btnSubmit: {
    padding: '12px 30px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
  },
  previewCard: { maxWidth: '900px', margin: '0 auto' },
  previewTitle: { color: '#3b82f6', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' },
  jsonBox: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #eef2f6'
  },
  jsonHeader: {
    backgroundColor: '#fcfdfe',
    padding: '10px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #f0f0f0',
    fontSize: '11px',
    color: '#aaa',
    letterSpacing: '1px'
  },
  dots: { display: 'flex', gap: '6px' },
  dot: { width: '10px', height: '10px', borderRadius: '50%' },
  pre: { padding: '20px', color: '#4a5568', margin: 0, fontSize: '14px', lineHeight: '1.5' }
};

export default Exercise3;