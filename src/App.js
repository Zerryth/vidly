import { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart as unfilledHeart } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as solidHeart,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/common/navBar";
import Movies from "./components/movies";
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import Customers from "./components/customers";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegistrationForm from "./components/registrationForm";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <main className="container">
        <ToastContainer />
        <NavBar user={this.state.user} />
        <div className="content">
          <Switch>
            <Route path="/register" component={RegistrationForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </main>
    );
  }
}

library.add(faSortUp, faSortDown, solidHeart, unfilledHeart);

export default App;
