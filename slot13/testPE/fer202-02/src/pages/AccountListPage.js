import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Container, Modal, Toast, ToastContainer } from 'react-bootstrap';
import { getAccounts, updateAccountStatus } from '../services/api';
import AuthContext from '../contexts/AuthContext';
import FilterBar from '../components/FilterBar';
import { useNavigate } from 'react-router-dom';

const AccountListPage = () => {
  const [accounts, setAccounts] = useState([]); 
  const [filtered, setFiltered] = useState([]); 
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [sortType, setSortType] = useState('');

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState({ show: false, msg: '', variant: '' });
  
  const { state } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleFilterAndSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, statusFilter, roleFilter, sortType, accounts]);

  const fetchData = async () => {
    try {
      const { data } = await getAccounts();
      setAccounts(data);
      setFiltered(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleFilterAndSort = () => {
    let result = [...accounts];

    if (searchTerm) {
      result = result.filter(a => 
        a.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
        a.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter(a => a.status === statusFilter);
    }

    if (roleFilter !== 'All') {
      result = result.filter(a => a.role === roleFilter);
    }

    if (sortType === 'user_asc') {
      result.sort((a, b) => a.username.localeCompare(b.username));
    } else if (sortType === 'user_desc') {
      result.sort((a, b) => b.username.localeCompare(a.username));
    } else if (sortType === 'role') {
      result.sort((a, b) => a.role.localeCompare(b.role));
    } else if (sortType === 'status') {
      result.sort((a, b) => a.status.localeCompare(b.status));
    }

    setFiltered(result);
  };

  const handleToggleStatus = (user) => {
    if (user.id === state.user?.id) {
      setToast({ show: true, msg: 'Cannot self-lock the currently logged-user admin.', variant: 'warning' });
      return;
    }
    setSelectedUser(user);
    setShowConfirm(true);
  };

  const confirmToggle = async () => {
    const newStatus = selectedUser.status === 'active' ? 'locked' : 'active';
    try {
      await updateAccountStatus(selectedUser.id, newStatus);
      setToast({ 
        show: true, 
        msg: `${newStatus === 'locked' ? 'Locked' : 'Unlocked'} successfully.`, 
        variant: 'success' 
      });
      setShowConfirm(false);
      fetchData(); 
    } catch (error) {
      setToast({ show: true, msg: 'Update failed!', variant: 'danger' });
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center">Account Management</h3>
      
      <FilterBar 
        onSearch={setSearchTerm} 
        onFilterStatus={setStatusFilter} 
        onFilterRole={setRoleFilter} 
        onSort={setSortType} 
      />
      
      <Table striped bordered hover responsive className="mt-3 shadow-sm">
        <thead className="table-dark text-center">
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="align-middle text-center">
          {filtered.map(u => (
            <tr key={u.id}>
              <td><img src={u.avatar} alt="avatar" width="40" className="rounded-circle shadow-sm" /></td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td className="text-capitalize">{u.role}</td>
              <td>
                <span className={`badge ${u.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                  {u.status}
                </span>
              </td>
              <td>
                <Button variant="outline-primary" size="sm" onClick={() => navigate(`/accounts/${u.id}`)} className="me-2">
                  View Details
                </Button>
                <Button 
                  variant={u.status === 'active' ? 'outline-danger' : 'outline-success'} 
                  size="sm" 
                  onClick={() => handleToggleStatus(u)}
                >
                  {u.status === 'active' ? 'Lock' : 'Unlock'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          {selectedUser?.status === 'active' 
            ? `Lock account ${selectedUser?.username}? The user cannot log in after this.` 
            : `Unlock account ${selectedUser?.username}?`}
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmToggle}>Confirm</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={toast.show} bg={toast.variant} onClose={() => setToast({ ...toast, show: false })} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body className={toast.variant === 'success' || toast.variant === 'warning' ? 'text-dark' : 'text-white'}>
            {toast.msg}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
};

export default AccountListPage;