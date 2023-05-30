import React from "react";
import { useState, useEffect, useContext } from "react";
import SearchBar from "../search/SearchBar";
import LoadingSpinner from "../utils/LoadingSpinner";
import MoviesList from "./MoviesList";
import { FavMoviesContext } from "./favourite/FavouriteContext";
import MoviesError from "../error/MoviesError";

export default function MoviesHomePage() {
  //fetch default movies list

  const [searchQuery, setSearchQuery] = useState("Avengers");
  const apiKey = process.env.REACT_APP_API_KEY;

  const movieUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`;

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
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

  const favMoviesId = useContext(FavMoviesContext);

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
      <div className="search-bar">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="all-amovies">
        <div className="all-movies-title">
          <h1>Movies</h1>
        </div>
        <div>
          {isError ? (
            <MoviesError error={error}/>
          ) : (
            <>
              {!isLoading ? (
                <MoviesList moviesID={moviesID} favMoviesID={favMoviesId} />
              ) : (
                <LoadingSpinner />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
