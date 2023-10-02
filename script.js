const langBtn = document.querySelector(".langBtn");
const invisibleLang = document.querySelector(".invisible-lang");
const navbarBrand = document.querySelector(".navbar-brand");

langBtn.addEventListener('click', () => {
    if(invisibleLang.style.display == "block") {
        invisibleLang.style.display = "none";
    } else {
        invisibleLang.style.display = "block";
    }
})



//! for the lcoation access 
// Function to get user's location and update the input field
// Function to get user's location and update the input field with a nearby place name
function getUserLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Use the latitude and longitude to fetch a nearby place name
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                .then(response => response.json())
                .then(data => {
                    const placeName = data.display_name || "Location not found";
                    document.getElementById("addressInput").value = placeName;
                })
                .catch(error => {
                    console.error("Error fetching place name:", error);
                });
        }, function (error) {
            if (error.code === error.PERMISSION_DENIED) {
                alert("You denied the request for geolocation.");
            } else {
                alert("Error getting geolocation: " + error.message);
            }
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Add a click event listener to the location icon
document.getElementById("locationIcon").addEventListener("click", getUserLocation);
