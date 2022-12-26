import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import {Badge, Button, Card} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import StatusBadge from "../StatusBadge";
import {useNavigate} from "react-router-dom";
import {useUser} from "../UserProvider";


const Dashboard = () => {
    const navigate = useNavigate();
    const user = useUser();
    const [assignments, setAssignments] = useState(null);

    useEffect(() => {
        ajax("api/assignments", "GET", user.jwt).then(assignmentsData => {
            setAssignments(assignmentsData);
        })
    }, [user.jwt]);


    function createAssignment() {
        ajax("api/assignments", "POST", user.jwt).then(assignment => {
            window.location.href = `/assignments/${assignment.id}`;
        });
    }

    return (
        <div style={{marginTop: "2em"}}>
            <Row>
                <Col>
                    <div
                        className="d-flex justify-content-end"
                        style={{cursor: "pointer"}}
                        onClick={() => {
                            user.setJwt(null);
                            navigate("/login");
                        }}>
                        Logout
                    </div>
                </Col>
            </Row>
            <div className="mb-5 text-center">
                <Button variant="outline-success" size="lg" onClick={() => createAssignment()}>Submit New
                    Assignment</Button>
            </div>
            {assignments ? (
                <div className="d-grid gap-5" style={{gridTemplateColumns: "repeat(auto-fit, 18rem)"}}>
                    {assignments.map(assignment => (
                        <Card key={assignment.id}
                              style={{width: '18rem', height: '18rem'}}>
                            <Card.Body className="d-flex flex-column justify-content-around">
                                <Card.Title>Assignment #{assignment.number}</Card.Title>
                                <div className="d-flex align-items-start">
                                    <StatusBadge text={assignment.status}/>
                                </div>
                                <Card.Text style={{marginTop: '1em'}}>
                                    <p><b>Github URL:</b> {assignment.githubUrl}</p>
                                    <p><b>Branch: </b>{assignment.branch}</p>
                                </Card.Text>

                                <Button
                                    variant="outline-primary"
                                    onClick={() => {
                                        window.location.href = `/assignments/${assignment.id}`;
                                    }}
                                >Edit</Button>

                            </Card.Body>
                        </Card>

                    ))}
                </div>
            ) : (
                <></>
            )}

        </div>
    );
};

export default Dashboard;
