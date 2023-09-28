$(document).ready(function () {
  const urlSegments = window.location.pathname.split('/');
  const mapId = urlSegments[urlSegments.length - 1];

  let map = L.map('map-view').setView([43.70, -79.42], 13);;
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  const getPinsFromMapId = () => {
    const apiPath = `/pin/api/${mapId}`
    fetch(apiPath)
      .then(response => response.json())
      .then(arrOfPins => {
        for (const pinObj of arrOfPins) {
          L.marker([pinObj.lat, pinObj.lng], {draggable: 'true'}).addTo(map)
            .bindPopup(`
            ${pinObj.title} <br> <br>  
            ${pinObj.description} <br> <br> 
            <button type="submit" id="update-pin">Update</button> <br> <br> 
            <button type="submit" id="delete" name="deleted">Delete</button><br> <br> 
            `)
        }
      })
  }

  const createPin = () => {
    map.on('click', function (e) {
      const marker = new L.marker(e.latlng, {draggable: 'true'}).addTo(map)
        marker.bindPopup(`
            <form id="pinForm">
            <label for="title">Title:</label>
            <input type="text" id="title" name="title" required><br><br>
        
            <label for="description">Description:</label>
            <textarea id="description" name="description"></textarea><br><br>

            <button type="submit" id="update-pin">Update</button><br><br>
            <button type="submit" id="delete">Delete</button><br><br>
            </form>
          `)
        .openPopup();

      $(document).on('submit', '#pinForm', (event) => {
        event.preventDefault();
        let formData = {
          map_id: mapId,
          title: $('#title').val(),
          description: $('#description').val(),
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        }
        $.post(`/pin/api/add/${mapId}`, formData)
      })
    })
  }

  const getLocationFromDB = () => {
    const apiPath = `/map/api/${mapId}/location`
    fetch(apiPath)
      .then(response => response.json())
      .then(data => {
        if (data) {
          const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(data[0].location)}&format=json`;
          fetch(apiUrl)
            .then(response => response.json())
            .then(apiData => {
              if (apiData.length > 0) {
                const latitude = parseFloat(apiData[0].lat);
                const longitude = parseFloat(apiData[0].lon);
                map.panTo(new L.LatLng(latitude, longitude), 13);
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  // Call functions
  getLocationFromDB();
  getPinsFromMapId();
  $(document).on('click', createPin());
})
