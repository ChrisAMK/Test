// This component is rendered as the first component on the app, this allows the user to sign in to an existing account
// or create an account is need be
import React, { useRef } from "react";
import API from "../utils/API";
import TextField from "@material-ui/core/TextField";
// import WrappedMap from "../components/managerComponents/Map";


function Signin() {

    // capturing the value of the inputs with refs
    const emailRef = useRef("");
    const passwordRef = useRef("");
    
    // when the submit button is clicked the user's input is then given to our login user function that sends a post request to the database
    const submitHandler = (event) => {
        event.preventDefault();
        const userData = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        };
        // if a field is empty return out of the function
    if (!userData.email || !userData.password) {
        return;
    }

    // we passing the users input as parameters to the loginUser function and resetting the input fields
    loginUser(userData.email, userData.password);
    emailRef.current.value = "";
    passwordRef.current.value = "";

    }

    // defining the function for the submit handler
    const loginUser = (email, password) => {
        API.UserSignIn(email, password)
        .then(result => console.log(result))
        .catch(error => console.log(error));
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-1 col-md-1 col-lg-3"></div>
                <div className="col-10 col-sm-10 col-md-10 col-lg-6 loginForm">
                    <h2 className="loginTitle">Login Form</h2>
                    <form className="login">
                <div className="form-group">
                    <TextField variant="outlined" fullWidth required inputRef={emailRef} label="Enter Email" width="100%"/>
                </div>
                <div className="form-group">
                    <TextField variant="outlined" type="password" fullWidth required inputRef={passwordRef} label="Enter Password" width="100%"/>
                </div>
                <button onClick={submitHandler} className="submitBtn loginBtn">Login</button>
                    </form>
                    <br />
                    <p>Or sign up <a href="/signup">here</a></p>
                </div>
                <div className="col-1 col-md-1 col-lg-3"></div>
            </div>
        </div>
    )
}

export default Signin