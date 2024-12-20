import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const myAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Menambahkan opsi withCredentials
});

export default myAxios;
