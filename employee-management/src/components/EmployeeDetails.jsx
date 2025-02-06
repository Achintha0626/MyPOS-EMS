import React, { useEffect, useState } from "react";
import { getEmployeeById } from "../services/api";
import { Form, Container, Row, Col, Card } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io"; // ✅ Import back arrow

const EmployeeDetailsPage = () => {
  const { empNo } = useParams();
  const navigate = useNavigate();
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
    fetchEmployee();
  }, [empNo]);

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
      console.error("Error fetching employee details:", error);
    }
  };

  return (
    <Container className="mt-4">
      {/* 🔙 Back Button */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <IoMdArrowRoundBack
          size={30}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/employees")} // ✅ Navigate back
        />
        <h2 style={{ marginLeft: "10px" }}>Employee Details</h2>
      </div>

      <Card className="shadow-lg p-4 mt-3">
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Employee No</Form.Label>
                  <Form.Control type="text" value={employee.empNo} disabled />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control type="text" value={employee.empName} disabled />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={employee.dateOfBirth}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Date of Joining</Form.Label>
                  <Form.Control
                    type="date"
                    value={employee.dateOfJoin}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Address Line 1</Form.Label>
                  <Form.Control
                    type="text"
                    value={employee.empAddressLine1}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Address Line 2 (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    value={employee.empAddressLine2}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
                  <Form.Label>Address Line 3 (Optional)</Form.Label>
                  <Form.Control
                    type="text"
                    value={employee.empAddressLine3}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Department</Form.Label>
                  <Form.Control
                    type="text"
                    value={employee.departmentCode}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Basic Salary</Form.Label>
                  <Form.Control
                    type="number"
                    value={employee.basicSalary}
                    disabled
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EmployeeDetailsPage;
