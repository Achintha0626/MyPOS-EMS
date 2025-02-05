import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/api";
import { Link } from "react-router-dom";
import { Table, Button, Form, Row, Col } from "react-bootstrap";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search filter
  const [showActive, setShowActive] = useState(true); // State for toggle filter

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = async (empNo) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await deleteEmployee(empNo);
      fetchEmployees(); // Refresh list
    }
  };

  // Filter employees based on search and active/inactive toggle
  const filteredEmployees = employees.filter((emp) => {
    return (
      emp.empName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      emp.isActive === showActive
    );
  });

  return (
    <div className="container mt-4">
      <h2>Employee List</h2>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <Form.Check
            type="switch"
            id="active-toggle"
            label={
              showActive
                ? "Showing Active Employees"
                : "Showing Inactive Employees"
            }
            checked={showActive}
            onChange={() => setShowActive(!showActive)}
          />
        </Col>
      </Row>

      <Link to="/add" className="btn btn-primary mb-3">
        Add Employee
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee No</th>
            <th>Name</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp) => (
              <tr key={emp.empNo}>
                <td>{emp.empNo}</td>
                <td>{emp.empName}</td>
                <td>{emp.departmentCode}</td>
                <td>{emp.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <Link
                    to={`/details/${emp.empNo}`}
                    className="btn btn-info btn-sm me-2"
                  >
                    Details
                  </Link>
                  <Link
                    to={`/edit/${emp.empNo}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(emp.empNo)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeList;
