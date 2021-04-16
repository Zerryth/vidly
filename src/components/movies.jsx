import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from "./common/like";
import Pagination from "./common/pagination";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: getMovies(),
      currentPage: 1,
      pageSize: 4,
    };
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length: moviesCount } = this.state.movies;
    const { pageSize, currentPage } = this.state;

    if (moviesCount === 0) return <p>There are no movies in the database.</p>;

    // const movies =

    return (
      <React.Fragment>
        <p>Showing {moviesCount} movies in the database.</p>
        {this.getTable()}
        <Pagination
          itemsCount={moviesCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
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
                <Like liked={m.liked} onClick={() => this.handleLike(m)} />
              </td>
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
