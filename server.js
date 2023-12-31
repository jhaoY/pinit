// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieParser());

// Separated Routes for each Resource
const indexRoutes = require('./routes/index');
const profileRoutes = require('./routes/profile');
const mapRoutes = require('./routes/map');
const mapAPI = require('./routes/map-api');
const pinAPI = require('./routes/pins-api');
// Mount all resource routes
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

app.use('/', indexRoutes);
app.use('/profile', profileRoutes);
app.use('/map', mapRoutes);
app.use('/map/api', mapAPI);
app.use('/pin/api', pinAPI);
// Note: mount other resources here, using the same pattern above

app.get('/login/:id', (req, res) => {
  res.cookie("user_id", req.params.id);
  res.redirect("/");
});

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
