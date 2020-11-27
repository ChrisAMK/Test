import React from "react";

function Locate({ panTo }) {

    // Get's users location from javascripts inbuilt geolocation module
    const getLocation = () => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                panTo({ lat: position.coords.latitude, lng: position.coords.longitude, });
                },
            () => null
          );
        }

    return (
      <button className="locate" onClick={() => getLocation()}>Click to Locate</button>
    );
}
export default Locate;