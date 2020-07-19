import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

export default function Home() {
  return (
    <div>
      <Jumbotron fluid style={{ background: "#0e101c", color: "white" }}>
        <Container>
          <h1>Welcome to LunchMate ...</h1>
          <p>... where you never need to eat lunch alone!</p>
        </Container>
      </Jumbotron>
    </div>
  );
}
