DROP TABLE IF EXISTS pins CASCADE;

CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  address VARCHAR(255) NOT NULL,
  map_id INTEGER REFERENCES maps(id) NOT NULL,
  imageURL VARCHAR(255) DEFAULT 'https://cdn.pixabay.com/photo/2023/08/16/18/05/homes-8194751_1280.png',
  deleted BOOLEAN DEFAULT false
);
