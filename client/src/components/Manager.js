// This component is conditionally rendered if the signed in user has manager credientials, if not the driver component is rendered
// This is essentially the "Home Page" for managers
import React, { useState } from "react";
import ManagerHome from "../components/managerComponents/ManagerHome";
import JobCreation from "../components/managerComponents/JobCreation";
import DriverLocation from "../components/managerComponents/DriverLocation";
import EditJobs from "../components/managerComponents/EditJobs";
import ViewAllJobs from "../components/managerComponents/ViewAllJobs";

function Manager() {
    // We use page state to determine which sub-component is to be rendered inside the manager page
    const [page, setPage] = useState("");

    // Manager function navigation function
    const handlePageChange = (navPage) => {
        setPage(navPage)
    }

    const toRender = () => {
        switch (page) {
            case "":
                return <ManagerHome handlePageChange={handlePageChange}/>
            case "newJob":
                return <JobCreation handlePageChange={handlePageChange}/>
            case "driverLoc":
                return <DriverLocation handlePageChange={handlePageChange}/>
            case "driverStats":
                return <EditJobs handlePageChange={handlePageChange}/>
            case "allJobs":
                return <ViewAllJobs handlePageChange={handlePageChange}/>
            default:
                return <ManagerHome handlePageChange={handlePageChange}/>
        }
    }   
   
    return(
        <div>
            {toRender()}
        </div>
        
    )
}

export default Manager;