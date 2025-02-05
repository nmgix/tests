import axios from "axios";
import { LoginData, RegistrationData } from "../../types/auth";

export function loginUser(data: LoginData) {
  return axios.post(`${process.env.SERVER_ADDRESS}/auth/login`, data, { withCredentials: true });
}

export function registerUser(data: RegistrationData) {
  return axios.post(`${process.env.SERVER_ADDRESS}/auth/register`, data, { withCredentials: true });
}
