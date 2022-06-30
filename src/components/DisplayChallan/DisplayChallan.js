import React, { useEffect, useState } from "react";
import DisplayChallanCSS from "./DisplayChallan.module.scss";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-ui/core";
import NoDataFound from "../../pages/NoDataFound/NoDataFound";

const DisplayChallan = (props) => {
  const [challanData, setChallanData] = useState();

  const location = useLocation();
  const className = location.state.data;

  useEffect(() => {
    const generateChallan = async () => {
      const result = await axios.post(
        "http://localhost:4000/generate-challan",
        {
          className,
        }
      );
      setChallanData(result.data);
    };
    generateChallan();
  }, [className]);

  return (
    <>
      {challanData && challanData.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className={DisplayChallanCSS.container}>
          <h1 style={{ margin: "-0.2rem" }}>Challans Generated</h1>
          <table>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Class Name</th>
              <th>Fees</th>
              <th>Total Months</th>
              <th>Issue Date</th>
              <th>Due Date</th>
            </tr>
            {challanData &&
              challanData.map((item) => {
                return (
                  <tr>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.className}</td>
                    <td>{item.fees}</td>
                    <td>{item.mode}</td>
                    <td>{item.issueDate}</td>
                    <td>{item.dueDate}</td>
                  </tr>
                );
              })}
          </table>
          <Link
            to="/dashboard/generate-challan"
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="outlined"
              color="secondary"
              className={DisplayChallanCSS["go-back-btn"]}
            >
              Go Back
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default DisplayChallan;
