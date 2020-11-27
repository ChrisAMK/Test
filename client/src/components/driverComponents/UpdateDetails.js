import React from "react";

function UpdateDetails(props) {
    return(
        <div className="row">
            <button onClick={() => props.handlePageChange("")} className="backBtn">Back</button>
            <div className="col-12 heading">
                <h1>Update Details</h1>
            </div>
        </div>
    )
}

export default UpdateDetails