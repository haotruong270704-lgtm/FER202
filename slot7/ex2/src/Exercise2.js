import React, { useState } from 'react';

function Exercise2() {
  // Trạng thái (useState): Tạo một biến isShowModal kiểu boolean [cite: 9]
  const [isShowModal, setIsShowModal] = useState(false);

  const handleProcessOrder = () => {
    // Hành động: Click vào nút "Xử lý đơn hàng" -> Mở Modal [cite: 10]
    setIsShowModal(true);
  };

  const handleConfirm = () => {
    // Click vào nút "Xác nhận" -> Hiển thị câu hỏi [cite: 12]
    if (window.confirm("Bạn có chắc chắn muốn duyệt đơn hàng này để chuyển sang bộ phận kho không?")) {
      // Nếu chọn Xác nhận, hiển thị 1 alert thành công và tự động đóng Modal [cite: 13]
      alert("Duyệt đơn hàng thành công!");
      setIsShowModal(false);
    }
  };

  const handleClose = () => {
    // Click vào nút "Hủy" hoặc biểu tượng (X) -> Đóng Modal 
    setIsShowModal(false);
  };

  return (
    <div style={styles.container}>
      {/* Breadcrumb */}
      <div style={styles.breadcrumb}>
        Dashboard  ›  <span style={{color: '#1e293b'}}>Order Management</span>
      </div>

      <div style={styles.headerSection}>
        <h1 style={styles.title}>Order Management</h1>
        <p style={styles.subtitle}>Manage and process your pending customer orders efficiently.</p>
      </div>

      {/* Main Action Card */}
      <div style={styles.mainCard}>
        <div style={styles.iconWrapper}>
          <div style={styles.blueCircle}>
            <span style={styles.bagIcon}>🛍️</span>
          </div>
        </div>
        <h3 style={styles.cardHeading}>Ready to Process</h3>
        <p style={styles.cardText}>
          Click the button below to open the processing interface and manage pending orders.
        </p>
        <button style={styles.btnProcess} onClick={handleProcessOrder}>
          ⚡ Xử lý đơn hàng
        </button>
      </div>

      {/* Recent Activity Section */}
      <div style={styles.activitySection}>
        <div style={styles.activityHeader}>Recent Activity</div>
        <div style={styles.activityContent}>
          <div style={styles.emptyIcon}>📊</div>
          <p style={styles.emptyText}>No recent activity found. Click process to start.</p>
        </div>
      </div>

      {/* Modal Overlay  */}
      {isShowModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={{margin: 0}}>Xác nhận xử lý</h3>
              <button style={styles.btnCloseX} onClick={handleClose}>×</button>
            </div>
            <div style={styles.modalBody}>
              Hệ thống sẽ tiến hành kiểm tra tồn kho và chuẩn bị vận chuyển cho đơn hàng này.
            </div>
            <div style={styles.modalFooter}>
              <button style={styles.btnCancel} onClick={handleClose}>Hủy</button>
              <button style={styles.btnConfirm} onClick={handleConfirm}>Xác nhận</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { backgroundColor: '#f8fafd', minHeight: '100vh', padding: '40px 10%', fontFamily: '"Inter", sans-serif' },
  breadcrumb: { fontSize: '13px', color: '#64748b', marginBottom: '20px' },
  headerSection: { marginBottom: '30px' },
  title: { fontSize: '28px', color: '#1e293b', margin: '0 0 8px 0' },
  subtitle: { color: '#64748b', fontSize: '15px' },
  mainCard: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '60px 40px',
    textAlign: 'center',
    border: '1px solid #f1f5f9',
    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
    marginBottom: '30px'
  },
  iconWrapper: { display: 'flex', justifyContent: 'center', marginBottom: '20px' },
  blueCircle: { width: '60px', height: '60px', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  bagIcon: { fontSize: '24px' },
  cardHeading: { fontSize: '18px', color: '#1e293b', margin: '0 0 10px 0' },
  cardText: { color: '#64748b', fontSize: '14px', maxWidth: '400px', margin: '0 auto 25px', lineHeight: '1.5' },
  btnProcess: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '15px',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)'
  },
  activitySection: { backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', overflow: 'hidden' },
  activityHeader: { padding: '15px 20px', borderBottom: '1px solid #f1f5f9', fontWeight: '600', color: '#1e293b', backgroundColor: '#fafbfc' },
  activityContent: { padding: '50px', textAlign: 'center' },
  emptyIcon: { fontSize: '32px', color: '#cbd5e1', marginBottom: '10px' },
  emptyText: { color: '#94a3b8', fontSize: '13px' },
  
  // Modal Styles
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modalContent: { backgroundColor: '#fff', borderRadius: '12px', width: '400px', padding: '0', overflow: 'hidden', boxShadow: '0 20px 25px rgba(0,0,0,0.1)' },
  modalHeader: { padding: '20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  btnCloseX: { background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#94a3b8' },
  modalBody: { padding: '20px', color: '#475569', fontSize: '15px', lineHeight: '1.6' },
  modalFooter: { padding: '15px 20px', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'flex-end', gap: '10px' },
  btnCancel: { padding: '8px 20px', border: '1px solid #e2e8f0', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontWeight: '600' },
  btnConfirm: { padding: '8px 20px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }
};

export default Exercise2;