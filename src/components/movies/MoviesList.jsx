import MovieItem from "./MovieItem"
import styles from '../../styles/MoviesList.module.css'

export default function MoviesList({moviesID,favMoviesID}) {

  function isFavouriteMovie(movieID) {
    if(favMoviesID === null){
      return false;
    }
    return favMoviesID.includes(movieID);
  }
  return (
    <div>
      <ul className={styles["movies-list"]}>
        {
            moviesID.map(movieID => {
              const isFavourite = isFavouriteMovie(movieID);
                return <MovieItem key={movieID} movieID={movieID} isFav={isFavourite}/>
            })
        }
      </ul>
    </div>
  )
}
