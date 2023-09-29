$(document).ready(function() {
  let map = L.map('map').setView([43.6532, -79.3832], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

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
        } else {
          alert('Location not found!');
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
