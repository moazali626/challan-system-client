import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddStudentCSS from "./AddStudent.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import ClassName from "../../UI/ClassName/ClassName";
import Mode from "../../UI/Mode/Mode";

const storedToken = localStorage.getItem("token");

const validationSchema = yup.object({
  firstName: yup
    .string("Enter your first name")
    .required("First name is required")
    .min(3, "First name should be of minimum 3 characters length")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  lastName: yup
    .string("Enter your last name")
    .required("Last name is required")
    .min(3, "Last name should be of minimum 3 characters length")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
});

const AddStudent = () => {
  const [className, setClassName] = useState();
  const [mode, setMode] = useState();
  const [success, setSuccess] = useState();

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

  const alertFun = (data) => {
    setClassName(data);
    // console.log("data:", data);
  };

  const alertFun2 = (data) => {
    setMode(data);
    // console.log("data:", data);
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const login = async () => {
        const { firstName, lastName } = values;
        // console.log(firstName, lastName);
        // console.log(className, mode);
        const result = await axios.post("http://localhost:4000/add-student", {
          firstName,
          lastName,
          className,
          mode,
        });
        if (result.status === 200) {
          setSuccess(true);
          //   window.location.reload();
          //   values.firstName = "";
          //   values.lastName = "";
          //   setClassName();
          //   setMode();
        }
        //   setLoginError(true);
        //   values.email = "";
        //   values.password = "";
        // }
        // if (result.data._id) {
        //   localStorage.setItem("token", result.data.token);
        //   window.location = "/dashboard";
        // }
      };
      login();
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={AddStudentCSS.container}>
        <h1 className={AddStudentCSS["add-student-heading"]}>Add Student</h1>
        <TextField
          variant="outlined"
          id="firstName"
          className={AddStudentCSS.firstName}
          name="firstName"
          label="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          className={AddStudentCSS.lastName}
          id="lastName"
          name="lastName"
          label="Last Name"
          variant="outlined"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
        <ClassName name={alertFun} />
        <Mode name={alertFun2} />
        <div>
          {success ? (
            <p
              style={{
                marginTop: "-0.5rem",
                marginBottom: "-0.5rem",
                position: "relative",
                bottom: "1.6rem",
                color: "green",
              }}
            >
              Student has been added successfully
            </p>
          ) : null}
        </div>

        <div className={AddStudentCSS["btn-wrapper"]}>
          <Button
            color="primary"
            variant="outlined"
            type="submit"
            className={AddStudentCSS["save-btn"]}
          >
            Save
          </Button>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Button
              color="secondary"
              variant="outlined"
              className={AddStudentCSS["save-btn"]}
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

export default AddStudent;
