import http from "./httpService";

export async function getGenres() {
  return await http.get(`${process.env.REACT_APP_API_ENDPOINT}/genres`);
}
