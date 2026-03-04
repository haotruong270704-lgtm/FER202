import axios from 'axios';

const API_URL = 'http://localhost:9999/accounts';

export const getAccounts = () => axios.get(API_URL);
export const updateAccountStatus = (id, status) => axios.patch(`${API_URL}/${id}`, { status });