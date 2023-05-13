import { useContext, useEffect, useState } from "react";
import Card from "../utils/Card";
import styles from "../../styles/MovieItem.module.css";
import {
  FavMoviesContext,
  FavMoviesDispatchContext,
} from "./favourite/FavouriteContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import LoadingSpinner from "../utils/LoadingSpinner";

export default function MovieItem({ movieID }) {
  //From movieId get details
  const [movieDetail, setMovieDetail] = useState({});

  //Description will be displayed shortly and user can expand it
  const [movieShortDesc, setMovieShortDesc] = useState("");
  const [movieDesc, setMovieDesc] = useState("");
  const favMoviesID = useContext(FavMoviesContext);
  const [isFavourite, setIsFavourite] = useState(false);
  function isFavouriteMovie() {
    return favMoviesID.includes(movieID);
  }
  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const movieItemUrl = `https://www.omdbapi.com/?i=${movieID}&apikey=${apiKey}`;
    setIsMovieLoading(true);
    fetch(movieItemUrl)
      .then((res) => res.json())
      .then((data) => {
        setMovieDetail(data);
        setMovieShortDesc(data.Plot.substring(0, 20));
        setMovieDesc(data.Plot);
        setIsFavourite(isFavouriteMovie());
        setIsMovieLoading(false);
      });
  }, []);

  const [isShortDesc, setIsShortDesc] = useState(true);
  function handleDesc() {
    setIsShortDesc(!isShortDesc);
  }
  const favDispatcher = useContext(FavMoviesDispatchContext);

  function handleFavourite() {
    if (!isFavouriteMovie()) {
      favDispatcher({
        type: "fav_added",
        movieID: movieID,
      });
      setIsFavourite(true);
    } else {
      favDispatcher({
        type: "fav_removed",
        movieID: movieID,
      });
      setIsFavourite(false);
    }
  }

  const [isMovieLoading, setIsMovieLoading] = useState(true);

  return (
    <Card>
      {isMovieLoading ? (
        <div className={styles['movie-item-spinner']}>

          <LoadingSpinner />
        </div>
      ) : (
        <div className={styles["movie-item"]}>
          <div
            className={styles["movie-item-image"]}
            style={{
              backgroundImage: `url(${movieDetail.Poster})`,
            }}
          >
            <div className={styles["movie-item-image-overlay"]}>
              <div className={styles["movie-item-title"]}>
                <h2>{movieDetail.Title}</h2>
              </div>
              <div>
                <div className={styles["movie-item-details"]}>
                  <p className={styles["movie-item-description"]}>
                    {isShortDesc ? (
                      <>
                        {movieShortDesc}{" "}
                        <span onClick={handleDesc}>...more</span>{" "}
                      </>
                    ) : (
                      <>
                        {movieDesc} <span onClick={handleDesc}>...less</span>{" "}
                      </>
                    )}
                  </p>
                  <p className={styles["movie-item-year"]}>
                    {movieDetail.Year}
                  </p>
                </div>
                <div className={styles["movie-item-rating-favorite"]}>
                  <p className={styles["movie-item-rating"]}>
                    {movieDetail.imdbRating}/10
                  </p>
                  <div
                    style={{
                      backgroundColor: "transparent",
                      display: "inline-block",
                      transition: "transform 5s",
                    }}
                  >
                    <a onClick={handleFavourite}>
                      {isFavourite ? (
                        <FaHeart
                          style={{ color: "red", transform: "scale(1.2)" }}
                        />
                      ) : (
                        <FaRegHeart style={{ color: "red" }} />
                      )}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
