import React from 'react';
import './FavoritesList.css';
import FavoritesItem from '../FavoritesItem/FavoritesItem';

function FavoritesList(props){
    const filteredFavorites = props.filteredFavorites;
    return(
        <div id="favorites-list">
            {filteredFavorites.map(gif => {
                return(
                    <FavoritesItem key={gif.id} gif={gif}/>
                )
            })}
        </div>
    )
}
export default FavoritesList;