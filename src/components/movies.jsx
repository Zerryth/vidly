import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./genreFilter";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      currentPage: 1,
      pageSize: 4,
      genres: [],
      currentGenre: "None",
    };
  }

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
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

  handleItemSelection = (item) => {
    this.setState({ currentGenre: item });
  };

  getTable = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      currentGenre,
    } = this.state;
    let movies = paginate(allMovies, currentPage, pageSize);

    if (currentGenre !== "None") {
      movies = movies.filter((movie) => movie.genre.name === currentGenre.name);
    }

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
          {movies.map((m) => (
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
  };

  render() {
    const { length: moviesCount } = this.state.movies;
    const { pageSize, currentPage, currentGenre, genres } = this.state;
    console.log("currentGenre in render", currentGenre);

    if (moviesCount === 0) return <p>There are no movies in the database.</p>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            currentGenre={currentGenre.name}
            onItemSelection={this.handleItemSelection}
          />
        </div>
        <div className="col">
          <p>Showing {moviesCount} movies in the database.</p>
          {this.getTable()}
          <Pagination
            itemsCount={moviesCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
