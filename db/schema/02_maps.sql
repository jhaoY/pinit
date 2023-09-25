DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  coverURL VARCHAR(255) DEFAULT 'https://cdn.pixabay.com/photo/2020/06/05/01/28/compass-5261062_1280.jpg',
  location VARCHAR(255) DEFAULT 'Toronto, Ontario',
  created_by INTEGER REFERENCES users(id) ON DELETE CASCADE,
  times_favorited INTEGER DEFAULT 0,
  deleted BOOLEAN DEFAULT FALSE
);
