import './App.css';
import {useEffect, useState} from "react";
import {useLocalState} from "./util/useLocalStorage";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import AssignmentView from "./AssignmentView";
import 'bootstrap/dist/css/bootstrap.min.css';
import CodeReviewerDashboard from "./CodeReviewerDashboard";
import jwt_decode from "jwt-decode";
import CodeReviewAssignmentView from "./CodeReviewAssignmentView";
import {UserProvider, useUser} from "./UserProvider";

function App() {
    const [roles, setRoles] = useState([]);
    const user = useUser();

    useEffect(() => {
        setRoles(getRolesFromJwt());
    }, [user.jwt]);

    function getRolesFromJwt() {
        if (user.jwt) {
            const decodedJwt = jwt_decode(user.jwt);
            return decodedJwt.authorities;
        }
        return [];
    }

    return (
        <Routes>
            <Route path="/dashboard"
                   element={
                       roles.find((role) => role === "ROLE_INSTRUCTOR") ? (
                           <PrivateRoute><CodeReviewerDashboard/></PrivateRoute>) : (
                           <PrivateRoute><Dashboard/></PrivateRoute>
                       )}
            />


            <Route path="/assignments/:assignmentId" element={
                roles.find((role) => role === "ROLE_INSTRUCTOR") ? (
                    <PrivateRoute><CodeReviewAssignmentView/></PrivateRoute>
                ) : (
                    <PrivateRoute><AssignmentView/></PrivateRoute>)}/>


            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Homepage/>}/>
        </Routes>

    );
}

export default App;
