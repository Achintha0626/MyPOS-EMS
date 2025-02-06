import axios from "axios";

const API_TOKEN = "?D(G+KbPeSgVkYp3s6v9y$B&E)H@McQf"; // API Key from Swagger

const api = axios.create({
  baseURL: "/api/v1.0", // Proxy handles full URL
  headers: {
    "Content-Type": "application/json",
    apiToken: API_TOKEN, // Pass API Key in Headers (not URL)
  },
});

// ✅ Fetch all employees
export const getEmployees = async () => {
  try {
    const response = await api.get("/Employees");
    return response;
  } catch (error) {
    console.error(
      "Error fetching employees:",
      error.response?.data || error.message
    );
    return { data: [] };
  }
};

// ✅ Fetch a single employee by empNo
export const getEmployeeById = async (empNo) => {
  try {
    const response = await api.get(`/Employee/${empNo}`);
    return response;
  } catch (error) {
    console.error(
      `Error fetching employee ${empNo}:`,
      error.response?.data || error.message
    );
    return null;
  }
};

// ✅ Add a new employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await api.post("/Employee", employeeData);
    return response;
  } catch (error) {
    console.error(
      "Error adding employee:",
      error.response?.data || error.message
    );
    return null;
  }
};

// ✅ Update an existing employee
export const updateEmployee = async (employeeData) => {
  try {
    const response = await api.put("/Employee", employeeData);
    return response;
  } catch (error) {
    console.error(
      "Error updating employee:",
      error.response?.data || error.message
    );
    return null;
  }
};

// ✅ Delete an employee
export const deleteEmployee = async (empNo) => {
  try {
    console.log("🔴 Attempting DELETE request for employee:", empNo);

    const response = await api.delete(`/Employee/${empNo}`); // ⬅️ Ensure this API call is correct

    console.log("🟢 API Response from DELETE request:", response);

    return response; // Ensure it returns the response
  } catch (error) {
    console.error(
      "🚨 DELETE API call failed:",
      error.response?.data || error.message
    );
    return null;
  }
};



// ✅ Fetch all departments for dropdown
export const getDepartments = async () => {
  try {
    const response = await api.get("/Departments");
    return response;
  } catch (error) {
    console.error(
      "Error fetching departments:",
      error.response?.data || error.message
    );
    return { data: [] };
  }
};
