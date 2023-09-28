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

const addPin = (pinDetails) => {
  const queryText = `
  INSERT INTO pins (title, description, address)
  VALUES ($1, $2, $3);
  `;

  return db.query(queryText, [pinDetails.title, pinDetails.description, pinDetails.address])
}

module.exports = {
  getPinsFromMapId,
  addPin
}