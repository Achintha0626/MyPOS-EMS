import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage";
import AddEditEmployee from "./pages/AddEditEmployee";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import { Container } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent";

const App = () => {
  return (
    <>
      <NavbarComponent />
      <Container className="mt-3">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/add" element={<AddEditEmployee />} />
          <Route path="/edit/:empNo" element={<AddEditEmployee />} />
          <Route path="/details/:empNo" element={<EmployeeDetailsPage />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
