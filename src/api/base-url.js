import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.trello.com/1/',
  timeout: 10000,
});

export default apiClient;