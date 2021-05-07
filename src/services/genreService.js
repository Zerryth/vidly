import http from "./httpService";

export async function getGenres() {
  return await http.get("https://guarded-fjord-70135.herokuapp.com/api/genres");
}
