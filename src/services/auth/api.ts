import { ApiResponse, AuthResponse, LoginPayload } from "@/app/types/candidate";

import axios from "axios";
import satellite from "./satelite";

const api_url = process.env.NEXT_PUBLIC_API_URL;
export const login = async (body: LoginPayload) => {
  try {
    const response = await satellite.post(api_url + "/auth/login", body, {
      // Add headers if needed
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log("Full response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Detailed error:", error);
    throw error;
  }
};
export const logout = async () => {
  return await axios
    .post<ApiResponse<any>>(api_url + "/logout")
    .then((res) => res.data)
    .catch((error) => error);
};
