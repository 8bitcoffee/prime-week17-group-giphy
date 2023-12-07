import {HashRouter as Router, Route} from 'react-router-dom';
import Favorites from '../Favorites/Favorites';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
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
        </Route>
        <Route path='/favorites'>
          <Favorites/>
        </Route>
      </Router>
    </div>
  );
}


export default App;
