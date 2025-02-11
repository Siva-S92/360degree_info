import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function GoHome() {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-center my-5">
        <Button onClick={() => navigate("/")} variant="outlined" color="error" size="small">
          go&nbsp;home
        </Button>
      </div>
    </>
  );
}

export default GoHome;
