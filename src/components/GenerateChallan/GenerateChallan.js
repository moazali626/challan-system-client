import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import GenerateChallanCSS from "./GenerateChallan.module.scss";
import { Link } from "react-router-dom";
import GenerateChallanClass from "../../UI/GenerateChallanClass/GenerateChallanClass";
import SelectMode from "../../UI/SelectMode/SelectMode";
import axios from "axios";

const storedToken = localStorage.getItem("token");

const GenerateChallan = () => {
  const [className, setClassName] = useState();
  const [isChallanGenerated, setIsChallanGenerated] = useState();

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

  const getClassName = (data) => {
    setClassName(data);
  };

  const generateHandler = async () => {
    //generate challans
    const result = await axios.post("http://localhost:4000/generate-challan", {
      className,
    });
    // console.log(result.data.length);
    if (result.data.length === 0) {
      window.location = "/no-data-found";
    }
    if (result.data) {
      setIsChallanGenerated(true);
    }
  };

  return (
    <div>
      <form className={GenerateChallanCSS.container}>
        <h1 className={GenerateChallanCSS["login-heading"]}>
          Generate Challan
        </h1>
        <GenerateChallanClass className={getClassName} />
        <SelectMode />
        {/* {loginError ? (
          <p
            style={{
              marginTop: "-0.5rem",
              marginBottom: "-0.5rem",
              color: "red",
            }}
          >
            Email or password is incorrect
          </p>
        ) : null} */}

        <div>
          <div>
            {isChallanGenerated && (
              <p style={{ marginTop: "-1rem", color: "green" }}>
                Challans has been generated successfully
              </p>
            )}
          </div>

          <Button color="primary" variant="outlined" onClick={generateHandler}>
            Generate
          </Button>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Button
              color="secondary"
              variant="outlined"
              type="submit"
              style={{ marginLeft: "0.5rem" }}
            >
              GO BACK
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default GenerateChallan;
