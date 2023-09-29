const express = require('express');
const router = express.Router();
const pinQueries = require('../db/queries/pins');

router.get('/:mapId', (req, res) => {
  const mapId = req.params.mapId;

  pinQueries.getPinsFromMapId(mapId)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Server error");
    });
});

router.post('/add/:mapId', (req, res) => {
  const pinDetails = req.body;
  console.log(pinDetails);
  pinQueries.addPin(pinDetails);
});

router.post('/update/:pinId', (req, res) => {
  const pinId = req.params.pinId;
  const { title, description, coverURL } = req.body;

  pinQueries.updatePinDetails(pinId, title, description, coverURL);
});

router.post('/delete/:pinId', (req, res) => {
  const pinId = req.params.pinId;
  console.log(pinId);
  pinQueries.deletePin(pinId);
});

module.exports = router;