// This component is conditionally rendered if the signed in user has manager credientials, if not the driver component is rendered
// This is essentially the "Home Page" for managers
import React, { useState } from "react";
import CurrentJobDetails from "./driverComponents/CurrentJobDetails";
import SafetyAlert from "./driverComponents/SafetyAlert";
import UpdateDetails from "./driverComponents/UpdateDetails";
import ViewPastTrips from "./driverComponents/ViewPastTrips";
import DriverHome from "./driverComponents/DriverHome";

function Driver() {
    // We use page state to determine which sub-component is to be rendered inside the manager page
    const [page, setPage] = useState("");

    // Manager function navigation function
    const handlePageChange = (navPage) => {
        setPage(navPage)
    }

    const toRender = () => {
        switch (page) {
            case "":
                return <DriverHome handlePageChange={handlePageChange}/>
            case "currentjob":
                return <CurrentJobDetails handlePageChange={handlePageChange}/>
            case "safety":
                return <SafetyAlert handlePageChange={handlePageChange}/>
            case "updatestats":
                return <UpdateDetails handlePageChange={handlePageChange}/>
            case "viewtrips":
                return <ViewPastTrips handlePageChange={handlePageChange}/>
            default:
                return <DriverHome handlePageChange={handlePageChange}/>
        }
    }   
   


    return(
        <div>
            {toRender()}
        </div>
        
    )
}

export default Driver;