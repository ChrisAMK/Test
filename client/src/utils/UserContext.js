import React, { createContext, useState, useEffect } from "react";
const context = createContext();

// setting up state that will be sent to every component that is wrapped by the provider
const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    // when the component is rendered, we perform a fetch request for the users data then set the set with the results
    useEffect(() => {
        fetch("/api/user_data")
            .then(res => res.json())
            .then(res => setUser(res))
            .catch(err => console.log(err))
// eslint-disable-next-line
    }, []);

    return (
        <context.Provider value={user}>
            {children}
        </context.Provider>
    );
};

UserProvider.context = context;

export default UserProvider;