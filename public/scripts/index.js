$(document).ready(function () {
  // Declaring the map and showing a default location of Toronto using longitude and latitude
  let map = L.map('map').setView([43.6532, -79.3832], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Function to move map to long/lat of the location value
  const getLocation = () => {
    const info = document.getElementById('location').value;
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(info)}&format=json`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          const latitude = parseFloat(data[0].lat);
          const longitude = parseFloat(data[0].lon);

          // Move the map with the obtained coordinates
          map.panTo(new L.LatLng(latitude, longitude), 13);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  $('#updateLocationBtn').on('click', function() {
    getLocation();
  });
});
