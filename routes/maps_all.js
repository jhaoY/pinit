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

router.get('/:mapId/edit', (req, res) => {
  const mapId = 1;
  mapQueries.getMapByMapId(mapId)
    .then(data => {
      const map = data.rows[0];
      res.render('edit_map', { map });
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("Server error");
    })
})

router.post('/:mapId/favorite', (req, res) => {
  const userId = 1;
  const mapId = 1;

  mapQueries.favoriteMap(userId, mapId)
    .then(data => {
      res.redirect(`/profile`)
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
      res.redirect(`/maps/${mapId}`)
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("Server error");
    })
})

module.exports = router;
