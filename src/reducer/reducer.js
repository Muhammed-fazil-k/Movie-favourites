import {saveFavouritesToLocalStorage} from '../utils/localStorageUtils'
export default function favouriteReducer(currentFav,action) {
    switch(action.type){
        case 'fav_added':{
            //Avoid duplicacy while adding to favourite
            const isExist = currentFav.includes(action.movieID)
            let updatedFavMovies = currentFav
            if(!isExist){
                updatedFavMovies= [...currentFav,action.movieID]
            }
            saveFavouritesToLocalStorage(updatedFavMovies)
            return updatedFavMovies
        }
        case 'fav_removed':{
            //remove thr fav
            let updFavs = currentFav.filter(id=>id!==action.movieID)
            saveFavouritesToLocalStorage(updFavs)
            return updFavs
        }
        case 'SET_INITIAL_FAVS': {
            return action.payload;
          }
        default:{
            throw Error('Invalid action type' + action.type)
        }
    }
}