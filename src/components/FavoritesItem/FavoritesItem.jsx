import React from 'react';
import './FavoritesItem.css';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function FavoritesItem(props){
    const gif = props.gif;
    const removeFromFavorites = (id) =>{
        axios.delete(`/api/favorites/${id}`).then((result)=>{
            console.log(`GIF id: ${id} deleted from favorites`);
        })
        .catch((error) => {
            console.error("Error in DELETE '/api/favorites/:id' - removeFromFavorites()", error);
            alert("Error in DELETE '/api/favorites/:id'. See console.");
        })
    }
    return(
        <Card
            className='gif-card'
            elevation={8}
            sx={{width:"300px"}}
        >
            <CardMedia
                component="img"
                image={gif.embed_url}
                alt={gif.title}
            />
            <CardActions disableSpacing>
                <IconButton
                    aria-label='delete'
                    onClick={()=>removeFromFavorites(gif.id)}
                >
                    <DeleteForeverIcon variant="filled"/>
                </IconButton>
            </CardActions>
        </Card>
    )
}
export default FavoritesItem;