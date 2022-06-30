import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddClassCSS from "./AddClass.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const storedToken = localStorage.getItem("token");

const validationSchema = yup.object({
  addClass: yup
    .string("Enter class name")
    .required("Class name is required")
    .min(1, "Class name should be of minimum 1 characters length")
    .matches(
      /^[A-Za-z0-9_-]*$/,
      "Only alphabets, numbers & underscores are allowed for this field "
    ),
  classFees: yup
    .string("Enter class fees")
    .required("Class fees is required")
    .min(1, "Class fees should be of minimum 1 characters length")
    .matches(/^[0-9]*$/, "Only numbers are allowed for this field "),
});

const AddClass = () => {
  const [duplicateError, setDuplicateError] = useState();
  const [isDataSaved, setIsDataSaved] = useState();

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
      addClass: "",
      classFees: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      const { addClass, classFees } = values;

      const addNewClass = async () => {
        const result = await await axios.post(
          "http://localhost:4000/add-class",
          {
            addClass,
            classFees,
          }
        );

        if (result.data.error) {
          setIsDataSaved(false);
          setDuplicateError(true);
          values.addClass = "";
        } else {
          setDuplicateError(false);
          setIsDataSaved(true);
          values.addClass = "";
          values.classFees = "";
        }
      };
      addNewClass();
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={AddClassCSS.container}>
        <h1 className={AddClassCSS["login-heading"]}>Add Class</h1>
        <TextField
          variant="outlined"
          className={AddClassCSS.addClass}
          name="addClass"
          label="Enter Class Name"
          value={formik.values.addClass}
          onChange={formik.handleChange}
          error={formik.touched.addClass && Boolean(formik.errors.addClass)}
          helperText={formik.touched.addClass && formik.errors.addClass}
        />
        <TextField
          variant="outlined"
          className={AddClassCSS.classFees}
          name="classFees"
          label="Enter Class Fees"
          value={formik.values.classFees}
          onChange={formik.handleChange}
          error={formik.touched.classFees && Boolean(formik.errors.classFees)}
          helperText={formik.touched.classFees && formik.errors.classFees}
        />
        {duplicateError ? (
          <p
            style={{
              marginTop: "-0.5rem",
              marginBottom: "-0.5rem",
              color: "red",
            }}
          >
            Class name already exists
          </p>
        ) : null}
        {isDataSaved ? (
          <p
            style={{
              marginTop: "-0.5rem",
              marginBottom: "-0.5rem",
              color: "green",
            }}
          >
            Class name has been added successfully
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

export default AddClass;
