import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "90vh", marginTop: "-5vh" }} 
    >
      <h1 className="text-center">Welcome to Employee Management System</h1>
      <p className="text-center">Manage employees efficiently with ease.</p>
      <Link to="/employees">
        <Button variant="primary">Go to Employee Management</Button>
      </Link>
    </Container>
  );
};

export default HomePage;
