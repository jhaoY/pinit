DROP TABLE IF EXISTS contributions;

CREATE TABLE contributions (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) NOT NULL,
  map_id INTEGER REFERENCES maps(id) NOT NULL
);
