import React, { useEffect, useState } from "react";
import API from "../../utils/API";

import { GoogleMap, useLoadScript, Marker,
  // InfoWindow,
} from "@react-google-maps/api";


function JobComponent(props) {

    const [ workerFirstName, setWorkerFirstName ] = useState("");
    const [ workerLastName, setWorkerLastName ] = useState("");

    // When the component loads and we can a user assigned to the job in the props, we get set state to a query of the names of the query
    useEffect(() => {
        const getNamefromID = async (worker_id) => {
            const name = await API.getNamefromID(worker_id)
            await setWorkerFirstName(name.data[0].firstname)
            await setWorkerLastName(name.data[0].lastname)
        }
        if (props.worker_id === null) {
            return
        } else {
            getNamefromID(props.worker_id)
        }
    })
    
    const libraries = ["places"];

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GoogleAPIKey,
        libraries,
      });    
    
      if (loadError) return "Error";
      if (!isLoaded) return "Loading...";

    return(

        <div className="row">
            <div className="col-12 jobCard">
                <div className="jobDate">
                    <strong>Delivery Date:</strong>
                    <p>{props.deliveryDate}</p>
                </div>
                <h2 className="jobTitle">{props.client}</h2>    
                <strong><p>Assigned Driver: </p>{(workerFirstName) ? <p>{workerFirstName} {workerLastName}</p> : <p>Unassigned</p>}</strong>
                <hr></hr>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6">
                        <div className="form-group">
                            <strong>Delivery Address:</strong>
                            <p>{props.address}</p>
                            <hr></hr>
                        </div>
                        <div className="form-group">
                            <strong>Site contacts:</strong>
                        <p>First: <a href={`tel:${props.contactNumber}`}>{props.contactName} {props.contactNumber}</a><br></br> Back up: <a href={`tel:${props.bacupContactNumber}`}>{props.backupContactName} {props.backupContactNumber}</a></p>
                            <hr></hr>
                        </div>
                        <div className="form-group">
                            <strong>Job Details: </strong>
                            <p>{props.details}</p>
                            <hr></hr>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-6 col-lg-6 mapDiv">
                        <GoogleMap
                            mapContainerStyle={{ height: "100%", width: "100%"}}
                            zoom={8}
                            center={{ lat: props.lat, lng: props.lng}}
                            >
                            <Marker position={{ lat: props.lat, lng: props.lng}} />
                        </GoogleMap>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobComponent