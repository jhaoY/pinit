$(document).ready(function () {
  // Gets the map_id
  const urlSegments = window.location.pathname.split('/');
  const mapId = urlSegments[urlSegments.length - 1];

  // Setting default map view to Toronto
  let map = L.map('map-view').setView([43.70, -79.42], 13);;
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Generate pins from the given mapID returned from the map API
  const getPinsFromMapId = () => {
    const apiPath = `/pin/api/${mapId}`;
    fetch(apiPath)
      .then(response => response.json())
      .then(arrOfPins => {
        for (const pinObj of arrOfPins) {
          if (pinObj.deleted === false) {
            L.marker([pinObj.lat, pinObj.lng], { draggable: 'true' }).addTo(map)
              .bindPopup(`
            <form class="updateForm">
              <div id="popUp-image-text-container">
                <div class="popUp-image-container">
                  <img class="pop-up-image" src="${pinObj.imageurl}" alt="Photo of ${pinObj.title}"> <br><br>
                </div>
                <div class="popUp-info">
                  <input type="text" name="title" value="${pinObj.title}">
                  <textarea name="description">${pinObj.description}</textarea><br><br>
                </div>
              </div>
              <button type="submit" class="btn-update-pin" data-pin-id="${pinObj.id}">Update</button>
            </form>
              <form class="deleteForm">
                <button type="submit" class="btn-delete" name="deleted" data-pin-id="${pinObj.id}">Delete</button>
              </form>
            `);
          }
        }
      });
  };

  // Creates a pin on clicking then submit to database on clicking submit
  const createPin = () => {
    map.on('click', function(e) {
      const marker = new L.marker(e.latlng, { draggable: 'true' }).addTo(map);
      marker.bindPopup(`
            <form id="pinForm">
              <label for="title">Title:</label>
              <input type="text" id="title" name="title" required><br><br>
              <label for="description">Description:</label>
              <textarea id="description" name="description"></textarea><br><br>
              <label for="imageURL">ImageURL:</label>
              <input type="text" id="imageURL" name="imageURL"> <br><br>
              <button type="submit" id="update-pin">Update</button><br><br>
              <button type="submit" id="delete">Delete</button><br><br>
            </form>
          `)
        .openPopup();
      $(document).on('submit', '#pinForm', () => {
        let formData = {
          map_id: mapId,
          title: $('#title').val(),
          description: $('#description').val(),
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          imageURL: $('#imageURL').val(),
        };
        $.post(`/pin/api/add/${mapId}`, formData);
      });
    });
  };

  // Passes the mapID location to an API which returns long/lat
  const getLocationFromDB = () => {
    const apiPath = `/map/api/${mapId}/location`;
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
  };

  // Event handler to update a pin
  $(document).on('submit', '.updateForm', (event) => {
    const pinId = $(event.target).find('.btn-update-pin').data('pin-id');
    let formData = {
      title: $(event.target).find('input[name="title"]').val(),
      description: $(event.target).find('textarea[name="description"]').val(),
      coverURL: $(event.target).find('input[name="coverURL"]').val()
    };
    $.post(`/pin/api/update/${pinId}`, formData);
  });

  // Event handler to set a pin to deleted:true
  $(document).on('submit', '.deleteForm', (event) => {
    const pinId = $(event.target).find('.btn-delete').data('pin-id');
    console.log(pinId);
    let formData = {
      id: pinId.id
    };
    $.post(`/pin/api/delete/${pinId}`, formData);
  });

  // Call functions
  getLocationFromDB();
  getPinsFromMapId();
  createPin();
});
