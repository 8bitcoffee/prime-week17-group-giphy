import {HashRouter as Router, Route} from 'react-router-dom';
import Favorites from '../Favorites/Favorites';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import React, {useState} from 'react';
import Search from '../Search/Search';


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
        <hr/>
        <Route exact path='/'>
          <Search/>
        </Route>
        <Route exact path='/favorites'>
          <Favorites/>
        </Route>
      </Router>
    </div>
  );
}


export default App;
