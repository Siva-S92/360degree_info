import * as React from "react";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import { API_BASE_URL } from "../constant.js";
import EditEmployeeDialog from "./EditEmployeeDialog.jsx";

export default function BasicExampleDataGrid() {
  const [employeedata, setEmployeeData] = React.useState([]);
  const [editingEmployeeId, setEditingEmployeeId] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleEditClick = (id) => () => {
    setEditingEmployeeId(id);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingEmployeeId(null);
    getAllEmployeesData(); // Refresh table after update
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await axios.delete(`${API_BASE_URL}/employees/${id}`);
      getAllEmployeesData(); // Refresh data after deletion
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 90 },
    {
      field: "name",
      headerName: "name",
      flex: 1,
      minWidth: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "email",
      flex: 1,
      minWidth: 160,
      editable: true,
    },
    {
      field: "phone",
      headerName: "phone",
      type: "string",
      flex: 1,
      minWidth: 110,
      editable: true,
    },
    {
      field: "emp_Id",
      headerName: "emp_Id",
      type: "string",
      flex: 1,
      minWidth: 120,
      editable: true,
    },
    {
      field: "role",
      headerName: "role",
      type: "string",
      flex: 1,
      minWidth: 110,
      editable: true,
    },
    {
      field: "leaves",
      headerName: "leaves",
      type: "string",
      flex: 1,
      minWidth: 110,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const rows = employeedata;

  const getAllEmployeesData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employees`);
      console.log(response.data);
      setEmployeeData(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  };

  React.useEffect(() => {
    getAllEmployeesData();
  }, []);
  return (
    <>
      <h1 className="text-slate-400 text-2xl font-bold mb-5 text-center">
        Employees
      </h1>
      {employeedata.length > 0 && (
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            key={employeedata.length} // This ensures the DataGrid re-renders when employeedata updates
            sx={{ width: "100%", marginX: "auto" }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      )}

      {/* Employee Edit Dialog */}
      <EditEmployeeDialog
        open={dialogOpen}
        employeeId={editingEmployeeId}
        onClose={handleCloseDialog}
        onUpdate={getAllEmployeesData}
      />
    </>
  );
}
