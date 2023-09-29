const express = require('express');
const router = express.Router();
const mapQueries = require('../db/queries/maps');

router.get('/:mapId/location', (req, res) => {
  const mapId = req.params.mapId;
  mapQueries.getLocationByMapId(mapId)
    .then(location => {
      res.json(location);
    })

    .catch(err => {
      console.error(err);
      res.status(500).send("Server error");
    });
});


module.exports = router;