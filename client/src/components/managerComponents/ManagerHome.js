import React from "react";

function ManagerHome(props) {
    return(
        <React.Fragment>
        <div className="row topRow">
            <div className="col-1"></div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-4 managerPanel" onClick={() => props.handlePageChange("newJob")}>
                <h2 className="actionTitles">Create a new Job</h2>
                <img src={require("../../assets/newjob.png")} className="menuIcon" alt="icon"></img>
            </div>
            <div className="col-1"></div>
            <div className="col-1"></div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-4 managerPanel" onClick={() => props.handlePageChange("driverLoc")}>
                <h2 className="actionTitles">View Driver Location</h2>
                <img src={require("../../assets/location.png")} className="menuIcon" alt="icon"></img>
            </div>
            <div className="col-1"></div>
        </div>
        <div className="row">
            <div className="col-1"></div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-4 managerPanel" onClick={() => props.handlePageChange("driverStats")}>
                <h2 className="actionTitles">Edit Jobs</h2>
                <img src={require("../../assets/stats.png")} className="menuIcon" alt="icon"></img>
            </div>
            <div className="col-1"></div>
            <div className="col-1"></div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-4 managerPanel" onClick={() => props.handlePageChange("allJobs")}>
                <h2 className="actionTitles">View All Jobs</h2>
                <img src={require("../../assets/viewjobs.png")} className="menuIcon" alt="icon"></img>
            </div>
            <div className="col-1"></div>
        </div>
    </React.Fragment>
    )
}
    
export default ManagerHome;