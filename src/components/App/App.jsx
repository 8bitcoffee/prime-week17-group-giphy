import {HashRouter as Router, Route} from 'react-router-dom';
import Favorites from '../Favorites/Favorites';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import react, {useState} from 'react';
import axios from 'axios';


function App() {

  let [searchTerm, setSearchTerm] = useState('');
  let [searchResults, setSearchResults] = useState([])
  let [favorite, setFavorite] = useState({link: '', title: '', ID: '', category: ''})
  
function sendSearch() {
  console.log(searchTerm);
  axios.get(`/api/search/${searchTerm}`)
  .then((response) => {
    console.log(response.data)
    setSearchResults(response.data)
  }).catch((err) => {
    console.log('search error', err)
    alert('Something went wrong!');
  })
}
function handleClick(item) {
  // ID provided by GIPHY
let gif = item;
console.log(gif)
  setFavorite({...favorite, link: gif.images.fixed_height.url, title: gif.title, ID: gif.id, category: 'wild'})
  console.log(favorite)
  axios.post('/api/favorites', favorite).then((response) =>{
    console.log('Post successful')
}).catch((error)=>{
  console.log('error posting', error)
  alert('Something Went Wrong!')
})

}

  return (
    <div>
      <h1>Giphy Search!</h1>
      <Router>
        <nav>
          <ul>
            <li><Link to='/'>Search</Link></li>
          </ul>
          <ul>
            <li><Link to='/favorites'>Favorites</Link></li>
          </ul>
        </nav>
        <Route path='/'>
          {/* <Search /> */}
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
          <button onClick={sendSearch}>Click me to search</button>
          {/* {JSON.stringify(searchResults)} */}
          <div className="searchDisplay">
          {searchResults.map((item, i) => {
          return (<div onClick={() => handleClick(item)} key={i} id={item.id}><img  src={item.images.fixed_height.url} />
            <button >Add to Favorites</button>
          </div>
          )})}
          </div>
        </Route>
        <Route path='/favorites'>
          <Favorites/>
        </Route>
      </Router>
    </div>
  );
}


export default App;
