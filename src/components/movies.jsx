import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = { movies: getMovies() };
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  render() {
    const { length: moviesCount } = this.state.movies;

    if (moviesCount === 0) return <p>There are no movies in the database.</p>;

    return (
      <React.Fragment>
        <p>Showing {moviesCount} movies in the database.</p>
        {this.getTable()}
      </React.Fragment>
    );
  }

  getTable() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th></th>
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
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => this.handleDelete(m)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  handleMovieDeletionWithDbMethod(id) {
    deleteMovie(id);
    this.setState({ movies: getMovies() });
  }
}
