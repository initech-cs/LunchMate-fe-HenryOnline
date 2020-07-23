import React, { useState } from "react";
import * as EmailValidator from "email-validator";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

const API = process.env.REACT_APP_BACKEND;

export default function Login() {
  let history = useHistory();
  let dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sendForm = async (formData) => {
    try {
      let url = API + "/auth/login";
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await data.json();
      localStorage.setItem("token", JSON.stringify(result.data.token));
      dispatch({ type: "LOGIN", payload: result.data.token });
      alert("Login successfully");
      history.push("/profile");
    } catch (error) {
      alert("Some errors happened. Please contact support.");
    }
  };
  const submitForm = (e) => {
    let errors = {
      email: "",
      password: "",
    };
    let message = "";
    e.preventDefault();
    let check = false;
    if (!EmailValidator.validate(email)) {
      errors["email"] = "Email is invalid.";
      message += errors["email"] + "\r\n";
      check = true;
    }
    if (password.length < 6) {
      errors["password"] = "Password has to contain at least 6 characters.";
      message += errors["password"];
      check = true;
    }
    if (check) {
      alert(message);
    } else {
      const formData = { email, password };
      sendForm(formData);
    }
  };
  return (
    <div>
      <Container className="mt-4 p-3" style={{ maxWidth: "500px" }}>
        <Row className="d-flex flex-column justify-content-center align-items-center">
          <h1>LunchMate</h1>
          <img
            src="/images/icon.jpg"
            style={{ width: "100px" }}
            alt="LunchMate icon"
          ></img>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="d-flex flex-row justify-content-space-between">
                <Link to="/register">Create an account</Link>
                <Button
                  className="ml-auto"
                  variant="primary"
                  type="submit"
                  onClick={(e) => submitForm(e)}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
