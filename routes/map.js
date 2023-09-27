const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps')

router.get('/all', (req, res) => {
  const userId = 1;
  // Using Promise.all to fetch all data concurrently
  Promise.all([
    mapQueries.getUserFavoriteMaps(userId),
    mapQueries.getUserMaps(userId),
    mapQueries.getUserContributionMaps(userId),
    mapQueries.getMaps(userId)
  ])
    .then(([favorites, userMaps, contributions, maps]) => {
      res.render('maps_all', { favorites, userMaps, contributions, maps, user_id: req.cookies["user_id"] });
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
      res.render('edit_map', { map }); //placeholder render
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("Server error");
    })
})

router.get('/new', (req, res) => {
  res.render('map_new');
});

router.post('/new', (req, res) => {
  console.log(req.body)
});

module.exports = router;


