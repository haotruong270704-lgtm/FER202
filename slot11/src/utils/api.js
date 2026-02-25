// src/utils/api.js
export const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return await response.json();
};

export const fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10'); // Giới hạn 10 bài để giao diện đẹp
    return await response.json();
};