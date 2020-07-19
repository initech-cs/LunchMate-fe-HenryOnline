import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import * as EmailValidator from "email-validator";
import TagsInput from "react-tagsinput";

const API = process.env.REACT_APP_BACKEND;

export default function Register() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [tags, setTags] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const sendForm = async (formData) => {
    let url = API + "/auth/register";
    const newUser = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (newUser.ok) {
      alert("Account created successfully!");
    } else {
      alert("Some errors happened. Please contact support.");
    }
  };
  const submitForm = (e) => {
    let errors = {
      name: "",
      age: "",
      tags: "",
      email: "",
      password: "",
    };
    let message = "";
    e.preventDefault();
    let check = false;
    if (!name) {
      errors["name"] = "Name is required.";
      message += errors["name"] + "\r\n";
      check = true;
    }
    if (age < 18 || age > 99) {
      errors["age"] = "Age must be between 18 and 99.";
      message += errors["age"] + "\r\n";
      check = true;
    }
    if (tags.length === 0) {
      errors["tags"] = "Interests are required.";
      message += errors["tags"] + "\r\n";
      check = true;
    }
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
      const formData = { name, age, tags, email, password };
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
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <label className="labelTagsInput">Interests</label>
                <TagsInput value={tags} onChange={setTags} />
              </Form.Group>
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
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => submitForm(e)}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
