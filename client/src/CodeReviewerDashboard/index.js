import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import {Badge, Button, Card} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import jwt_decode from "jwt-decode";

const CodeReviewerDashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);

    function claimAssignment(assignment) {
        const decodedJwt = jwt_decode(jwt);
        const user = {
            username: decodedJwt.sub,
            authorities: decodedJwt.authorities

        }
        assignment.codeReviewer = user;
        assignment.status = "In Review";
        ajax(`/api/assignments/${assignment.id}`, "PUT", jwt, assignment).then(updatedAssignment => {
            const assignmentsCopy = [...assignments];
            const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
            assignmentsCopy[i] = updatedAssignment;
            setAssignments(assignmentsCopy);

        })
    }


    useEffect(() => {
        ajax("api/assignments", "GET", jwt).then(assignmentsData => {
            setAssignments(assignmentsData);
        })
    }, [jwt]);

    return (
        <Container>
            <Row>
                <Col>
                    <div
                        className="d-flex justify-content-end"
                        style={{cursor: "pointer"}}
                        onClick={() => {
                            setJwt(null);
                            window.location.href = "/login";
                        }}>
                        Logout
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="h1">Code Reviewer Dashboard</div>
                </Col>
            </Row>
            <div className="assignment-wrapper in-review">
                <div className="assignment-wrapper-title h3 px-2">In Review</div>
                {assignments && assignments.filter(assignment => assignment.status === "In Review").length > 0 ?
                    (<div className="d-grid gap-5" style={{gridTemplateColumns: "repeat(auto-fit, 18rem)"}}>
                            {assignments.filter((assignment) => assignment.status === "In Review").map(assignment => (
                                <Card key={assignment.id}
                                      style={{width: '18rem', height: '18rem'}}>
                                    <Card.Body className="d-flex flex-column justify-content-around">
                                        <Card.Title>Assignment #{assignment.number}</Card.Title>
                                        <div className="d-flex align-items-start">
                                            <Badge pill bg="info" style={{fontSize: "1em"}}>{assignment.status}</Badge>
                                        </div>
                                        <Card.Text style={{marginTop: '1em'}}>
                                            <p><b>Github URL:</b> {assignment.githubUrl}</p>
                                            <p><b>Branch: </b>{assignment.branch}</p>
                                        </Card.Text>

                                        <Button
                                            variant="outline-primary"
                                            onClick={() => {
                                                claimAssignment(assignment);
                                            }}
                                        >Claim</Button>

                                    </Card.Body>
                                </Card>

                            ))}
                        </div>
                    ) : (
                        <div>No Assignments Found</div>
                    )}
            </div>


            <div className="assignment-wrapper submitted">
                <div className="assignment-wrapper-title h3 px-2">Awaiting Review</div>

                {assignments && assignments.filter(assignment => assignment.status === "Submitted").length > 0 ? (
                    <div className="d-grid gap-5" style={{gridTemplateColumns: "repeat(auto-fit, 18rem)"}}>
                        {assignments.filter(assignment => assignment.status === "Submitted").map(assignment => (
                            <Card key={assignment.id}
                                  style={{width: '18rem', height: '18rem'}}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                                    <div className="d-flex align-items-start">
                                        <Badge pill bg="info" style={{fontSize: "1em"}}>{assignment.status}</Badge>
                                    </div>
                                    <Card.Text style={{marginTop: '1em'}}>
                                        <p><b>Github URL:</b> {assignment.githubUrl}</p>
                                        <p><b>Branch: </b>{assignment.branch}</p>
                                    </Card.Text>

                                    <Button
                                        variant="outline-primary"
                                        onClick={() => {
                                            claimAssignment(assignment);
                                        }}
                                    >Claim</Button>

                                </Card.Body>
                            </Card>

                        ))}
                    </div>
                ) : (
                    <div>No Assignments Found</div>
                )}
            </div>
            <div className="assignment-wrapper needs-update">

                <div className="assignment-wrapper-title h3 px-2">Needs Update</div>

                {assignments && assignments.filter(assignment => assignment.status === "Needs Update").length > 0 ? (
                    <div className="d-grid gap-5" style={{gridTemplateColumns: "repeat(auto-fit, 18rem)"}}>
                        {assignments.filter(assignment => assignment.status === "Needs Update").map(assignment => (
                            <Card key={assignment.id}
                                  style={{width: '18rem', height: '18rem'}}>
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>Assignment #{assignment.number}</Card.Title>
                                    <div className="d-flex align-items-start">
                                        <Badge pill bg="info" style={{fontSize: "1em"}}>{assignment.status}</Badge>
                                    </div>
                                    <Card.Text style={{marginTop: '1em'}}>
                                        <p><b>Github URL:</b> {assignment.githubUrl}</p>
                                        <p><b>Branch: </b>{assignment.branch}</p>
                                    </Card.Text>

                                    <Button
                                        variant="outline-primary"
                                        onClick={() => {
                                            claimAssignment(assignment);
                                        }}
                                    >Claim</Button>

                                </Card.Body>
                            </Card>

                        ))}
                    </div>
                ) : (
                    <div>No Assignments Found</div>
                )}
            </div>


        </Container>
    );
};

export default CodeReviewerDashboard;
