import { useEffect, useReducer, useState } from "react";
import "./App.css";
import MoviesList from "./components/movies/MoviesList";
import favouriteReducer from "./reducer/reducer";
import {
  FavMoviesContext,
  FavMoviesDispatchContext,
} from "./components/movies/favourite/FavouriteContext";
import SearchBar from "./components/search/SearchBar";
import LoadingSpinner from "./components/utils/LoadingSpinner";

function MovieApp() {
  //fetch default movies list

  const [searchQuery, setSearchQuery] = useState("Avengers");
  console.log(searchQuery);
  const apiKey = process.env.REACT_APP_API_KEY;

  const movieUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`;
  const initialFavs = [];
  const [favMoviesId, favMoviesDispatcher] = useReducer(
    favouriteReducer,
    initialFavs
  );

  useEffect(() => {
    setIsLoading(true);
    setIsError(false)
    fetch(movieUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response === "True") {
          setMoviesID(
            data.Search.map((movie) => {
              return movie.imdbID;
            })
          );
        } else {
          setError(data.Error);
          setIsError(true);
        }

        setIsLoading(false);
      });
  }, [searchQuery]);

  const [moviesID, setMoviesID] = useState([]);

  

  //search feature
  function handleSearch(query) {
    if (query === "") {
      setSearchQuery("Avenger");
    } else {
      setSearchQuery(query);
    }
  }

  //loading feature
  const [isLoading, setIsLoading] = useState(true);

  //error handling in user search
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  
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
            <div className="fav-movies-title">
              <h1>Favourate movies</h1>
            </div>
            <MoviesList moviesID={favMoviesId} favMoviesID = {favMoviesId}/>
          </div>
          <div className="all-amovies">
            <div className="all-movies-title">
              <h1>Movies</h1>
            </div>
            <div>
              {isError ? (
                <p
                  style={{
                    textAlign: "center",
                    margin: "1rem",
                    fontStyle: "italic",
                    color: "red",
                  }}
                >
                  {error}
                </p>
              ) : (
                <>
                  {!isLoading ? (
                    <MoviesList moviesID={moviesID} favMoviesID = {favMoviesId}/>
                  ) : (
                    <LoadingSpinner />
                  )}
                </>
              )}
            </div>
          </div>
        </FavMoviesDispatchContext.Provider>
      </FavMoviesContext.Provider>
    </div>
  );
}

export default MovieApp;
