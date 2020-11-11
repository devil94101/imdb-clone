import React from "react";

import { Provider } from "react-redux";
import { store } from "./redux/Store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Components/Login/login";
import SignUp from "./Components/Login/signup";
import MovieList from './Components/MovieList/movieList'
import "./App.css";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={MovieList} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
