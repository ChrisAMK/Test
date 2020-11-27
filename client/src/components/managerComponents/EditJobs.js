import React, { useEffect, useState } from "react";
import EditJobComponent from "./EditJobComponent";
import API from "../../utils/API";

function EditJobs(props) {

    // setting up state
    const [ jobList, setJobList ] = useState([]);
    
    // when the component renders, we query the database and set the results to the state
    useEffect(() => {
        const getJobList = async () => {
            const response = await API.viewAllJobs()
            const jobs = response.data;
            setJobList(jobs)
        }


        getJobList();
    },[jobList])

    // Generates Job Components with the mapped info
    const generateJobList = (job, key) => {
        return (
            <EditJobComponent
                id={job.id}
                address={job.address}
                backupContactName={job.backupContactName}
                backupContactNumber={job.backupContactNumber}
                client={job.client}
                contactName={job.contactName}
                contactNumber={job.contactNumber}
                deliveryDate={job.deliveryDate}
                details={job.details}
                worker_id={job.worker_id}
                lat={job.lat}
                lng={job.lng}
                key={key}
            />
        )
    }

    return(
        <React.Fragment>
            <div className="row">
            <button onClick={() => props.handlePageChange("")} className="backBtn">Back</button>
                <div className="col-12 heading">
                    <h1>Edit Jobs</h1>
                </div>
                <div className="col-12">
                    {jobList.map((job, key) => (
                        generateJobList(job, key)
                    ))}
                </div>
            </div>
        </React.Fragment>
    )
}

export default EditJobs