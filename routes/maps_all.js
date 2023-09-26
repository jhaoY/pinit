const express = require('express');
const router  = express.Router();
const { getMaps } = require('../db/queries/maps');

router.get('/', (req, res) => {
  res.render('maps_all');
});

router.get('/', (req, res) => {
  const userId = 1;
  Promise.all(
  getMaps(userId)
  )
    .then((maps) => {
      res.render('profile', { maps });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Server error");
    });
});

module.exports = router;
