import React from "react";

function DriverHome(props) {
    return(
        <React.Fragment>
        <div className="row topRow">
            <div className="col-1"></div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-4 driverPanel" onClick={() => props.handlePageChange("currentjob")}>
                <h2 className="actionTitles">View Current Trip</h2>
                <img src={require("../../assets/wheel.png")} className="menuIcon" alt="icon"></img>
            </div>
            <div className="col-1"></div>
            <div className="col-1"></div>
            <div className="col-10 col-sm-10 col-md-10 col-lg-4 driverPanel" onClick={() => props.handlePageChange("safety")}>
                <h2 className="actionTitles">Latest Safety News</h2>
                <img src={require("../../assets/newjob.png")} className="menuIcon" alt="icon"></img>
            </div>
            <div className="col-1"></div>
        </div>
    </React.Fragment>
    )
}

export default DriverHome;