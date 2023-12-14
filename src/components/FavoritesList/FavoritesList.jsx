import React from 'react';
import './FavoritesList.css';
import FavoritesItem from '../FavoritesItem/FavoritesItem';
import { useSelector } from 'react-redux';

function FavoritesList(props){
    const favorites = useSelector(store=>store.favorites);
    return(
        <div id="favorites-list">
            {favorites.map(gif => {
                return(
                    <FavoritesItem key={gif.id} gif={gif}/>
                )
            })}
        </div>
    )
}
export default FavoritesList;