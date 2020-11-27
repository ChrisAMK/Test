import React from 'react';

import { GoogleMap, useLoadScript, Marker,
    // InfoWindow,
  } from "@react-google-maps/api";

function DriverJobView(props) {

    // Setting up the google maps component
    const libraries = ["places"];

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GoogleAPIKey,
        libraries,
      });    
    
      if (loadError) return "Error";
      if (!isLoaded) return "Loading...";

    return(
        <div className="col-12 jobCard">
            <div className="jobDate">
                <strong>Delivery Date:</strong>
                <p>{props.jobInfo.deliveryDate}</p>
            </div>
            <h2 className="jobTitle">{props.jobInfo.client}</h2>
            <hr></hr>
            <div className="row">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="form-group">
                        <strong>Delivery Address:</strong>
                        <p>{props.jobInfo.address}</p>
                        <hr></hr>
                    </div>
                    <div className="form-group">
                        <strong>Site contacts:</strong>
                    <p>First: <a href={`tel:${props.jobInfo.contactNumber}`}>{props.jobInfo.contactName} {props.jobInfo.contactNumber}</a><br></br> Back up: <a href={`tel:${props.jobInfo.backupContactNumber}`}>{props.jobInfo.backupContactName} {props.jobInfo.backupContactNumber}</a></p>
                        <hr></hr>
                    </div>
                    <div className="form-group">
                        <strong>Job Details: </strong>
                        <p>{props.jobInfo.details}</p>
                        <hr></hr>
                    </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 mapDiv">
                <GoogleMap
                    mapContainerStyle={{ height: "100%", width: "100%"}}
                    zoom={8}
                    center={{ lat: props.jobInfo.lat, lng: props.jobInfo.lng}}
                    >
                    <Marker position={{ lat: props.jobInfo.lat, lng: props.jobInfo.lng}} />
                </GoogleMap>
                </div>
            </div>
        </div>

    )
}

export default DriverJobView