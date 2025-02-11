import React, { useState } from "react";
import GoHome from "./GoHome";
import { API_BASE_URL } from "../constant";

const LeaveApplicationForm = () => {

  // Employee list for selection
  const employees = [
    { emp_id: 1, name: "Siva", email: "siva@gmail.com" },
    { emp_id: 2, name: "Ravi", email: "ravi@gmail.com" },
    { emp_id: 3, name: "Anitha", email: "anitha@gmail.com" },
    { emp_id: 4, name: "Ajay", email: "ajay@gmail.com" },
    { emp_id: 5, name: "Kavya", email: "kavya@gmail.com" },
    { emp_id: 6, name: "Priya", email: "priya@gmail.com" },
    { emp_id: 7, name: "Vijay", email: "vijay@gmail.com" },
    { emp_id: 8, name: "Latha", email: "latha@gmail.com" },
    { emp_id: 9, name: "Harish", email: "harish@gmail.com" },
    { emp_id: 10, name: "Suresh", email: "suresh@gmail.com" },
  ];

  // State to manage form data
  const [formData, setFormData] = useState({
    emp_id: "",
    from_date: "",
    to_date: "",
    leave_type: "",
    days: 0, // Default value
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Function to calculate leave days
  const calculateDays = (from_date, to_date) => {
    if (!from_date || !to_date) return 0;
    const startDate = new Date(from_date);
    const endDate = new Date(to_date);
    const timeDiff = endDate.getTime() - startDate.getTime();
    return timeDiff >= 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) + 1 : 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: value };

      // Auto-update days when from_date or to_date changes
      if (name === "from_date" || name === "to_date") {
        updatedForm.days = calculateDays(updatedForm.from_date, updatedForm.to_date);
      }

      return updatedForm;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError("");
    setSuccessMessage("");

    // Validate form fields
    if (!formData.emp_id || !formData.from_date || !formData.to_date || !formData.leave_type) {
      setError("All fields are required.");
      return;
    }

    if (formData.to_date < formData.from_date) {
      setError("End date cannot be before the start date.");
      return;
    }

    if (formData.days <= 0) {
      setError("Leave days must be at least 1.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/leaves`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit leave application");
      }

      setSuccessMessage("Leave application submitted successfully!");

      // Reset form after successful submission
      setFormData({
        emp_id: "",
        from_date: "",
        to_date: "",
        leave_type: "",
        days: 0,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="mt-5 text-center text-red-300 text-2xl font-bold">Apply Leave</h1>
      <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Employee Selection */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="emp_id">
              Select Employee
            </label>
            <select
              id="emp_id"
              name="emp_id"
              value={formData.emp_id}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee.emp_id} value={employee.emp_id}>
                  {employee.name} ({employee.email})
                </option>
              ))}
            </select>
          </div>

          {/* From Date */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="from_date">
              From Date
            </label>
            <input
              type="date"
              id="from_date"
              name="from_date"
              value={formData.from_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* To Date */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="to_date">
              To Date
            </label>
            <input
              type="date"
              id="to_date"
              name="to_date"
              value={formData.to_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Leave Type */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="leave_type">
              Type of Leave
            </label>
            <select
              id="leave_type"
              name="leave_type"
              value={formData.leave_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Vacation">Vacation</option>
            </select>
          </div>

          {/* Display Leave Days */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Total Leave Days</label>
            <p className="text-lg font-bold">{formData.days} days</p>
          </div>

          {/* Error & Success Messages */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"}`}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
      </div>

      <GoHome />
    </>
  );
};

export default LeaveApplicationForm;
