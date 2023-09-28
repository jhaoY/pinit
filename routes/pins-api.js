const express = require('express');
const router = express.Router();
const pinQueries = require('../db/queries/pins')

router.get('/:mapId', (req, res) => {
  const mapId = req.params.mapId

  pinQueries.getPinsFromMapId(mapId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err)
      res.status(500).send("Server error");
    })
}) 

module.exports = router;