const express = require('express');
const router  = express.Router();
const mapQueries = require('../db/queries/maps')

router.get('/', (req, res) => {
  res.render('map_new');
});

router.post('/', (req, res) => {
  console.log(req.body)
  const mapDetails = req.body;
  mapQueries.createMap(mapDetails)
});



module.exports = router;
