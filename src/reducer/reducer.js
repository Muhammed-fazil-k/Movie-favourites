export default function favouriteReducer(currentFav,action) {
    switch(action.type){
        case 'fav_added':{
            //Avoid duplicacy while adding to favourite
            const isExist = currentFav.includes(action.movieID)
            let updatedFavMovies = currentFav
            if(!isExist){
                updatedFavMovies= [...currentFav,action.movieID]
            }
            return updatedFavMovies
        }
        case 'fav_removed':{
            //remove thr fav
            return currentFav.filter(id=>id!==action.movieID)
        }
        default:{
            throw Error('Invalid action type' + action.type)
        }
    }
}