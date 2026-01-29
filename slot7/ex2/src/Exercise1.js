import React, { useState } from 'react';

function Exercise1() {
  const [quantity, setQuantity] = useState(0); 

  const handleDecrement = () => {
    if (quantity > 0) setQuantity(quantity - 1);
  };

  const handleIncrement = () => {
    if (quantity < 99) setQuantity(quantity + 1);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.breadcrumb}>
        Curriculum › UI Design Fundamentals › <span style={{color: '#1e293b'}}>Exercise 1</span>
      </div>

      <div style={styles.mainCard}>
        <div style={styles.header}>
          <div style={styles.headerInfo}>
            <h1 style={styles.title}>Quantity Controller</h1>
            <p style={styles.description}>
              Implement a functional increment/decrement component. Ensure quantity is not less than 0.
            </p>
          </div>
          <div style={styles.avatarGroup}>
            <div style={styles.avatar}>👩‍💻</div>
            <div style={{...styles.avatar, marginLeft: '-10px'}}>👨‍💻</div>
            <div style={styles.avatarBadge}>+12</div>
          </div>
        </div>

        <div style={styles.controllerArea}>
          <p style={styles.label}>SELECT QUANTITY</p>
          <div style={styles.controlWrapper}>
            <button 
              style={{...styles.btn, ...(quantity <= 0 ? styles.btnDisabled : {})}} 
              onClick={handleDecrement}
            >
              −
            </button>
            <input 
              style={styles.inputDisplay} 
              type="text" 
              value={quantity} 
              readOnly 
            />
            <button 
              style={{...styles.btn, ...styles.btnPlus, ...(quantity >= 99 ? styles.btnDisabled : {})}} 
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
          <p style={styles.limitText}>Minimum: 0 | Maximum: 99</p>
        </div>

        <div style={styles.footer}>
          <div style={styles.requirementHeader}>
            <span style={styles.fileIcon}>📄</span>
            <span style={styles.requirementTitle}>Requirement Details</span>
          </div>
          <div style={styles.gridDetails}>
            <div style={styles.detailItem}>✔️ Support manual input via keyboard with focus states.</div>
            <div style={styles.detailItem}>✔️ Buttons should disable at limits (0 and 99).</div>
            <div style={styles.detailItem}>✔️ Smooth CSS transitions for hover and active states.</div>
            <div style={styles.detailItem}>✔️ Responsive design compatible with touch screens.</div>
          </div>
        </div>
      </div>
      
      <div style={styles.bottomNav}>
        <button style={styles.btnBack}>← Back to Curriculum</button>
        <button style={styles.btnNext}>Complete & Next Exercise</button>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: { backgroundColor: '#f8fafd', minHeight: '100vh', padding: '40px 10%', fontFamily: 'sans-serif', color: '#64748b' },
  breadcrumb: { fontSize: '13px', marginBottom: '20px' },
  mainCard: { backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', overflow: 'hidden', border: '1px solid #f1f5f9' },
  header: { padding: '40px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  title: { fontSize: '32px', color: '#1e293b', margin: '0 0 10px 0' },
  description: { maxWidth: '500px', lineHeight: '1.6', fontSize: '15px' },
  avatarGroup: { display: 'flex', alignItems: 'center' },
  avatar: { width: '35px', height: '35px', borderRadius: '50%', border: '2px solid #fff', backgroundColor: '#e2e8f0', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  avatarBadge: { fontSize: '11px', fontWeight: 'bold', marginLeft: '5px' },
  controllerArea: { padding: '80px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#fff' },
  label: { fontSize: '12px', fontWeight: '700', letterSpacing: '1px', marginBottom: '30px' },
  controlWrapper: { display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', padding: '10px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' },
  btn: { width: '50px', height: '50px', borderRadius: '12px', border: 'none', backgroundColor: '#fff', fontSize: '20px', cursor: 'pointer', color: '#1e293b', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  btnPlus: { backgroundColor: '#6366f1', color: '#fff' },
  btnDisabled: { opacity: 0.3, cursor: 'not-allowed' },
  inputDisplay: { width: '80px', textAlign: 'center', fontSize: '32px', fontWeight: '700', border: 'none', backgroundColor: 'transparent', color: '#1e293b', outline: 'none' },
  limitText: { fontSize: '12px', fontStyle: 'italic', marginTop: '20px', color: '#94a3b8' },
  footer: { padding: '40px', backgroundColor: '#fcfdfe', borderTop: '1px solid #f1f5f9' },
  requirementHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' },
  requirementTitle: { fontWeight: '700', color: '#1e293b' },
  gridDetails: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
  detailItem: { fontSize: '14px', color: '#64748b' },
  bottomNav: { display: 'flex', justifyContent: 'space-between', marginTop: '30px' },
  btnBack: { background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: '600' },
  btnNext: { padding: '14px 30px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }
};

export default Exercise1;