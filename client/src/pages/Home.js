import React, { useContext, useEffect, useState } from "react";
import Driver from "../components/Driver";
import Manager from "../components/Manager";
import AuthError from "../components/AuthError";
import UserProvider from "../utils/UserContext";

function Home() {

    // setting state for if the user is logged in and if the user has manager credentials
    const [ isManager, setIsManager ] = useState(false);
    const [ isLoggedIn, setIsLoggedIn ] = useState("");

    // Grabbing the information from the user provider context to be used for the promises
    const userData = useContext(UserProvider.context);

    // When this component is rendered we are checking if the user is a manager or a driver in promises
    useEffect(() => {
        let userPromise = new Promise((resolve, reject) => {
            let promiseValue = userData.email;
            if (promiseValue) {
                resolve(true)
            } else {
                reject("")
            }
        })

        let managerPromise = new Promise((resolve, reject) => {
            let promiseValue = userData.isManager;
            if (promiseValue === true) {
                resolve(promiseValue)
            } else {
                reject("")
            }
        })

        // If we are a user we set the state as authentication
        userPromise
        .then(data => setIsLoggedIn(data))
        .catch(error => console.log(error))

        managerPromise
        .then(data => setIsManager(data))
        .catch(error => console.log(error))
        
    }, [userData])

    // Creating new Promises that check if the user is signed in, once the promise recieves the user information from the global context
    // then the promise resolves with a value of true
    let canvas = <div>I am loading</div>

    // Authentication if statement chooses to render either the Manager component or Driver component depending on the user's credentials
    if (isLoggedIn === true && isManager === true) {
        canvas = <Manager isAuthM={true}/>
    } else if (isLoggedIn === true) {
        canvas = <Driver isAuthD={true}/>
    } else {
        canvas = <AuthError />
    }
    
    // We rendering the place-holder canvas variable that will change
    return(
        <div>
            {canvas}
        </div>
    )
}

export default Home;