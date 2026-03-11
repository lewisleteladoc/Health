import axios from "axios";
import StorageUtils from "../api/StorageUtils";
import { ACCESS_TOKEN_COOKIE, USERNAME } from '../config';

const AXIOS_FINNHUB = axios.create({
  baseURL: process.env.FINN_API,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": 'en-US,en;q=0.9',    
  }
});

// Intercept every request and attach the token if it exists
AXIOS_FINNHUB.interceptors.request.use((config) => {
  const token = StorageUtils.get({ key: ACCESS_TOKEN_COOKIE, type: 'cookie', useNative: true, parse: false });
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const name = StorageUtils.get({ key: USERNAME, type: 'cookie', useNative: true, parse: false });
  if (name) {
    config.headers['X-Username'] = name;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default AXIOS_FINNHUB;