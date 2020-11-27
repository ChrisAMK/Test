import React, { useEffect, useRef, useState } from "react";
import API from "../../utils/API";
import JobAutoComplete from "./JobAutoComplete";

import TextField from "@material-ui/core/TextField";
import Select from '@material-ui/core/Select';
import { KeyboardDatePicker } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { MenuItem } from "@material-ui/core";

function JobCreation(props) {

    // Declaring State and making use of our style for Material UI
    const clientRef = useRef("");
    const contactNameRef = useRef("");
    const contactNumberRef = useRef("");
    const backupContactNameRef = useRef("");
    const backupContactNumberRef = useRef("");
    const detailsRef = useRef("");
    const [ latRef, setLatRef ] = useState("");
    const [ lngRef, setLngRef ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ employees, setEmployees ] = useState([]);
    const [ selectedDate, setSelectedDate] = useState(Date.now());
    const [ selectedWorkerID, setSelectedWorkerID ] = useState("");
    const [ jobCount, setJobCount ] = useState("");
    const [submitOpen, setSubmitOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const selectedWorkerRef = useRef("");

    // Submit Modal Functions
    const handleSubmitOpen = () => {
        setSubmitOpen(true);
    };
    const handleSubmitClose = () => {
        setSubmitOpen(false);
    };
    const handleAlertOpen = () => {
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };
    

    // Get selected workers ID gets the ID of the worker who matches the first and last name parsed in
    const getSelectedWorkersID = async (firstname, lastname) => {
        const worker = await API.getWorkerID(firstname, lastname);
        setSelectedWorkerID(worker.data[0].id);
    };

    // Handle change listens for the change in the list of workers and once one is chosen we set the state and trigger the get selected worker ID Function
    const handleChange = (event) => {
        const workerString = event.target.value;
        const splitworker = workerString.split(' ');
        let firstname = splitworker[0];
        let lastname = splitworker[splitworker.length - 1];
        getSelectedWorkersID(firstname, lastname);
    };
    
    // Handle date change is for the Date Picker Material UI
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Set Geo Location is a function that is passed in to the map component as a prop so we can trigger it with values from the map
    const setGeoLocation = (lat, lng) => {
        setLatRef(lat);
        setLngRef(lng);
    };

    // Set Filled Address is a function that is passed as a prop into the map to save state of a value filled inside of the map
    const setFilledAddress = (address) => {
        setAddress(address);
    };

    // When the component loads we get fetch all the users from the database and push the results to an array
    useEffect(() => {

        // Making an array of employees to be used in a selection list
        const getUserList = async () => {
            let employeeList = [];
            const users = await API.getUserList();
            await users.data.forEach(name => {
                employeeList.push(`${name.firstname} ${name.lastname}`);
            });
            await setEmployees(employeeList);
        };

        // Counting how many jobs are in the database already so we know what id this job will become
        const getLastJobID = async () => {
            let jobs = await API.viewAllJobs();
            let lastJob = [...jobs.data].pop();
            (lastJob === undefined) ? await setJobCount(1) : await setJobCount(lastJob.id + 1)
        }

        getLastJobID();
        getUserList();
    }, [latRef, lngRef, address])

    // Post Job is the function that sends the form data and state data to the API function
    const postJob = async (client, address, contactName, contactNumber, backupContactName, backupContactNumber, details, worker, deliveryDate, lat, lng) => {
        if (client === "" || address === "" || contactName === "" || contactNumber === "" || backupContactName === "" || backupContactNumber === "" || details === "" || worker === "" || deliveryDate === "" || lat === "" || lng === "") {
            alertInvalidForm()
        } else {
            await handleSubmitOpen();
            await clearFields();
            await API.createJob(client, address, contactName, contactNumber, backupContactName, backupContactNumber, details, worker, deliveryDate, lat, lng)
            await postJobID(jobCount, selectedWorkerID)
        }
    }

    // Alert Invalid form is triggered if the user doesn't complete the form
    const alertInvalidForm = () => {
        handleAlertOpen()
    }

    // postJobID assigns this new job to the chosen worker
    const postJobID = async (jobCount, worker_id) => {
        await API.updateAssignedJobID(jobCount, worker_id);
    }

    const clearFields = () => {
        clientRef.current.value = "";
        contactNameRef.current.value = "";
        contactNumberRef.current.value = "";
        backupContactNameRef.current.value = "";
        backupContactNumberRef.current.value = "";
        detailsRef.current.value = "";
    }

    // Submit handler is a function that is triggered when the submit button is pressed, we then invoke the post job and post job id functions and reset the value
    const submitHandler = (event) => {
        event.preventDefault();
        postJob(clientRef.current.value, address, contactNameRef.current.value, contactNumberRef.current.value, backupContactNameRef.current.value, backupContactNumberRef.current.value, detailsRef.current.value, selectedWorkerID, selectedDate, latRef, lngRef);
    }

    return(
        <React.Fragment>
            <div className="row">
            <button onClick={() => props.handlePageChange("")} className="backBtn">Back</button>
                <div className="col-12 loginForm">
                    <h2 className="jobCtitle">Job Creation Sheet</h2>
                    <hr></hr>
                    <form className="login">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                                <div className="form-group">
                                    <TextField fullWidth required inputRef={clientRef} label="Enter an Client/Job Name" width="100%"/>
                                </div>
                                <div className="form-group autoSearchJob">
                                    <JobAutoComplete setGeoLocation={setGeoLocation} setFilledAddress={setFilledAddress}/>
                                </div>
                                <div className="form-group">
                                    <TextField fullWidth required inputRef={contactNameRef} label="Enter Contact Name" width="100%"/>
                                </div>
                                <div className="form-group">
                                    <TextField fullWidth required inputRef={contactNumberRef} label="Enter Contact Number" width="100%"/>
                                </div>
                                <div className="form-group">
                                    {/* <FormControl fullWidth className={classes.formControl}>
                                        <InputLabel htmlFor="age-native-simple">Choose a worker for the Job</InputLabel>
                                        <Select fullWidth value={selectedWorker} onChange={handleChange}>
                                        {employees.map((employee, key) => {
                                            return <option value={employee} key={key}>{employee}</option>
                                        })}
                                        </Select>
                                    </FormControl> */}
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="age-native-simple">Choose a worker for the Job</InputLabel>
                                        <Select required labelId="demo-simple-select-label" style={{height:50, width:"100%"}} inputRef={selectedWorkerRef} onChange={handleChange}>
                                            {employees.map((employee, key) => {
                                            return <MenuItem value={employee} key={key}>{employee}</MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                                <div className="form-group" style={{width:"100%"}}>
                                    <KeyboardDatePicker fullWidth required label="Please enter the date you want delivery" format="MM/dd/yyyy" value={selectedDate} onChange={handleDateChange} KeyboardButtonProps={{ 'aria-label': 'change date', }} />
                                </div>
                                <div className="form-group">
                                    <TextField fullWidth required inputRef={backupContactNameRef} label="Enter a Back up Contact Name" width="100%"/>
                                </div>
                                <div className="form-group">
                                    <TextField fullWidth required inputRef={backupContactNumberRef} label="Enter a Back up contact Number" width="100%"/>
                                </div>
                                <div className="form-group">
                                    <TextField fullWidth label="Enter any needed information including Exact time" multiline rows={4} inputRef={detailsRef}/>
                                </div>
                            </div>
                        </div>
                        <button onClick={submitHandler} className="submitBtn jobForm">Submit Job</button>
                    </form>
                </div>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="deleteModal"
                open={submitOpen}
                onClose={handleSubmitClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={submitOpen}>
                <div className="deletePaper">
                    <div className="">
                        <h2 id="transition-modal-title">Job Successfully Created</h2>
                    </div>
                </div>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="deleteModal"
                open={alertOpen}
                onClose={handleAlertClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={alertOpen}>
                <div className="deletePaper">
                    <div className="">
                        <h2 id="transition-modal-title">Please Fill In Everything</h2>
                    </div>
                </div>
                </Fade>
            </Modal>
        </React.Fragment>
    )
}

export default JobCreation