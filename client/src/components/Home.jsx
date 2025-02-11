import React from "react";
import BasicExampleDataGrid from "./EmployeeTable";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
  return (
    <>
      
      <main className="w-full max-w-7xl mx-auto mt-10">
        <BasicExampleDataGrid />
        <div className="flex flex-col md:flex-row gap-10 my-10 items-center md:justify-center">
            <div><Button onClick={() => navigate("/leaves")} color="error" variant="outlined">All&nbsp;Leaves</Button></div>
            <div><Button onClick={() => navigate("/add-employee")} color="success" variant="contained">Add&nbsp;Employee</Button></div>
            <div><Button onClick={() => navigate("/apply-leave")} color="error" variant="outlined">Apply&nbsp;Leave</Button></div>
            
        </div>
      </main>
    </>
  );
}

export default Home;
