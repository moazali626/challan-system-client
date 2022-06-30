import React from "react";
import NoDataFoundCSS from "./NoDataFound.module.scss";
import dataNotFoundImg from "../../images/data_not_found.jpg";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const NoDataFound = () => {
  return (
    <div className={NoDataFoundCSS.container}>
      <img
        src={dataNotFoundImg}
        alt="No data found"
        className={NoDataFoundCSS.img}
      />
      <p className={NoDataFoundCSS["no-data-text"]}>No record exists</p>
      <Link to="/dashboard" className={NoDataFoundCSS["no-data-back-btn"]}>
        <Button variant="outlined" color="secondary">
          Go Back
        </Button>
      </Link>
    </div>
  );
};

export default NoDataFound;
