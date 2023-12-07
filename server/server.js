import axios from 'axios';
const express = require('express');
const favoriteRouter = require('./routes/favorite.router');
const categoryRouter = require('./routes/category.router');
const searchRouter = require('./routes/search.router');


const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static('build'));

app.use('/api/favorites', favoriteRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/search', searchRouter);

app.get('/:q', (req, res) => {
  console.log(req.params.q);
  axios.get(`https://api.giphy.com/v1/gifs/search?api_key=qU50qUPmY2TzvPcU5FXsYtYz4EdFcfsl&q=${req.params.q}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
      .then((response) => {
          res.send(response.data);
      }).catch((error) => {
          console.log('Search error', error);
          res.sendStatus(500);
      })
})


app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
