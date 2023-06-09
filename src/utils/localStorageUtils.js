export const saveFavouritesToLocalStorage = (favourites) => {
  localStorage.setItem("favourites", JSON.stringify(favourites));
};

export const getFavoritesFromLocalStorage = () => {
  const favorites = localStorage.getItem("favourites");
  return favorites ? JSON.parse(favorites) : [];
};
