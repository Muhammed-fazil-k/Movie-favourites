import React, { useContext } from "react";
import MoviesList from "./MoviesList";
import { FavMoviesContext } from "./favourite/FavouriteContext";
import MoviesError from "../error/MoviesError";
import {getFavoritesFromLocalStorage} from '../../utils/localStorageUtils'

export default function FavouriteHomePage() {
    const favMoviesId =  useContext(FavMoviesContext);
    
  return (
    <div className="fav-movies">
      <div className="fav-movies-title">
        <h1>Favourate movies</h1>
      </div>
      {favMoviesId.length ===0 ?(<MoviesError error="No favourite movies"/>):(<MoviesList moviesID={favMoviesId} favMoviesID={favMoviesId} />)}
      
    </div>
  );
}
