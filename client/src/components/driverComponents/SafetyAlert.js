import React from "react";

function SafetyAlert(props) {
    return(
        <div className="row">
            <button onClick={() => props.handlePageChange("")} className="backBtn">Back</button>
            <div className="col-12 heading">
                <h1>Safety Alert</h1>
            </div>
        </div>
    )
}

export default SafetyAlert