import React, { useState } from 'react';
import './FavoritesItem.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Typography } from '@mui/material';

function FavoritesItem(props){

    const dispatch = useDispatch();
    const gif = props.gif;
    const categories = useSelector(store=>store.categories);
    const [currentCategory, setCurrentCategory] = useState("category");
    
    const addCategory = (gifId, categoryId) => {
        console.log(gifId, Number(categoryId));
        axios.put(`/api/favorites/${gifId}`, {category: Number(categoryId)}).then((result) => {
            console.log('category set:', categoryId);
            dispatch({type:"FETCH_FAVORITES"});
        }).catch((error) => {
            console.log('error setting category', error);
            alert('Something went wrong');
        })
    }

    const removeFromFavorites = (id) =>{
        axios.delete(`/api/favorites/${id}`).then((result)=>{
            console.log(`GIF id: ${id} deleted from favorites`);
            dispatch({type: "FETCH_FAVORITES"});
        })
        .catch((error) => {
            console.error("Error in DELETE '/api/favorites/:id' - removeFromFavorites()", error);
            alert("Error in DELETE '/api/favorites/:id'. See console.");
        })
    }

    const returnName = (id) => {
        for (let category of categories){
            if (category.id == id){
                return category.name;
            }
        }
    }

    return(
        <Card
            className='gif-card'
            elevation={8}
            sx={{maxWidth:"300px", marginTop: "10px", marginBottom: "10px"}}
        >
            <CardMedia
                component="img"
                image={gif.GIPHY_URL}
                alt={gif.GIPHY_Title}
            />
            <CardActions disableSpacing>
                {gif.category_id == null ? <p>{"Category unassigned"}</p> : <p>{`Current category: ${returnName(gif.category_id)}`}</p>}
                <IconButton
                    aria-label='delete'
                    onClick={()=>removeFromFavorites(gif.id)}
                >
                    <DeleteForeverIcon variant="filled"/>
                </IconButton>
                <select id="category-select" onChange={(e) => addCategory(gif.id, e.target.value)} value={currentCategory}>
                    <option disabled value="category">Pick Category</option>
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
            </CardActions>
        </Card>
    )
}
export default FavoritesItem;