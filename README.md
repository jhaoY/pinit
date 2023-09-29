Wiki-Maps
=========

## WikiMaps
WikiMap is an application that allows you to create maps with custom markers on them. Anyone can view a map and registered users can add and edit markers on any map!

## Screenshots

![landing page of wiki-maps](https://github.com/jhaoY/wiki-maps/blob/master/docs/Mainpage.png)
![create map view](https://github.com/jhaoY/wiki-maps/blob/master/docs/createmap.png)
![map view](https://github.com/jhaoY/wiki-maps/blob/master/docs/mapWithPins.png.png)
![list of all maps](https://github.com/jhaoY/wiki-maps/blob/master/docs/listOfAllMaps.png)
![creating a new map](https://github.com/jhaoY/wiki-maps/blob/master/docs/newMapPopup.png)


## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Chalk: 2.4.2
- Cookie-parser": 1.4.6
- Dotenv": 2.0.0
- Ejs": 2.6.2
- Express": 4.17.1
- Morgan": 1.9.1
- Sass: 1.35.1
