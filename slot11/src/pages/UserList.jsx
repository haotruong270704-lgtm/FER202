import React, { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { fetchUsers } from '../utils/api';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers().then(data => setUsers(data));
    }, []);

    return (
        <Container className="mt-4">
            <div className="bg-primary text-white p-4 rounded mb-4 text-center">
                <h2>Users</h2>
            </div>
            {users.map(user => (
                <Card key={user.id} className="mb-2 shadow-sm">
                    <Card.Body>
                        <Card.Title>{user.name}</Card.Title>
                        <Card.Text className="text-muted">{user.email}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );
};
export default UserList;