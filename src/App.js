import { useEffect, useState } from "react";
import "./App.css";
import MoviesList from "./components/movies/MoviesList";

function App() {
  const [movies, setMovies] = useState([]);
  const apiKey = process.env.REACT_APP_API_KEY;
  const movieUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=Alone&y=2023`;
  useEffect(() => {
    fetch(movieUrl)
      .then((response) => response.json())
      .then((data) => setMovies(data.Search));
  }, []);
  return (
    <div className="App">
      <div className="app-title">
        <h1>Movie app</h1>
      </div>
      <MoviesList movies={movies} />
    </div>
  );
}

export default App;
