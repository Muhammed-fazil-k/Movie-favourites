import { Route, Routes } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar/NavBar";
import { useReducer } from "react";
import favouriteReducer from "./reducer/reducer";

import {
  FavMoviesContext,
  FavMoviesDispatchContext,
} from "./components/movies/favourite/FavouriteContext";
import NotFound from "./components/error/NotFound";
import MoviesHomePage from "./components/movies/MoviesHomePage";
import FavouriteHomePage from "./components/movies/FavouriteHomePage";
function App() {
  const initialFavs =  JSON.parse(localStorage.getItem('favourites'));
  const [favMoviesId, favMoviesDispatcher] = useReducer(
    favouriteReducer,
    initialFavs
  );
  return (
    <FavMoviesContext.Provider value={favMoviesId}>
      <FavMoviesDispatchContext.Provider value={favMoviesDispatcher}>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<MoviesHomePage />} />
            <Route path="/movies" element={<MoviesHomePage />} />
            <Route path="/favourite-movies" element={<FavouriteHomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </FavMoviesDispatchContext.Provider>
    </FavMoviesContext.Provider>
  );
}

export default App;
