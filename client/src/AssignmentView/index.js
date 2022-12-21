import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import ajax from "../Services/fetchService";
import {Badge, Button} from "react-bootstrap";

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from "react-bootstrap/Container";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const AssignmentView = () => {
    const [jwt, setJwt] = useLocalState("", "jwt")
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState({
        branch: "",
        githubUrl: ""
    });
    const [assignmentEnums, setAssignmentEnums] = useState([]);

    function updateAssignment(prop, value) {
        const newAssignment = {...assignment};
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    function save() {
        ajax(`/api/assignments/${assignmentId}`, "PUT", jwt, assignment).then(
            assignmentData => {
                setAssignment(assignmentData);
            })
    }


    useEffect(() => {
        ajax(`/api/assignments/${assignmentId}`, "GET", jwt).then(assignmentResponse => {
            let assignmentData = assignmentResponse.assignment;
            if (assignmentData.branch === null)
                assignmentData.branch = "";
            if (assignmentData.githubUrl == null)
                assignmentData.githubUrl = "";
            setAssignment(assignmentData)
            setAssignmentEnums(assignmentResponse.assignmentEnums);
        });
    }, []);

    return (
        <Container className="mt-5">
            <Row className="d-flex align-items-center">
                <Col>
                    <h1>Assignment {assignmentId} </h1>
                </Col>
                <Col>
                    <Badge pill bg="danger" style={{fontSize: "1em"}}>{assignment.status}</Badge>
                </Col>
            </Row>
            {assignment ? (<>
                <Form.Group as={Row} className="my-4" controlId="formPlaintextEmail">
                    <Form.Label column sm="3" md="2">
                        Assignment Number:
                    </Form.Label>
                    <Col sm="9" md="8" lg="6">
                        <DropdownButton
                            as={ButtonGroup}
                            id="assignmentName"
                            variant={'secondary'}
                            title="Assignment 1"
                        >
                            {assignmentEnums.map(assignmentEnum => <Dropdown.Item
                                eventKey={assignmentEnum.assignmentNum}>{assignmentEnum.assignmentNum}</Dropdown.Item>)}
                        </DropdownButton>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="my-4" controlId="formPlaintextEmail">
                    <Form.Label column sm="3" md="2">
                        Github URL:
                    </Form.Label>
                    <Col sm="9" md="8" lg="6">
                        <Form.Control id="githubUrl"
                                      onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                                      type="url" placeholder="https://github.com/username/repo-name"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                    <Form.Label column sm="3" md="2">
                        Branch:
                    </Form.Label>
                    <Col sm="9" md="8" lg="6">
                        <Form.Control id="branch"
                                      type="text"
                                      placeholder="example branch name"
                                      onChange={(e) => updateAssignment("branch", e.target.value)}
                                      value={assignment.branch}/>
                    </Col>
                </Form.Group>
                <Button className="my-4" size="lg" variant="outline-success" onClick={() => save()}>Submit
                    Assignment</Button>

            </>) : (<></>)}

        </Container>
    );
};

export default AssignmentView;
