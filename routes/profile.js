const express = require('express');
const router = express.Router();
const mapQueries = require('../db/queries/maps')

router.get('/', (req, res) => {
  const userId = req.cookies['user_id']

  if (!userId) {
    res.redirect('../')
  } else {
    // Using Promise.all to fetch all data concurrently
    Promise.all([
      mapQueries.getUserFavoriteMaps(userId),
      mapQueries.getUserMaps(userId),
      mapQueries.getUserContributionMaps(userId),
    ])
      .then(([favorites, userMaps, contributions]) => {
        res.render('profile', { favorites, userMaps, contributions });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Server error");
      });
  }
});

/* ----------- /favorite ----------- */
router.post('/:mapId/favoriteMap', (req, res) => {
  const userId = req.cookies['user_id']
  const mapId = req.body.mapId;

  mapQueries.favoriteMap(userId, mapId)
    .then(data => {
      console.log(data);
      res.redirect('/profile')
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("Server error");
    })
})

module.exports = router;