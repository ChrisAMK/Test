import React, { useEffect, useState, useRef, useContext } from "react";
import API from "../../utils/API";

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { MenuItem } from "@material-ui/core";
import UserProvider from '../../utils/UserContext';

function EditJobComponent(props) {

    const userData = useContext(UserProvider.context);
    const [ workerFirstName, setWorkerFirstName ] = useState("");
    const [ workerLastName, setWorkerLastName ] = useState("");
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [ employees, setEmployees ] = useState([]);
    const [ selectedWorkerID, setSelectedWorkerID ] = useState("");
    const [ selectedDate, setSelectedDate] = useState(Date.now());
    const selectedWorkerRef = useRef("");
    const clientRef = useRef("");
    const contactNameRef = useRef("");
    const contactNumberRef = useRef("");
    const backupContactNameRef = useRef("");
    const backupContactNumberRef = useRef("");
    const detailsRef = useRef("");

    // Modal open and close handlers
    const handleEditOpen = () => {
        setEditOpen(true);
    };
    const handleEditClose = () => {
        setEditOpen(false);
    };
    const handleDeleteOpen = () => {
        setDeleteOpen(true);
    };
        const handleDeleteClose = () => {
        setDeleteOpen(false);
    };

    // Get selected workers ID gets the ID of the worker who matches the first and last name parsed in
    const getSelectedWorkersID = async (firstname, lastname) => {
        const worker = await API.getWorkerID(firstname, lastname);
        setSelectedWorkerID(worker.data[0].id);
    };

    // Handles worker list selection
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

    // Post Job is the function that sends the form data and state data to the API function
    const updateJob = async (id, client, contactName, contactNumber, backupContactName, backupContactNumber, details, worker, deliveryDate) => {
        const postedJob = await API.updateJob(id, client, contactName, contactNumber, backupContactName, backupContactNumber, details, worker, deliveryDate)
        await console.log(postedJob)
    }

    const deleteJob = async (id) => {
        await API.deleteJob(id)
    }

    const deleteJobId = async (worker_id, ) => {
        await API.deleteJobId(worker_id)
    }

    const updateJobId = async (worker_id, job_id) => {
        await API.updateNewDriver(worker_id, job_id)
    }

    // Submit handler is a function that is triggered when the submit button is pressed, we then invoke the post job and post job id functions and reset the value
    const submitHandler = (event) => {
        event.preventDefault();
        updateJob(props.id, clientRef.current.value, contactNameRef.current.value, contactNumberRef.current.value, backupContactNameRef.current.value, backupContactNumberRef.current.value, detailsRef.current.value, selectedWorkerID, selectedDate);
        updateJobId(selectedWorkerID, props.id)
    }

    // handles delete button event
    const handleDelete = () => {
        deleteJob(props.id)
        deleteJobId(props.worker_id)
    }
    
    useEffect(() => {
        const getNamefromID = async (worker_id) => {
            const name = await API.getNamefromID(worker_id)
            await setWorkerFirstName(name.data[0].firstname)
            await setWorkerLastName(name.data[0].lastname)
        }

        // Making an array of employees to be used in a selection list
        const getUserList = async () => {
            let employeeList = [];
            const users = await API.getUserList();
            await users.data.forEach(name => {
                employeeList.push(`${name.firstname} ${name.lastname}`);
            });
            await setEmployees(employeeList);
        };

        getUserList()
        getNamefromID(props.worker_id);
    },[props.worker_id])

    return(
        <div className="row">
            <div className="col-12 jobCard">
                <div className="jobDate">
                    <strong>{props.deliveryDate}</strong>
                </div>
                <h2 className="jobTitle">{props.client}</h2>
                <div className="editJobBtns">
                    <button className="backBtn editBtn" onClick={handleEditOpen}>Edit</button>
                    <button className="backBtn deleteBtn" onClick={handleDeleteOpen}>Delete</button>
                </div>
                <strong>{(workerFirstName) ? <p style={{marginLeft: "20px", marginTop: "30px"}}>{workerFirstName} {workerLastName}</p> : <p>Unassigned</p>}</strong>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="editModal"
                open={editOpen}
                onClose={handleEditClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={editOpen}>
                <div className="modalPaper">
                <div className="col-12 loginForm" style={{border: "none"}}>
                <h2 className="jobCtitle">{props.address}</h2>
                    <hr></hr>
                    <form className="login">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                                <div className="form-group">
                                    <TextField fullWidth required inputRef={clientRef} label="Enter an Client/Job Name" width="100%" defaultValue={props.client}/>
                                </div>
                                <div className="form-group">
                                    <TextField fullWidth required inputRef={contactNameRef} label="Enter Contact Name" width="100%" defaultValue={props.contactName}/>
                                </div>
                                <div className="form-group">
                                    <TextField fullWidth required inputRef={contactNumberRef} label="Enter Contact Number" width="100%" defaultValue={props.contactNumber}/>
                                </div>
                                <div className="form-group">
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="age-native-simple">Choose a worker for the Job</InputLabel>
                                        <Select required labelId="demo-simple-select-label" style={{height:50, width:"100%"}} inputRef={selectedWorkerRef} defaultValue={userData.gender} onChange={handleChange}>
                                            <MenuItem value={`${workerFirstName} ${workerLastName}`}>{`${workerFirstName} ${workerLastName}`}</MenuItem>
                                            {employees.map((employee, key) => {
                                            return <MenuItem value={employee} key={key}>{employee}</MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="col-12 col-sm-12 col-md-12 col-lg-6">
                                <div className="form-group" style={{width:"100%"}}>
                                    <KeyboardDatePicker fullWidth required label="Please enter the date you want delivery" format="MM/dd/yyyy" value={selectedDate} onChange={handleDateChange} KeyboardButtonProps={{ 'aria-label': 'change date', }} defaultValue={props.deliveryDate}/>
                                </div>
                                <div className="form-group">
                                    <TextField fullWidth required inputRef={backupContactNameRef} label="Enter a Back up Contact Name" width="100%" defaultValue={props.backupContactName}/>
                                </div>
                                <div className="form-group">
                                    <TextField fullWidth required inputRef={backupContactNumberRef} label="Enter a Back up contact Number" width="100%" defaultValue={props.backupContactNumber}/>
                                </div>
                                <div className="form-group">
                                    <TextField fullWidth label="Enter any needed information including Exact time" multiline rows={4} inputRef={detailsRef} defaultValue={props.details}/>
                                </div>
                            </div>
                        </div>
                        <button onClick={submitHandler} className="submitBtn jobForm">Update Job</button>
                    </form>
                </div>
                </div>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="deleteModal"
                open={deleteOpen}
                onClose={handleDeleteClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={deleteOpen}>
                <div className="deletePaper">
                    <div className="">
                        <h2 id="transition-modal-title">Are you sure you want to delete?</h2>
                        <h5>{props.client}</h5>
                        <h6>{props.address}</h6>
                        <button className="backBtn deleteBtn" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                </Fade>
            </Modal>
        </div>

    )
}

export default EditJobComponent