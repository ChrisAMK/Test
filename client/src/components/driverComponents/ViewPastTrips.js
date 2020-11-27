import React from "react";

function ViewPastTrips(props) {
    return (
        <div className="row">
            <button onClick={() => props.handlePageChange("")} className="backBtn">Back</button>
            <div className="col-12 heading">
                <h1>View Past Trips</h1>
            </div>
        </div>
    )
}

export default ViewPastTrips