const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('map_new');
});

module.exports = router;
