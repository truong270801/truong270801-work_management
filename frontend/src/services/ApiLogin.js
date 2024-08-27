import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const LOGIN_USER_URL = `${API_BASE_URL}/login`;

export const loginUser = async (username, password) => {
  const response = await axios.post(
    LOGIN_USER_URL,
    { username, password },
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );
  return response.data;
};
