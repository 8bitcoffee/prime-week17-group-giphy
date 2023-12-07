const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
router.get('/', (req, res) => {
  const queryText = `SELECT * FROM "favorites";`;
  pool.query(queryText)
  .then((result) => {
    res.send(result.rows);
    res.sendStatus(200);
  }).catch((error) => {
    console.log('Error retrieving favorites', error);
    res.sendStatus(500);
  })
});

// add a new favorite
router.post('/', (req, res) => {
  const newFav = req.body;
  const queryText = `INSERT INTO "favorites" ("category_id", "GIPHY_URL", "GIPHY_Title", "GIPHY_ID")
  VALUES
  ((SELECT "id" FROM "categories" WHERE "name"=$4), $1, $2, $3);`;
  const queryValues = [
    newFav.link,
    newFav.title,
    newFav.ID,
    newFav.category
  ];
  pool.query(queryText, queryValues)
  .then(() => {
    res.sendStatus(201)
  }).catch((error) => {
    console.log('Error adding fav', error);
    res.sendStatus(500);
  })
});

// update a favorite's associated category
router.put('/:id', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
router.delete('/:id', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
