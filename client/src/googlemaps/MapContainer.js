import React, {useRef, useCallback} from "react";
import Search from "./Search";
import Locate from "./Locate";

import {
  GoogleMap,
  useLoadScript,
  // Marker,
  // InfoWindow,
} from "@react-google-maps/api";

// import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  height: "50px%",
  width: "50px",
};

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: -32.221512,
  lng: 116.008072,
};

function MapContainer() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyC1c5k-YqgX3czTiqcqUzY5O6GkfUUjmwM",
    libraries,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
  mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <h1>MAP</h1>

      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        
      </GoogleMap>
    </div>
  );
}

export default MapContainer

