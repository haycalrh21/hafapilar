import axios, { InternalAxiosRequestConfig } from "axios";

const satellite = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// satellite.interceptors.request.use(
//   async (config: InternalAxiosRequestConfig) => {
//     on;

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`; // Set header Authorization dengan token Bearer
//     } else {
//       // console.log("No token found in session.");
//     }

//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

export default satellite;
