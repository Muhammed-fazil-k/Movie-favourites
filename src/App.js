import { useEffect, useReducer, useState } from "react";
import "./App.css";
import MoviesList from "./components/movies/MoviesList";
import favouriteReducer from "./reducer/reducer";
import {
  FavMoviesContext,
  FavMoviesDispatchContext,
} from "./components/movies/favourite/FavouriteContext";

function App() {
  //fetch default movies list
  useEffect(() => {
    fetch(movieUrl)
      .then((response) => response.json())
      .then((data) => {
        setMoviesID(
          data.Search.map((movie) => {
            return movie.imdbID;
          })
        );
      });
  }, []);

  const [moviesID, setMoviesID] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;

  const initialFavs = []
  const [favMoviesId, favMoviesDispatcher] = useReducer(favouriteReducer, initialFavs);
  const movieUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=Avengers`;

  // Using context for providing favmovies and dipatcher since it is required for children.
  return (
    <div className="App">
      <FavMoviesContext.Provider value={favMoviesId}>
        <FavMoviesDispatchContext.Provider value={favMoviesDispatcher}>
          <div className="app-title">
            <h1>Movie app</h1>
          </div>

          <MoviesList moviesID={moviesID} />
          <div className="fav-movies">
            <h1>Favourate movies</h1>
            <MoviesList moviesID={favMoviesId} />
          </div>
        </FavMoviesDispatchContext.Provider>
      </FavMoviesContext.Provider>
    </div>
  );
}

export default App;
