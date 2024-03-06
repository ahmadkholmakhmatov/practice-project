import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import "bootstrap/dist/css/bootstrap.min.css";
import "./global.scss";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import Movies from "./pages/Movies/Movies";
import Trending from "./pages/Trending/Trending";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";
import RatingPage from "./pages/Rating/RatingPage";

function App() {
  return (
    <Router>
      <Header />
      <div className="container main-content">
        <Switch>
          <Route path="/" exact={true} component={Trending}></Route>
          <Route path="/movies" exact={true} component={Movies}></Route>
          <Route path="/series" exact={true} component={Series}></Route>
          <Route path="/search" exact={true} component={Search}></Route>
          <Route path="/rating" exact={true} component={RatingPage}></Route>
        </Switch>
      </div>
      <Navigation />
    </Router>
  );
}

export default App;
