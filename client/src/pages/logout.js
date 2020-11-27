// Logout component is used to log the user out, it is rendered when the /signout route is hit
import React, { useContext } from "react";
import API from "../utils/API";
import UserProvider from "../utils/UserContext";

function Logout() {
    // accessing user data to display a goodbye message
    const userData = useContext(UserProvider.context);
    
    // log out handler uses the API to log the user out when the button is pressed
    const logOutHandler = () => {
        API.userLogOut()
            .catch(err => console.log(err))
    }

    return(
        <div className="row">
            <div className="col-2"></div>
            <div className="col-8 tAlert">
            <h1>Are you sure you want to log out {userData.fullname}</h1>
                <button onClick={logOutHandler} className="submitBtn">Click to log out</button>
            </div>
            <div className="col-2"></div>
        </div>
    )
}

export default Logout;