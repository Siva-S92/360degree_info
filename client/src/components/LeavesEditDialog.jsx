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

const LeavesEditDialog = ({ open, leaveId, onClose, onUpdate }) => {
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeave = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`${API_BASE_URL}/leaves/${leaveId}`);
        setLeave(response.data);
      } catch (err) {
        setError("Failed to fetch leave details.");
      } finally {
        setLoading(false);
      }
    };

    if (open && leaveId) {
      fetchLeave();
    }
  }, [open, leaveId]);

  // Function to calculate days between two dates
  const calculateDays = (fromDate, toDate) => {
    if (fromDate && toDate) {
      const start = new Date(fromDate);
      const end = new Date(toDate);
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Include start day
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevLeave) => {
      const updatedLeave = { ...prevLeave, [name]: value };

      // If from_date or to_date changes, update the days automatically
      if (name === "from_date" || name === "to_date") {
        updatedLeave.days = calculateDays(updatedLeave.from_date, updatedLeave.to_date);
      }

      return updatedLeave;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put(`${API_BASE_URL}/leaves/${leaveId}`, {
        emp_id: leave.emp_id, // Ensure emp_id is included in the request
        from_date: leave.from_date,
        to_date: leave.to_date,
        leave_type: leave.leave_type,
        days: leave.days,
      });

      onUpdate(); // Refresh table
      onClose(); // Close dialog
      toast.success("Leave updated Sucessfully")
    } catch (err) {
      setError("Failed to update leave.");
      toast.success("Something went wrong")
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Leave Record</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              paddingTop: "10px",
            }}
          >
            <TextField
              label="Employee ID"
              name="emp_id"
              value={leave?.emp_id || ""}
              onChange={handleChange}
              fullWidth
              required
              disabled // Employee ID should not be editable
            />
            <TextField
              label="Name"
              name="name"
              value={leave?.name || ""}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label=""
              name="from_date"
              type="date"
              value={leave?.from_date || ""}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label=""
              name="to_date"
              type="date"
              value={leave?.to_date || ""}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Leave Type"
              name="leave_type"
              value={leave?.leave_type || ""}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Days"
              name="days"
              type="number"
              value={leave?.days || ""}
              fullWidth
              required
              disabled // Days should be calculated, so it's not manually editable
            />
          </form>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading} // Disable while submitting
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeavesEditDialog;
