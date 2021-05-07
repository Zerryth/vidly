import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "https://guarded-fjord-70135.herokuapp.com/api/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

const auth = {
  getCurrentUser,
  getJwt,
  login,
  loginWithJwt,
  logout,
};

export default auth;
