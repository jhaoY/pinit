const db = require('../connection');

const getMaps = () => {
  return db.query('SELECT * FROM maps')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    })
    .catch(err => {console.error(err)});
}

getMaps();
