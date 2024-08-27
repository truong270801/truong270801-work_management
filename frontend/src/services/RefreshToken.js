import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const REFRESH_TOKEN_URL = `${API_BASE_URL}/refreshtoken`;

export const refreshToken = async () => {
  const token = localStorage.getItem("token");
  const refresh_token = localStorage.getItem("refreshToken");
  
  if (token && refresh_token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
    
      if (decodedToken.exp <= currentTime) {
        const response = await axios.post(REFRESH_TOKEN_URL, { refresh_token });
        localStorage.setItem("token", response.data.access_token);
        return response.data.access_token;
      }
      return token;
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("username");
    
    }
  }
};
