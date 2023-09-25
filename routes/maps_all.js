const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('maps_all');
});

module.exports = router;
