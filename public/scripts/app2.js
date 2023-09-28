$(document).ready(function () {
  let map;
  const urlSegments = window.location.pathname.split('/');
  const mapId = urlSegments[urlSegments.length - 1];


  const initMap = (latitude, longitude) => {
    map = L.map('map-view').setView([43.70, -79.42], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }

  const moveMap = (latitude, longitude) => {
    map.panTo(new L.LatLng(latitude, longitude), 13);
  }

  const createPin = (latitude, longitude, title, description) => {
    L.marker([latitude, longitude]).addTo(map)
    .bindPopup(`${title} <br> <br> ${description}`)
    .openPopup();
  }

  const getPinsFromMapId = () => {
    const apiPath = `/pin/api/${mapId}`

    fetch(apiPath)
      .then(response => response.json())
      .then(data => {
        generatePins(data);
      })
  }

  const generatePins = (arrOfPins) => {
    for (const locations of arrOfPins) {
      getLocation(locations.address, locations.title, locations.description)
    }
  }

  const getLocation = (location, title, description) => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const latitude = parseFloat(data[0].lat);
          const longitude = parseFloat(data[0].lon);

          // Move the map with the obtained coordinates
          createPin(latitude, longitude, title, description);
        } else {
          alert('Location not found!');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const getLocationFromDB = () => {
    const apiPath = `/map/api/${mapId}/location`

    fetch(apiPath)
      .then(response => response.json())
      .then(data => {
        if (data) {
          getLatLongLocation(data[0].location)
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const getLatLongLocation = (location) => {
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const latitude = parseFloat(data[0].lat);
          const longitude = parseFloat(data[0].lon);
          moveMap(latitude, longitude);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Call function to show location
  initMap();
  getLocationFromDB();
  getPinsFromMapId();
})