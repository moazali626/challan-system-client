import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import UpdateStatusCSS from "./UpdateStatus.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const storedToken = localStorage.getItem("token");

const validationSchema = yup.object({
  challanId: yup
    .string("Enter Challan ID")
    .required("Challand ID is required")
    .min(24, "Challan ID should contain exactly 24 characters")
    .max(24, "Challan ID should contain exactly 24 characters")
    .matches(
      /^[A-Za-z0-9]*$/,
      "Only alphabets & numbers are allowed for this field "
    ),
});

const UpdateStatus = () => {
  const [isDataSaved, setIsDataSaved] = useState();
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    console.log(event.target.value);
    setStatus(event.target.value);
  };

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

  const formik = useFormik({
    initialValues: {
      challanId: "",
      // classFees: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { challanId } = values;
      console.log("clicked");
      const updateStatus = async () => {
        const result = await await axios.post(
          "http://localhost:4000/api/challan/update-challan",
          {
            status,
            challanId,
          }
        );
        if (result.data.error) {
          setIsDataSaved(false);
          values.addClass = "";
        } else if (result.data.code) {
          setIsDataSaved(true);
          // values.addClass = "";
          // values.classFees = "";
        }
      };
      updateStatus();
    },
  });

  return (
    <div>
      <form
        onSubmit={formik.handleSubmit}
        className={UpdateStatusCSS.container}
      >
        <h2 className={UpdateStatusCSS["heading"]}>Update Challan Status</h2>
        <TextField
          variant="outlined"
          className={UpdateStatusCSS.status}
          name="challanId"
          label="Enter Challan ID"
          value={formik.values.challanId}
          onChange={formik.handleChange}
          error={formik.touched.challanId && Boolean(formik.errors.challanId)}
          helperText={formik.touched.challanId && formik.errors.challanId}
        />
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              className={UpdateStatusCSS["status-menu"]}
              value={status}
              label="Status"
              onChange={handleChange}
              required
            >
              <MenuItem value={"Pending"}>Pending</MenuItem>
              <MenuItem value={"Paid"}>Paid</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {isDataSaved ? (
          <p
            style={{
              marginTop: "-0.5rem",
              marginBottom: "-0.5rem",
              color: "green",
            }}
          >
            Challan status has been updated successfully.
          </p>
        ) : null}
        <div>
          <Button color="primary" variant="outlined" type="submit">
            Save
          </Button>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Button
              color="secondary"
              variant="outlined"
              style={{ marginLeft: "0.5rem" }}
            >
              Go Back
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateStatus;
