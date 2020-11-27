import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, { getGeocode, getLatLng, } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";

const libraries = ["places"];

function Search(props) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
      } = usePlacesAutocomplete({
        requestOptions: {
          location: { lat: () => -32.221512, lng: () => 116.008072 },
          radius: 100 * 1000,
        },
      }
      );
    
      const handleInput = (e) => {
        setValue(e.target.value);
      };
    
      const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();
    
        try {
          const results = await getGeocode({ address });
          const { lat, lng } = await getLatLng(results[0]);
          props.setGeoLocation(lat, lng);
        } catch (error) {
          console.log("😱 Error: ", error);
        }
      };
      props.setFilledAddress(value)
      return (
        <div className="autocomplete">
          <Combobox onSelect={handleSelect} className="comboxboxOption">
            <ComboboxInput
              value={value}
              onChange={handleInput}
              disabled={!ready}
              placeholder="Enter Address"
              className="addressInput"
            />
            <ComboboxPopover className="comboxboxOption">
              <ComboboxList>
                {status === "OK" &&
                  data.map(({ id, description }) => (
                    <ComboboxOption key={id} value={description}/>
                  ))}
              </ComboboxList>
            </ComboboxPopover>
          </Combobox>
        </div>
    );
}

function JobAutoComplete(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyC1c5k-YqgX3czTiqcqUzY5O6GkfUUjmwM",
    libraries,
  });

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
      <Search setGeoLocation={props.setGeoLocation} setFilledAddress={props.setFilledAddress}/>
  );
}

export default JobAutoComplete

