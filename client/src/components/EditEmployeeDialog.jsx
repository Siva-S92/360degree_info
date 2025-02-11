import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { API_BASE_URL } from "../constant.js";
import { toast } from "react-toastify";

const EditEmployeeDialog = ({ open, employeeId, onClose, onUpdate }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/employees/${employeeId}`);
        setEmployee(response.data);
      } catch (err) {
        setError("Failed to fetch employee details.");
      } finally {
        setLoading(false);
      }
    };

    if (open && employeeId) {
      fetchEmployee();
    }
  }, [open, employeeId]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/employees/${employeeId}`, employee);
      onUpdate(); // Refresh employee table
      onClose(); // Close dialog
      toast.success("Employee details updated Successfully")
    } catch (err) {
      setError("Failed to update employee.");
      toast.success("Something went wrong while updating")
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Employee</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", paddingTop: "10px" }}>
            <TextField label="Name" name="name" value={employee?.name || ""} onChange={handleChange} fullWidth required />
            <TextField label="Email" name="email" value={employee?.email || ""} onChange={handleChange} fullWidth required />
            <TextField label="Phone" name="phone" value={employee?.phone || ""} onChange={handleChange} fullWidth required />
            <TextField label="Role" name="role" value={employee?.role || ""} onChange={handleChange} fullWidth required />
            <TextField label="Leaves" name="leaves" type="number" value={employee?.leaves || ""} onChange={handleChange} fullWidth required />
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="outlined">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployeeDialog;
