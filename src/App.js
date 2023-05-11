import { useEffect, useReducer, useState } from "react";
import "./App.css";
import MoviesList from "./components/movies/MoviesList";
import favouriteReducer from "./reducer/reducer";
import {
  FavMoviesContext,
  FavMoviesDispatchContext,
} from "./components/movies/favourite/FavouriteContext";
import SearchBar from "./components/search/SearchBar";

function App() {
  //fetch default movies list

  const [searchQuery, setSearchQuery] = useState("Avengers");
  console.log(searchQuery);
  const apiKey = process.env.REACT_APP_API_KEY;

  const movieUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`;

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
  }, [searchQuery]);

  const [moviesID, setMoviesID] = useState([]);

  const initialFavs = [];
  const [favMoviesId, favMoviesDispatcher] = useReducer(
    favouriteReducer,
    initialFavs
  );

  //search feature
  function handleSearch(query) {
    setSearchQuery(query);
  }

  // Using context for providing favmovies and dipatcher since it is required for children.
  return (
    <div className="App">
      <FavMoviesContext.Provider value={favMoviesId}>
        <FavMoviesDispatchContext.Provider value={favMoviesDispatcher}>
          <div className="app-title">
            <h1>Movie app</h1>
          </div>
          <div className="search-bar">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="fav-movies">
            <h1>Favourate movies</h1>
            <MoviesList moviesID={favMoviesId} />
          </div>
          <div className="all-amovies">
            <h1>Movies</h1>
            <MoviesList moviesID={moviesID} />
          </div>
        </FavMoviesDispatchContext.Provider>
      </FavMoviesContext.Provider>
    </div>
  );
}

export default App;
