import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Button } from "react-bootstrap";

const API = process.env.REACT_APP_BACKEND;

export default function Profile() {
  const [user, setUser] = useState(null);
  const token = useSelector((state) => state.token);
  let history = useHistory();
  const redirectToUpdate = () => {
    history.push("/update");
  };

  const fetchData = async () => {
    let url = API + "/users/me";
    const newUser = await fetch(url, {
      method: "GET",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
    });
    if (newUser.ok) {
      const result = await newUser.json();
      const data = result.data;
      console.log(data);
      setUser(data);
    } else {
      alert("Some errors happened. Please contact support.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!user) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div>
      <Container
        className="border border-dark mt-4 p-5"
        style={{ maxWidth: "500px" }}
      >
        <Row>
          <h5>Welcome {user.name}!</h5>
        </Row>
        <Row>
          <h5>Age: {user.age}</h5>
        </Row>
        <Row>
          <h5>Email: {user.email}</h5>
        </Row>
        <Row>
          <h5>
            Tags:
            <ul>
              {user.tags.map((e, index) => {
                return <li key={index}>{e.tag}</li>;
              })}
            </ul>
          </h5>
        </Row>
        <Row>
          <Button onClick={() => redirectToUpdate()}>
            Update my information!
          </Button>
        </Row>
      </Container>
    </div>
  );
}
