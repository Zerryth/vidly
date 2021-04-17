import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      currentPage: 1,
      pageSize: 4,
      genres: [],
      selectedGenre: null,
      sortColumn: { path: "title", order: "asc" },
    };
  }

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "allgenres" }, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
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

  handleGenreSelection = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    let { length: moviesCount } = this.state.movies;
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      genres,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre.name !== "All Genres"
        ? allMovies.filter((m) => m.genre.name === selectedGenre.name)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    let movies = paginate(sorted, currentPage, pageSize);
    moviesCount = filtered.length;

    if (allMovies.length === 0)
      return <p>There are no movies in the database.</p>;

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelection={this.handleGenreSelection}
          />
        </div>
        <div className="col">
          <p>Showing {moviesCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
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
