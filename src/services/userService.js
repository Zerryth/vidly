import http from "./httpService";

const apiEndpoint = "https://guarded-fjord-70135.herokuapp.com/api/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
