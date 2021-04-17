import "./App.css";
import { Component } from "react";
import Movies from "./components/movies";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart as solidHeart,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as unfilledHeart } from "@fortawesome/free-regular-svg-icons";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Movies />
      </main>
    );
  }
}

library.add(faSortUp, faSortDown, solidHeart, unfilledHeart);

export default App;
