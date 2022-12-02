import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");
  const userType = localStorage.getItem("type");

  useEffect(() => {
    if (
      !userEmail ||
      userEmail.length === 0 ||
      !userType ||
      userType.toLowerCase() !== "customer"
    ) {
      navigate("/login/");
    }
  }, [navigate]);

  const handleClick = ( () => {
    //alert("clicked");
    navigate("/cars");
  })
  return (
    <div>
      <div>Dashboard</div>
      
      <button onClick={handleClick}>Select Cars</button>
    </div>
    );
};

export default Dashboard;
