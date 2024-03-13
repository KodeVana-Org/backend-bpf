import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'http://192.168.120.6:6969/',
  // responseType: 'json',
  // withCredentials: true,
});

export default ApiManager;
