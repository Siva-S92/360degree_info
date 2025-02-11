import React from "react";
import AddEmployee from "./components/AddEmployee";
import LeaveApplicationForm from "./components/LeaveApplicationForm";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./components/Home";
import Header from "./components/Header";
import { ToastContainer } from 'react-toastify';
import LeavesTable from "./components/LeavesTable";


function App() {
  return (
    <>
    <ToastContainer position="top-center"/>
    <Header />
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-employee" element={<AddEmployee />} />
      <Route path="/apply-leave" element={<LeaveApplicationForm />} />
      <Route path="/leaves" element={<LeavesTable />} />
    </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;

        