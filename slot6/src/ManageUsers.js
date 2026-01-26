import React from 'react';
import { ListOfUsers } from './ListOfUsers';

function ManageUsers() {
  return (
    <div className="mt-4">
      <h3>Manage Users</h3>
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>UserName</th>
            <th>Status</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {ListOfUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td><img src={user.avatar} alt="avatar" className="rounded-circle" /></td>
              <td>{user.username}</td>
              <td>
                <span className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                  {user.status}
                </span>
              </td>
              <td>{user.password}</td>
              <td>
                <button className="btn btn-sm btn-info me-2">Edit</button>
                <button className="btn btn-sm btn-warning">Lock</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;