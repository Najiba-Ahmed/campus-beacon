import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const setUserEmailHeader = (email) => {
  API.defaults.headers.common['x-user-email'] = email;
};

export default API;
