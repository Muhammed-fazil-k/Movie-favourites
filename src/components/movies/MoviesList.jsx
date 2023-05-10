import MovieItem from "./MovieItem"
import styles from '../../styles/MoviesList.module.css'

export default function MoviesList({movies}) {
  return (
    <div>
      <ul className={styles["movies-list"]}>
        {
            movies.map(movie => {
                return <MovieItem key={movie.imdbID} movie={movie}/>
            })
        }
      </ul>
    </div>
  )
}
