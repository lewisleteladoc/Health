import axios from "axios";

const AUTHENTICATION = axios.create({
  baseURL: process.env.GENERIC_AUTHENTICATOR,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": 'en-US,en;q=0.9',
  }
});

export default AUTHENTICATION;