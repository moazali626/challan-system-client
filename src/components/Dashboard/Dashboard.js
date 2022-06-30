import React, { useEffect } from "react";
import DashboardCSS from "./Dashboard.module.scss";
import axios from "axios";
import Button from "@material-ui/core/Button";
import PaymentImg from "../../images/payment.png";
import { Link } from "react-router-dom";

const storedToken = localStorage.getItem("token");

const Dashboard = () => {
  useEffect(() => {
    const isAuth = async () => {
      const result = await axios.post("http://localhost:4000/dashboard", {
        storedToken,
      });

      if (result.data.error) {
        window.location = "/unauthorized";
      }
    };
    isAuth();
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    //PaymentImg
    <>
      {/* <div className={DashboardCSS.wrapper}>1</div> */}
      <div className={DashboardCSS.container}>
        <div>
          <img src={PaymentImg} alt="payment" style={{ width: "300px" }} />
        </div>
        <Link to="/dashboard/add-student" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="primary">
            Add Student
          </Button>
        </Link>

        <Link to="/dashboard/add-class" style={{ textDecoration: "none" }}>
          <Button variant="outlined" color="primary">
            Add Class
          </Button>
        </Link>

        <Link
          to="/dashboard/generate-challan"
          style={{ textDecoration: "none" }}
        >
          <Button variant="outlined" color="primary">
            Generate Challan
          </Button>
        </Link>
        <Link
          to="/dashboard/display-challan"
          style={{ textDecoration: "none" }}
        >
          <Button variant="outlined" color="primary">
            View Challan
          </Button>
        </Link>
        <Button variant="outlined" color="secondary" onClick={logoutHandler}>
          Logout
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
