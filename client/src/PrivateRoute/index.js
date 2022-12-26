import React, {useContext, useState} from 'react';
import {useUser} from "../UserProvider";
import {Navigate} from "react-router-dom";
import ajax from "../Services/fetchService";


const PrivateRoute = (props) => {
    const user = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);
    const {children} = props

    if (user) {
        ajax(`/api/auth/validate?token=${user.jwt}`, "GET", user.jwt)
            .then(isValid => {
                setIsValid(isValid)
                setIsLoading(false)
            });
    } else {
        return <Navigate to="/login"/>;
    }
    return isLoading ? <div>Loading...</div> : isValid === true ? children : <Navigate to="/login"/>;
};

export default PrivateRoute;
