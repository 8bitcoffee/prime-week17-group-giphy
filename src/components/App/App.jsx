import react, {useState} from 'react';
import axios from 'axios';

function App() {

  let [searchTerm, setSearchTerm] = useState('');
  let [searchResults, setSearchResults] = useState([])
  
function sendSearch() {
  console.log(searchTerm);
  axios.get(`https://api.giphy.com/v1/gifs/search?api_key=qU50qUPmY2TzvPcU5FXsYtYz4EdFcfsl&q=${searchTerm}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
  .then((response) => {
    console.log(response.data.data)
    setSearchResults(response.data.data)
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
