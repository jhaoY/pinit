const express = require('express');
const router = express.Router();
const mapQueries = require('../db/queries/maps');

router.get('/all', (req, res) => {
  const userId = req.cookies['user_id'];
  // Using Promise.all to fetch all data concurrently
  Promise.all([
    mapQueries.getMaps(userId)
  ])
    .then(([maps]) => {
      res.render('maps_all', { maps, user_id: req.cookies["user_id"] });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Server error");
    });
});

/* ----------- /new ----------- */
router.get('/new', (req, res) => {
  const userId = req.cookies['user_id'];

  if (!userId) {
    res.redirect('../');
  } else {
    const templateVars = 'https://cdn.pixabay.com/photo/2020/06/05/01/28/compass-5261062_1280.jpg';
    res.render('map_new', { coverURL: templateVars });
  }
});

router.post('/new', (req, res) => {
  const mapDetails = req.body;
  const userId = req.cookies['user_id'];
  mapDetails.created_by = userId;
  console.log(mapDetails);

  mapQueries.createMap(mapDetails)
    .then(
      res.redirect('/profile')
    );
});

/* ----------- /:mapId ----------- */
router.get('/:mapId', (req, res) => {
  const mapId = req.params.mapId;
  mapQueries.getMapByMapId(mapId)
    .then(([map]) => {
      res.render('map_view', { map });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Server error");
    });
});

/* ----------- /mapId/edit ----------- */
router.get('/:mapId/edit', (req, res) => {
  const mapId = req.params.mapId;
  mapQueries.getMapByMapId(mapId)
    .then(([map]) => {
      res.render('edit_map', { map }); //placeholder render
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Server error");
    });
});


module.exports = router;


