import React from 'react';
import './Favorites.css';
import FavoritesList from '../FavoritesList/FavoritesList';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Favorites(){
    const dispatch = useDispatch();
    const [currentCategory, setCurrentCategory] = useState("all");
    const [filteredFavorites, setFilteredFavorites] = useState([]);
    const favorites = useSelector(store => store.favorites);
    const categories = useSelector(store => store.categories);

    useEffect(()=> {
        dispatch({type: "FETCH_FAVORITES"});
        dispatch({type: "FETCH_CATEGORIES"});
        console.log(filteredFavorites)
    }, []);

    const handleCategoryChange = (e) =>{
        dispatch({type:"FETCH_FILTERED_FAVORITES", payload: e.target.value});
        setCurrentCategory(e.target.value);
    }

    // const filterFavorites = () => {
    //     let tempFavs = [];
    //     console.log("in filter");
    //     for (let gif of favorites){
    //         console.log(currentCategory);
    //         console.log(gif.category_id);
    //         if (gif.category_id == null){
    //         }
    //         else if (gif.category_id == currentCategory || currentCategory == "all"){
    //             tempFavs.push(gif);
    //         }
    //     }
    //     setFilteredFavorites(tempFavs);
    // }

    return(
        <div id="favorites-page">
            <select id="category-select" onChange={handleCategoryChange} value={currentCategory}>
                <option value="all">All</option>
                {categories.map(category => {
                    return(
                        <option
                            key={category.id}
                            className='category-option'
                            value={category.id}
                        >{category.name}</option>
                    )
                })}
            </select>
            <hr/>
            <br/>
            <FavoritesList />
        </div>
    )
}
export default Favorites;