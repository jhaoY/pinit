const { query } = require('express');
const db = require('../connection');

const getMaps = () => {
  return db.query('SELECT * FROM maps')
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.error(err);
      throw err;
    })
}

const getUserMaps = (id) => {
  const queryText = `
    SELECT * 
    FROM maps
    WHERE created_by = $1;
    `;

  return db.query(queryText, [id])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.error(err);
      throw err;
    })
}

const getUserFavoriteMaps = (id) => {
  const queryText = `
    SELECT * 
    FROM favorites
    JOIN users ON users.id = user_id
    JOIN maps ON maps.id = map_id
    WHERE user_id = $1;
    `;

  return db.query(queryText, [id])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.error(err);
      throw err;
    })
};

const getUserContributionMaps = (id) => {
  const queryText = `
    SELECT *
    FROM contributions
    JOIN users ON users.id = user_id
    JOIN maps ON maps.id = map_id
    WHERE user_id = $1;
    `;

  return db.query(queryText, [id])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.error(err);
      throw err;
    })
};

const isMapFavoritedByUser = (userId, mapId) => {
  const queryText = `
    SELECT EXISTS (
      SELECT 1 FROM favorites 
      WHERE user_id = $1 AND map_id = $2
    );
  `;

  return db.query(queryText, [userId, mapId])
    .then(res => res.rows[0].exists)
    .catch(err => {
      console.error(err);
      throw err;
    });
};

module.exports = { getMaps, 
  getUserFavoriteMaps, 
  getUserMaps, 
  getUserContributionMaps,
  isMapFavoritedByUser }