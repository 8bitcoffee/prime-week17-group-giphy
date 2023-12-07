const axios = require('axios');
const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// GET req to retrieve search results from GIPHY
// GIPHY API Key: qU50qUPmY2TzvPcU5FXsYtYz4EdFcfsl

router.get('/:q', (req, res) => {
    console.log(req.params.q);
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=qU50qUPmY2TzvPcU5FXsYtYz4EdFcfsl&q=${req.params.q}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
        .then((response) => {
            res.send(response.data.data);
        }).catch((error) => {
            console.log('Search error', error);
            res.sendStatus(500);
        })
})



module.exports = router;