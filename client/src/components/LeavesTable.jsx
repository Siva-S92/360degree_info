import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { API_BASE_URL } from "../constant.js";
import GoHome from "./GoHome.jsx";
import LeavesEditDialog from "./LeavesEditDialog"; // Import Edit Dialog

const API_URL = `${API_BASE_URL}/leaves`;

const LeavesTable = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingLeaveId, setEditingLeaveId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch leaves data");
      const data = await response.json();
      setLeaves(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    setEditingLeaveId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingLeaveId(null);
    fetchLeaves(); // Refresh table after update
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this leave request?"))
      return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete leave request");

      setLeaves(leaves.filter((leave) => leave.id !== id));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ width: "90%", margin: "auto", marginTop: 4, padding: 2 }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Employee Leave Records
        </Typography>

        {loading ? (
          <div style={{ textAlign: "center", padding: 20 }}>
            <CircularProgress />
          </div>
        ) : error ? (
          <Typography color="error" align="center">
            {error}
          </Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Employee&nbsp;ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>From&nbsp;Date</strong>
                </TableCell>
                <TableCell>
                  <strong>To&nbsp;Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Leave&nbsp;Type</strong>
                </TableCell>
                <TableCell>
                  <strong>Days</strong>
                </TableCell>
                <TableCell>
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaves.map((leave) => (
                <TableRow key={leave.id}>
                  <TableCell>{leave.id}</TableCell>
                  <TableCell>{leave.emp_id}</TableCell>
                  <TableCell>{leave.name}</TableCell>
                  <TableCell>{leave.from_date}</TableCell>
                  <TableCell>{leave.to_date}</TableCell>
                  <TableCell>{leave.leave_type}</TableCell>
                  <TableCell>{leave.days}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        onClick={() => handleEdit(leave.id)}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(leave.id)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Leave Edit Dialog */}
      <LeavesEditDialog
        open={dialogOpen}
        leaveId={editingLeaveId}
        onClose={handleCloseDialog}
        onUpdate={fetchLeaves} // Refresh table after edit
      />

      <GoHome />
    </>
  );
};

export default LeavesTable;
