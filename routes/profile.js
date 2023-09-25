const express = require('express');
const router = express.Router();
const { getMaps, getUserFavoriteMaps, getUserMaps, getUserContributionMaps } = require('../db/queries/maps');

router.get('/', (req, res) => {
  const userId = req.params.id;
  // Using Promise.all to fetch all data concurrently
  Promise.all([
    getUserFavoriteMaps(userId),
    getUserMaps(userId),
    getUserContributionMaps(userId)
  ])
    .then(([favorites, userMaps, contributions]) => {
      res.render('profile', { favorites, userMaps, contributions });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Server error");
    });
});

module.exports = router;