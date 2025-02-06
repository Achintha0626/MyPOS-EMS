import React, { useEffect, useState } from "react";
import {
  addEmployee,
  updateEmployee,
  getDepartments,
  getEmployeeById,
} from "../services/api";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io"; 

const EmployeeForm = () => {
  const { empNo } = useParams();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(""); 

  const [employee, setEmployee] = useState({
    empNo: "",
    empName: "",
    empAddressLine1: "",
    empAddressLine2: "",
    empAddressLine3: "",
    departmentCode: "",
    dateOfJoin: "",
    dateOfBirth: "",
    basicSalary: "",
    isActive: true,
  });

  useEffect(() => {
    fetchDepartments();
    if (empNo) {
      fetchEmployee();
    }
  }, [empNo]);

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments();
      if (response.data && response.data.length > 0) {
        setDepartments(response.data);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchEmployee = async () => {
    try {
      const response = await getEmployeeById(empNo);
      let empData = response.data;
      empData.dateOfBirth = empData.dateOfBirth
        ? empData.dateOfBirth.split("T")[0]
        : "";
      empData.dateOfJoin = empData.dateOfJoin
        ? empData.dateOfJoin.split("T")[0]
        : "";
      setEmployee(empData);
    } catch (error) {
      console.error("Error fetching employee:", error);
    }
  };

  
  const validateDateOfJoining = (dob, doj) => {
    if (!dob || !doj) return;

    const birthDate = new Date(dob);
    const joinDate = new Date(doj);

    const minJoinDate = new Date(dob);
    minJoinDate.setFullYear(minJoinDate.getFullYear() + 1); // Must be 1 year after DOB

    if (joinDate < minJoinDate) {
      setError("Add Valid date");
    } else {
      setError(""); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !employee.empNo ||
      !employee.empName ||
      !employee.empAddressLine1 ||
      !employee.departmentCode ||
      !employee.dateOfJoin ||
      !employee.dateOfBirth ||
      !employee.basicSalary
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (error) {
      alert(error);
      return;
    }

    if (empNo) {
      await updateEmployee(employee);
    } else {
      await addEmployee(employee);
    }

    navigate("/employees");
  };

  return (
    <Container className="mt-4">
      
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <IoMdArrowRoundBack
          size={30}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/employees")} // ✅ Navigate to Employee List
        />
        <h2 style={{ marginLeft: "10px" }}>
          {empNo ? "Edit Employee" : "Add Employee"}
        </h2>
      </div>

      <Card className="shadow-lg p-4 mt-3">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Employee No</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength="15"
                    required
                    value={employee.empNo}
                    onChange={(e) =>
                      setEmployee({ ...employee, empNo: e.target.value })
                    }
                    disabled={!!empNo}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength="50"
                    required
                    value={employee.empName}
                    onChange={(e) =>
                      setEmployee({ ...employee, empName: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    value={employee.dateOfBirth}
                    onChange={(e) => {
                      setEmployee({ ...employee, dateOfBirth: e.target.value });
                      validateDateOfJoining(
                        e.target.value,
                        employee.dateOfJoin
                      );
                    }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date of Joining</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    value={employee.dateOfJoin}
                    onChange={(e) => {
                      setEmployee({ ...employee, dateOfJoin: e.target.value });
                      validateDateOfJoining(
                        employee.dateOfBirth,
                        e.target.value
                      );
                    }}
                  />
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength="80"
                    required
                    value={employee.empAddressLine1}
                    onChange={(e) =>
                      setEmployee({
                        ...employee,
                        empAddressLine1: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Address Line 2 (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength="80"
                    value={employee.empAddressLine2}
                    onChange={(e) =>
                      setEmployee({
                        ...employee,
                        empAddressLine2: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Address Line 3 (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    maxLength="80"
                    value={employee.empAddressLine3}
                    onChange={(e) =>
                      setEmployee({
                        ...employee,
                        empAddressLine3: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    required
                    value={employee.departmentCode || ""}
                    onChange={(e) =>
                      setEmployee({
                        ...employee,
                        departmentCode: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option
                        key={dept.departmentCode}
                        value={dept.departmentCode}
                      >
                        {dept.departmentName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Basic Salary</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    value={employee.basicSalary}
                    onChange={(e) =>
                      setEmployee({ ...employee, basicSalary: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

           
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="Active"
                    checked={employee.isActive}
                    onChange={(e) =>
                      setEmployee({ ...employee, isActive: e.target.checked })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center mt-3">
              <Button variant="primary" type="submit" disabled={error}>
                {empNo ? "Update Employee" : "Add Employee"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmployeeForm;
