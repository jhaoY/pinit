const { query } = require('express');
const db = require('../connection');

const getPinsFromMapId = (mapId) => {
  const queryText = `
  SELECT *
  FROM pins
  WHERE map_id = $1;
  `

  return db.query(queryText, [mapId])
    .then(data => {
      return data.rows;
    })
    .catch(err => {
      console.error(err)
      throw err;
    })
}

const editPin = (pinDetails) => {
  const queryText = `
  UPDATE pins
  SET title = $2, description = $3, coverurl = $4
  WHERE id = $1
  RETURNING *;`

  return db.query(queryText, [pinDetails.id, pinDetails.title, pinDetails.description,pinDetails.coverurl])
}

const addPin = (pinDetails) => {
  const queryText = `
  INSERT INTO pins (title, description, lat, lng, map_id)
  VALUES ($1, $2, $3, $4, $5);
  `;

  return db.query(queryText, [pinDetails.title, pinDetails.description, pinDetails.lat, pinDetails.lng, pinDetails.map_id])
}

const updatePinLocation = (pinId, newLatLng) => {
  const queryText = `
    UPDATE pins
    SET lat = $1, lng = $2
    WHERE id = $3;
  `;

  return db.query(queryText, [newLatLng.lat, newLatLng.lng, pinId])
    .then(data => {
      return data.rowCount; // returns the number of rows affected
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}

const deletePin = (pinDetails) => {
  const queryText = `
  UPDATE pins
  SET deleted = true
  WHERE = $1
  RETURNING *;`

  return db.query(queryText, [pinDetails.id, pinDetails.title, pinDetails.description, pinDetails.address, pinDetails.coverurl])

}

module.exports = {
  getPinsFromMapId,
  editPin,
  addPin,
  deletePin,
  updatePinLocation
}
