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

      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <button onClick={sendSearch}>Click me to search</button>
      {/* {JSON.stringify(searchResults)} */}
      <ul>
        {searchResults.map((item) => {
          return <li><img src={item.embed_url} /></li>
        })}
      </ul>
    </div>
  );
}


export default App;
