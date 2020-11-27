import React, { useEffect, useState, useRef } from "react";
import API from '../../utils/API';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { format, formatDistanceToNowStrict, add } from "date-fns";
import { MenuItem } from "@material-ui/core";

import { GoogleMap, useLoadScript, Marker,
    // InfoWindow,
  } from "@react-google-maps/api";

// use style hook for Material UI
function DriverLocation(props) {

    // declaring our state and using the style declared above
    const [ employees, setEmployees ] = useState([]);
    const [ worker, setWorker ] = useState("");
    const [ selectedWorkerLat, setSelectedWorkerLat ] = useState("");
    const [ selectedWorkerLng, setSelectedWorkerLng ] = useState("");
    const [ startTime, setStartTime ] = useState(null);
    const [ pingTime, setPingTime ] = useState(null);
    const [ workerPhone, setWorkerPhone ] = useState(null);
    const [ breakTime, setBreakTime ] = useState(null);
    const [ ready, setReady ] = useState(false);
    const selectedWorkerRef = useRef("");

    // Function that gets the ID of the worker that matches the first and last name and once it gets the data back we set ready to true
    const getSelectedWorkersID = async (firstname, lastname) => {
        const worker = await API.getWorkerID(firstname, lastname)
        await setStartTime(worker.data[0].startTime)
        await setPingTime(worker.data[0].pingTime)
        await setWorkerPhone(worker.data[0].phonenumber)
        await setSelectedWorkerLat(worker.data[0].userLat)
        await setSelectedWorkerLng(worker.data[0].userLng)
        await setReady(true)

        try {
            const userStartTimeInt = parseInt(worker.data[0].startTime)
            const valueToSubtract = add(userStartTimeInt, { hours: 6 })
            let goodDate = await format(valueToSubtract, "T")
            const goodDateInt = parseInt(goodDate)
            await setBreakTime(goodDateInt);
        }
        catch {
            console.log("Loading")
        }
    }

    // When there is change on the page in the way of a list, we have to separate the full name string and pass in the first and last name
    const handleChange = (event) => {
        setBreakTime(null)
        setWorker(event.target.value);
        const workerString = event.target.value;
        const splitworker = workerString.split(' ');
        let firstname = splitworker[0];
        let lastname = splitworker[splitworker.length - 1];
        getSelectedWorkersID(firstname, lastname);
        
    };

    // When the component loads we call the getUserList function that queries the database and sets the employee state to the users
    useEffect(() => {
        const getUserList = async () => {
            let employeeList = [];
            const users = await API.getUserList()
            await users.data.forEach(name => {
                employeeList.push(`${name.firstname} ${name.lastname}`)
            });
            await setEmployees(employeeList)
        }

        getUserList()
    }, [worker, breakTime, startTime, pingTime])

    const libraries = ["places"];
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GoogleAPIKey,
        libraries,
      });    
    
      if (loadError) return "Error";
      if (!isLoaded) return "Loading...";

    return(
        <React.Fragment>
            <div className="row">
            <button onClick={() => props.handlePageChange("")} className="backBtn">Back</button>
                <div className="col-12 heading">
                    <div className="form-group">
                    <h2 style={{textAlign: "center"}}>Choose a driver to Locate</h2>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="age-native-simple">Choose a worker for the Job</InputLabel>
                        <Select required style={{height:50, width:"100%"}} inputRef={selectedWorkerRef} onChange={handleChange}>
                            {employees.map((employee, key) => {
                            return <MenuItem value={employee} key={key}>{employee}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    </div>
                </div>
            </div>
            
            <div className="row">
            <div className="col-12 heading">
                <h3>Last Known Location</h3>
                <hr></hr>
                {console.log(startTime, pingTime, "TEST")}
                <div className="row">
                    <div className="col-6 col-sm-6 col-md-4">
                        {(startTime === null) ? <p></p> : <React.Fragment><h6>Driver Started: </h6> <h3>{(formatDistanceToNowStrict(parseInt(startTime), { addSuffix: true, includeSeconds: true }))}</h3></React.Fragment>}
                    </div>
                    <div className="col-6 col-sm-6 col-md-4">
                        {(breakTime === null) ? <p></p> : <React.Fragment><h6>Driver is due for a Break:</h6> <h3>{(formatDistanceToNowStrict(parseInt(breakTime), { addSuffix: true, includeSeconds: true }))}</h3></React.Fragment>}
                    </div>
                    <div className="col-12 col-sm-12 col-md-4">
                        {(pingTime === null) ? <p></p> : <React.Fragment><h6>Latest Check-in: </h6> <h3>{(formatDistanceToNowStrict(parseInt(pingTime), { addSuffix: true, includeSeconds: true }))}</h3></React.Fragment>}
                    </div>
                </div>
                {(workerPhone === null) ? <p></p> : <button className="backBtn jobBtn"><a href={`tel:${workerPhone}`}>Click to Call</a></button> }

            </div>
            
                <div className="col-12 driverMap">
                    {(ready === true)
                    ? <GoogleMap
                        mapContainerStyle={{ height: "100%", width: "100%"}}
                        zoom={8}
                        center={{ lat: selectedWorkerLat, lng: selectedWorkerLng}}
                        >
                        <Marker position={{ lat: selectedWorkerLat, lng: selectedWorkerLng}} />
                    </GoogleMap>
                    : <h6 style={{textAlign: "center"}}>Waiting on Selection...</h6>}
                </div>
            </div>
            
    
        </React.Fragment>
        
    )
}

export default DriverLocation