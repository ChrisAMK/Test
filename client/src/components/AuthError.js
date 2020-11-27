import React from "react";

function AuthError() {

    const goToLogIn = () => {
        window.location.replace("/")
    }

    return(
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8 tAlert">
                <h1>You are not Logged in!</h1>
                <h3>Click here to log in</h3>
                <button onClick={goToLogIn} className="submitBtn">CLICK ME</button>
            </div>
            <div className="col-2"></div>
        </ div>
    )
}

export default AuthError