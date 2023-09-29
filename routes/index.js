const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps')

router.get('/', (req, res) => {
  Promise.all([
    mapQueries.getMaps()
  ])
    .then(([maps]) => {
      res.render('index', { maps });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Server error");
    });
});

module.exports = router;
