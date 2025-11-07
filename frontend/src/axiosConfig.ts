import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8772",
    
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
