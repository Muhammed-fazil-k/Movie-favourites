import { useEffect, useState } from "react";
import Card from "../Card";
import styles from "../../styles/MovieItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MovieItem({ movie }) {
  const [movieDetail, setMovieDetail] = useState({});
  const [movieShortDesc, setMovieShortDesc] = useState("");
  const [movieDesc, setMovieDesc] = useState("");
  useEffect(() => {
    const movieId = movie.imdbID;
    const apiKey = process.env.REACT_APP_API_KEY;
    const movieItemUrl = `https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`
    fetch(movieItemUrl)
      .then((res) => res.json())
      .then((data) => {
        setMovieDetail(data);
        setMovieShortDesc(data.Plot.substring(0, 20));
        setMovieDesc(data.Plot);
      });
  }, []);

  const [isFavourite, setIsFavourite] = useState(false);
  const [isShortDesc, setIsShortDesc] = useState(true);
  function handleDesc() {
    setIsShortDesc(!isShortDesc)
  }
  return (
    <Card>
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
                      {movieShortDesc} <span onClick={handleDesc}>...more</span>{" "}
                    </>
                  ) : (
                    <>
                      {movieDesc} <span onClick={handleDesc}>...less</span>{" "}
                    </>
                  )}
                </p>
                <p className={styles["movie-item-year"]}>{movieDetail.Year}</p>
              </div>
              <div className={styles["movie-item-rating-favorite"]}>
                <p className={styles["movie-item-rating"]}>
                  {movieDetail.imdbRating}/10
                </p>
                <button>Fav</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
