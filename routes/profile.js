const express = require('express');
const router = express.Router();
const mapQueries = require('../db/queries/maps')

router.get('/', (req, res) => {
  const userId = 1;
  // Using Promise.all to fetch all data concurrently
  Promise.all([
    mapQueries.getUserFavoriteMaps(userId),
    mapQueries.getUserMaps(userId),
    mapQueries.getUserContributionMaps(userId)
  ])
    .then(([favorites, userMaps, contributions]) => {
      res.render('profile', { favorites, userMaps, contributions });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Server error");
    });
});

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

router.post('/:mapId/update', (req, res) => {
  const mapId = 1;
  const { title, description, location } = req.body;

  mapQueries.updateMap({ id: mapId, title, description, location })
    .then(data => {
      res.redirect(`/map/${mapId}`)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("Server error");
    })
})

module.exports = router;