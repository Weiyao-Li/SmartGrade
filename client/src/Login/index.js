import React, {useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Button, Form} from "react-bootstrap";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [jwt, setJwt] = useLocalState("", "jwt");

    function sendLoginRequest() {
        const reqBody = {
            "username": username,
            "password": password
        };

        fetch("/api/auth/login", {
            headers: {"Content-Type": "application/json"},
            method: "POST",
            body: JSON.stringify(reqBody)
        }).then(response => {
            if (response.status === 200)
                return Promise.all([response.json(), response.headers]);
            else
                return Promise.reject("Invalid Login Attempt");
        })
            .then(([body, headers]) => {
                setJwt(headers.get("authorization"));
                window.location.href = "dashboard";
            }).catch((message) => {
            alert(message);
        });
    }

    return (
        <>
            <Container className="mt-5">
                <Row className="justify-content-center align-items-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label className="fs-4">Username</Form.Label>
                            <Form.Control type="email"
                                          size="lg"
                                          value={username}
                                          onChange={(e) => setUsername(e.target.value)}/>

                        </Form.Group>
                    </Col>
                </Row>

                <Row className="justify-content-center align-items-center">
                    <Col md="8" lg="6">
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className="fs-4">Password</Form.Label>
                            <Form.Control type="password" size="lg" value={password}
                                          onChange={(e) => setPassword(e.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="justify-content-center align-items-center">
                    <Col md="8" lg="6" className="mt-4  d-flex flex-column gap-5 flex-md-row justify-content-md-left">
                        <Button id="submit" type="button" size="lg" onClick={() => sendLoginRequest()}>Login</Button>
                        <Button variant="secondary" type="button" size="lg"
                                onClick={() => {
                                    window.location.href = "/";
                                }}>Exit</Button>
                    </Col>
                </Row>
            </Container>
        </>

    );
};

export default Login;
