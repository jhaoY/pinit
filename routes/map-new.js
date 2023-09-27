const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('map_new');
});

router.post('/', (req, res) => {
  console.log(req.body)
});


module.exports = router;
