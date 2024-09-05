// document.getElementById('sosButton').addEventListener('click', function() {
//     alert('SOS Signal Sent! Your location is being shared.');
//     // Here, you would integrate with a backend service to send location data to police and volunteers.
// });
document.getElementById('sosButton').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            alert('SOS Signal Sent! Your location is being shared.');

            // Here, you would send the location data to your backend service
            // Example:
            const data = {
                latitude: latitude,
                longitude: longitude
            };

            // Replace with your actual API endpoint
            fetch('http://localhost:3000/api/send-sos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        }, function(error) {
            alert('Unable to retrieve your location. Please ensure location services are enabled.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});
