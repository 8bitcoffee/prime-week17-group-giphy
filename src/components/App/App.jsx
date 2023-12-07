import {HashRouter as Router, Route} from 'react-router-dom';
import Favorites from '../Favorites/Favorites';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import react, {useState} from 'react';
import axios from 'axios';


function App() {

  let [searchTerm, setSearchTerm] = useState('');
  let [searchResults, setSearchResults] = useState([])
  
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
          <ul>
          {searchResults.map((item) => {
          return <li><img src={item.embed_url} /></li>
          })}
      </ul>
        </Route>
        <Route path='/favorites'>
          <Favorites/>
        </Route>
      </Router>
    </div>
  );
}


export default App;
