import React, {useEffect, useRef, useState} from 'react';
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
import StatusBadge from "../StatusBadge";
import {useNavigate, useParams} from "react-router-dom";
import {useUser} from "../UserProvider";

const AssignmentView = () => {
    let navigate = useNavigate();
    const user = useUser();
    const {assignmentId} = useParams();
    // const assignmentId = window.location.href.split("/assignments/")[1];
    const [assignment, setAssignment] = useState({
        branch: "",
        githubUrl: "",
        number: null,
        status: null
    });
    const [assignmentEnums, setAssignmentEnums] = useState([]);
    const [assignmentStatuses, setAssignmentStatuses] = useState([]);
    const [comment, setComment] = useState({
        text: "",
        assignmentId: assignmentId != null ? parseInt(assignmentId) : null,
        user: user.jwt
    });
    const [comments, setComments] = useState([]);

    const prevAssignmentValue = useRef(assignment);

    function submitComment() {
        ajax('/api/comments', 'post', user.jwt, comment).then(commentData => {
            const commentsCopy = [...comments];
            commentsCopy.push(commentData);

            setComments(commentsCopy);
        })
    }

    useEffect(() => {
        ajax(`/api/comments?assignmentId=${assignmentId}`, "GET", user.jwt, null).then(
            (commentsData) => {
                setComments(commentsData)
            }
        );
    }, [])

    function updateComment(value) {
        const commentCopy = {...comment};
        commentCopy.text = value;
        setComment(commentCopy);
    }

    function updateAssignment(prop, value) {
        const newAssignment = {...assignment};
        newAssignment[prop] = value;
        setAssignment(newAssignment);
    }

    function save(status) {
        if (status && assignment.status !== status) {
            updateAssignment("status", status)
        } else {
            persist()
        }
    }

    function persist() {
        ajax(`/api/assignments/${assignmentId}`, "PUT", user.jwt, assignment).then(
            assignmentData => {
                setAssignment(assignmentData);
            })
    }

    useEffect(() => {
        if (prevAssignmentValue.current.status !== assignment.status) {
            persist()
        }
        prevAssignmentValue.current = assignment;
    }, [assignment]);


    useEffect(() => {
        ajax(`/api/assignments/${assignmentId}`, "GET", user.jwt).then(assignmentResponse => {
            let assignmentData = assignmentResponse.assignment;
            if (assignmentData.branch === null)
                assignmentData.branch = "";
            if (assignmentData.githubUrl == null)
                assignmentData.githubUrl = "";
            setAssignment(assignmentData)
            setAssignmentEnums(assignmentResponse.assignmentEnums);
            setAssignmentStatuses(assignmentResponse.statusEnums);
        });
    }, []);

    return (
        <Container className="mt-5">
            <Row className="d-flex align-items-center">
                <Col>
                    {assignment.number ? (
                        <h1>Assignment {assignment.number} </h1>
                    ) : (
                        <></>
                    )}
                </Col>
                <Col>
                    <StatusBadge text={assignment.status}/>
                </Col>
            </Row>
            {assignment ? (<>
                <Form.Group as={Row} className="my-4" controlId="assignmentName">
                    <Form.Label column sm="3" md="2">
                        Assignment Number:
                    </Form.Label>
                    <Col sm="9" md="8" lg="6">
                        <DropdownButton
                            as={ButtonGroup}
                            variant={'secondary'}
                            title={assignment.number ? `Assignment ${assignment.number}` : "Select an Assignment"}
                            onSelect={(selectedElement) => {
                                updateAssignment("number", selectedElement)

                            }}
                        >
                            {assignmentEnums.map(assignmentEnum =>
                                (<Dropdown.Item
                                    key={assignmentEnum.assignmentNum}
                                    eventKey={assignmentEnum.assignmentNum}>{assignmentEnum.assignmentNum}</Dropdown.Item>))}
                        </DropdownButton>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="my-4" controlId="githubUrl">
                    <Form.Label column sm="3" md="2">
                        Github URL:
                    </Form.Label>
                    <Col sm="9" md="8" lg="6">
                        <Form.Control
                            onChange={(e) => updateAssignment("githubUrl", e.target.value)}
                            type="url" placeholder="https://github.com/username/repo-name"/>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="branch">
                    <Form.Label column sm="3" md="2">
                        Branch:
                    </Form.Label>
                    <Col sm="9" md="8" lg="6">
                        <Form.Control
                            type="text"
                            placeholder="example branch name"
                            onChange={(e) => updateAssignment("branch", e.target.value)}
                            value={assignment.branch}/>
                    </Col>
                </Form.Group>

                {assignment.status === "Completed" ? (
                    <>
                        <Form.Group as={Row}
                                    className="d-flex align-items-center mb-3"
                                    controlId="codeReviewVideoUrl">
                            <Form.Label column sm="3" md="2">
                                Code Review Video URL:
                            </Form.Label>
                            <Col sm="9" md="8" lg="6">
                                <a href={assignment.codeReviewVideoUrl} style={{fontWeight: "bold"}}
                                >{assignment.codeReviewVideoUrl}</a>
                            </Col>
                        </Form.Group>
                        <div className="d-flex gap-5">
                            <Button size="lg" variant="secondary" onClick={() => navigate("/dashboard")}>
                                Back</Button>
                        </div>
                    </>
                ) : assignment.status === "Pending Submission" ? (
                    <div className="d-flex gap-5">
                        <Button size="lg" variant="outline-success" onClick={() => save("Submitted")}>Submit
                            Assignment</Button>
                        <Button size="lg" variant="secondary" onClick={() => navigate("/dashboard")}>
                            Back</Button>
                    </div>

                ) : (<div className="d-flex gap-5">
                    <Button size="lg" variant="outline-success" onClick={() => save("Resubmitted")}>Re-Submit
                        Assignment</Button>
                    <Button size="lg" variant="secondary" onClick={() => navigate("/dashboard")}>
                        Back</Button>
                </div>)
                }
                <div className="mt-5">
                    <textarea
                        style={{width: "100%", borderRadius: "0.25em"}}
                        onChange={(e) => updateComment(e.target.value)}>
                    </textarea>
                    <Button onClick={() => submitComment()}>Post Comment</Button>
                </div>
                <div className="mt-5">
                    {comments.map((comment) => (
                        <div>
                    <span style={{fontWeight: "bold"}}>
           {`[${comment.createdDate}] ${comment.createdBy.name}: `}
                    </span> {comment.text}
                        </div>))}
                </div>

            </>) : (<></>)}


        </Container>
    );
};

export default AssignmentView;
