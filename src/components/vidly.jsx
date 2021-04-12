import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = { movies: getMovies() };
  }

  render() {
    return (
      <main className="contianer">
        <div>
          {this.getHeader()}
          {this.getTable()}
        </div>
      </main>
    );
  }

  getHeader() {
    const { movies } = this.state;
    const numberOfMovies = movies.length;
    let header = numberOfMovies
      ? `Showing ${numberOfMovies} in the database`
      : "There are no movies in the database";

    return <h2>{header}</h2>;
  }

  getTable() {
    if (this.state.movies && this.state.movies.length) {
      return (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((m) => (
              <tr key={m._id}>
                <td>{m.title}</td>
                <td>{m.genre.name}</td>
                <td>{m.numberInStock}</td>
                <td>{m.dailyRentalRate}</td>
                <td>
                  <button onClick={() => this.handleMovieDeletion(m._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  }

  handleMovieDeletion(id) {
    deleteMovie(id);
    this.setState({ movies: getMovies() });
  }
}

// export default Vidly;
