import MovieItem from "./MovieItem"
import styles from '../../styles/MoviesList.module.css'
import { useContext } from "react"
import { FavMoviesContext } from "./favourite/FavouriteContext"

export default function MoviesList({moviesID}) {
  return (
    <div>
      <ul className={styles["movies-list"]}>
        {
            moviesID.map(movieID => {
                return <MovieItem key={movieID} movieID={movieID}/>
            })
        }
      </ul>
    </div>
  )
}
