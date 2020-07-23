import React, { useState } from "react";
import { Jumbotron, Container, Form, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Flatpickr from "react-flatpickr";
import verify from "../ultils/verify";
import "flatpickr/dist/themes/airbnb.css";

const API = process.env.REACT_APP_BACKEND;

export default function Home() {
  const token = useSelector((state) => state.token);
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("AL");
  const [zipCode, setZip] = useState("");
  const sendForm = async (formData) => {
    try {
      let url = API + "/meeting/new";
      const data = await fetch(url, {
        method: "POST",
        headers: {
          "x-access-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const response = await data.json();
      alert("Create new meeting successfully!");
    } catch (error) {
      alert("Some errors happened. Please contact support.");
    }
  };
  const submitForm = async (e) => {
    e.preventDefault();
    let message = "";
    if (!date || !address || !city || !state || !zipCode) {
      message += "Missing fields!";
      alert(message);
      return;
    }
    let check = await verify(address, address2, city, state, zipCode);
    if (check.length === 0) {
      alert("Address is invalid!");
      return;
    }
    let location;
    if (!address2) {
      location = `${address.trim()}, ${city.trim()} ${state.trim()}, ${zipCode.trim()}`;
    } else {
      location = `${address.trim()} ${address2.trim()}, ${city.trim()} ${state.trim()}, ${zipCode.trim()}`;
    }
    const formData = { location, dateAndTime: date };
    sendForm(formData);
  };
  return (
    <div>
      <Jumbotron fluid style={{ background: "#0e101c", color: "white" }}>
        <Container>
          <h1>Welcome to LunchMate ...</h1>
          <p>... where you never need to eat lunch alone!</p>
        </Container>
      </Jumbotron>
      <Container style={{ maxWidth: "500px" }}>
        <Form>
          <Form.Group className="d-flex flex-column">
            <Form.Label>Date and Time</Form.Label>
            <Flatpickr
              data-enable-time
              value={date}
              options={{
                dateFormat: "l, F j, Y at h:i K",
                minDate: "today",
              }}
              onChange={(date) => setDate(date)}
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="1234 Main St"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGridAddress2">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              type="text"
              placeholder="Apartment, studio, or floor"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control
                as="select"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="number"
                value={zipCode}
                onChange={(e) => setZip(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => submitForm(e)}
          >
            Setup Meeting
          </Button>
        </Form>
      </Container>
    </div>
  );
}
