const express = require('express');
const router  = express.Router();
const { getMaps, getUserFavoriteMaps, getUserMaps, getUserContributionMaps } = require('../db/queries/maps');
const mapQueries = require('../db/queries/maps')

router.get('/', (req, res) => {
  const userId = 1;
  // Using Promise.all to fetch all data concurrently
  Promise.all([
    getUserFavoriteMaps(userId),
    getUserMaps(userId),
    getUserContributionMaps(userId),
    getMaps(userId)
  ])
    .then(([favorites, userMaps, contributions, maps]) => {
      res.render('maps_all', { favorites, userMaps, contributions, maps });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Server error");
    });
});


module.exports = router;
