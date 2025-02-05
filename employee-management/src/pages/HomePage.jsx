import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container className="text-center mt-5">
      <h1>Welcome to Employee Management System</h1>
      <p>Manage employees efficiently with ease.</p>
      <Link to="/employees">
        <Button variant="primary">Go to Employee Management</Button>
      </Link>
    </Container>
  );
};

export default HomePage;
