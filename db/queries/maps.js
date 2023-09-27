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

const getMapByMapId = (id) => {
  const queryText = `
    SELECT *
    FROM maps
    WHERE id = $1;
    `;

  return db.query(queryText, [id])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.err(err);
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

const updateMap = (mapDetails) => {
  let queryText = `
    UPDATE maps
    SET title=$2, description=$3, location=$4
    WHERE id = $1
    RETURNING *;
    `;

  return db.query(queryText, [mapDetails.id, mapDetails.title, mapDetails.description, mapDetails.location]);
}

const favoriteMap = (userId, mapId) => {
  const queryText = `
    INSERT INTO favorites (user_id, map_id)
    VALUES ($1, $2);
  `;

  return db.query(queryText, [userId, mapId]);
}

const createMap = (mapDetails) => {
  const queryText =
  `INSERT INTO maps (title, description, coverURL, location)
  VALUES ($1, $2, $3, $4)`;
  return db.query(queryText, [mapDetails.title, mapDetails.description, mapDetails.coverURL, mapDetails.location])
}

module.exports = {
  getMaps,
  getUserMaps,
  getMapByMapId,
  getUserFavoriteMaps,
  getUserContributionMaps,
  isMapFavoritedByUser,
  updateMap,
  favoriteMap,
  createMap
}