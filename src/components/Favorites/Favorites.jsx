import React from 'react';
import './Favorites.css';
import FavoritesList from '../FavoritesList/FavoritesList';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FavoritesItem from '../FavoritesItem/FavoritesItem';

function Favorites(){
    const dispatch = useDispatch();
    const [currentCategory, setCurrentCategory] = useState("");
    const [filteredFavorites, setFilteredFavorites] = useState([]);
    const favorites = useSelector(store => store.favorites);
    const categories = useSelector(store => store.categories);

    useEffect(()=> {
        // dispatch({type: "FETCH_FAVORITES"});
        dispatch({type: "FETCH_CATEGORIES"});
    }, []);

    const handleCategoryChange = (e) =>{
        setCurrentCategory(e.target.value);
        filterFavorites();
    }

    const filterFavorites = () => {
        let tempFavs = [];
        for (let gif of favorites){
            if (gif.category == currentCategory){
                tempFavs.push(gif);
            }
        }
        setFilteredFavorites(tempFavs);
    }

    return(
        <div id="favorites-page">
            <select id="category-select" onChange={handleCategoryChange} value={currentCategory}>
                <option value="all">All</option>
                {categories.map(category => {
                    return(
                        <option
                            key={category.id}
                            className='category-option'
                            value={category.name}
                        >{category.name}</option>
                    )
                })}
            </select>
            <br/>
            <hr/>
            <br/>
            <FavoritesList filteredFavorites={filteredFavorites}/>
        </div>
    )
}
export default Favorites;