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
      res.render('edit_map', { map }); //placeholder render
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("Server error");
    })
})

router.get('/new', (req, res) => {
  const templateVars = 'https://cdn.pixabay.com/photo/2020/06/05/01/28/compass-5261062_1280.jpg'
  res.render('map_new', { coverURL: templateVars });
});

router.post('/new', (req, res) => {
  const mapDetails = req.body;
  mapQueries.createMap(mapDetails)
});

module.exports = router;


