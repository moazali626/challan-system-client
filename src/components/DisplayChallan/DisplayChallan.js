import React, { useEffect, useState } from "react";
import DisplayChallanCSS from "./DisplayChallan.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-ui/core";
import NoDataFound from "../../pages/NoDataFound/NoDataFound";

const DisplayChallan = () => {
  const [challanData, setChallanData] = useState();

  useEffect(() => {
    const generateChallan = async () => {
      const result = await axios.get(
        "http://localhost:4000/api/challan/display-challan"
      );

      setChallanData(result.data.data);
    };
    generateChallan();
  }, []);

  return (
    <>
      {challanData && challanData.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className={DisplayChallanCSS.container}>
          <h1 style={{ margin: "-0.2rem" }}>Challans Generated</h1>
          <table>
            <tr>
              <th>Challan Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Class Name</th>
              <th>Fees</th>
              <th>Total Months</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
            {challanData &&
              challanData.map((item) => {
                return (
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.challan.firstName}</td>
                    <td>{item.challan.lastName}</td>
                    <td>{item.challan.className}</td>
                    <td>{item.fees}</td>
                    <td>{item.challan.mode}</td>
                    <td>{item.issueDate}</td>
                    <td>{item.dueDate}</td>
                    <td>{item.status}</td>
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
