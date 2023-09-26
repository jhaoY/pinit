const express = require('express');
const router  = express.Router();

/*---------"/map/new"------------*/
app.get('/map/new', (req, res) => {
  res.render('map_new');
});

module.exports = router;
