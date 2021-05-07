import http from "./httpService";

const apiEndpoint = "https://guarded-fjord-70135.herokuapp.com/api/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(apiEndpoint, movie);
}

export function getMovies() {
  const movies = http.get(apiEndpoint);
  return movies;
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
