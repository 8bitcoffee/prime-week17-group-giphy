import React, {useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';

function Search(){

    const dispatch = useDispatch();
    let [searchTerm, setSearchTerm] = useState('');
    let [searchResults, setSearchResults] = useState([]);
  
    function sendSearch(e) {
        e.preventDefault();
        console.log(searchTerm);
        axios.get(`/api/search/${searchTerm}`)
        .then((response) => {
            console.log(response.data);
            setSearchResults(response.data);
            setSearchTerm("");
        }).catch((err) => {
            console.log('search error', err);
            alert('Something went wrong!');
        })
    }
    // Function for adding a gip to favorites
    function handleClick(item) {
    // ID provided by GIPHY
        let gif = item;
        console.log(gif)
        let favorite = {link: gif.images.fixed_height.url, title: gif.title, ID: gif.id};
        console.log(favorite)
        dispatch({type: 'ADD_FAVORITE', payload: favorite})
    }

    return( 
        <div>
            <form>
                <input placeholder="Search GIPHY" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                <button onClick={sendSearch}>Click me to search</button>
            </form>
            <br/>
            <hr/>
            <br/>
            <div className="searchDisplay">
                {searchResults.map((item, i) => {
                    return (
                        <div onClick={() => handleClick(item)} key={i} id={item.id}><img  src={item.images.fixed_height.url} />
                            <button >Add to Favorites</button>
                        </div>
                )})}
            </div>
        </div>
    )
}

export default Search;