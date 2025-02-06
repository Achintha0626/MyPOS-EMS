import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EmployeePage from "./pages/EmployeePage";
import AddEditEmployee from "./pages/AddEditEmployee";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import { Container } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent";
import LoaderComponent from "./components/LoaderComponent"; // Import Loader

const App = () => {
  const location = useLocation();
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    setLoadingPage(true);
    const timer = setTimeout(() => setLoadingPage(false), 800); // Simulate page transition loading
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loadingPage && <LoaderComponent loading={loadingPage} />}{" "}
      {/* Show loader only for page transitions */}
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
