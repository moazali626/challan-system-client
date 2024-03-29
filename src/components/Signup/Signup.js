import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SignupCSS from "./Signup.module.scss";
import axios from "axios";
import Redirect from "react-router";
import { Link } from "react-router-dom";

const isToken = localStorage.getItem("token");

const validationSchema = yup.object({
  name: yup
    .string("Enter your name")
    .required("Name is required")
    .min(3, "Name should be of minimum 3 characters length")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Signup = () => {
  const [duplicateError, setDuplicateError] = useState();

  useEffect(() => {
    if (isToken) {
      window.location = "/dashboard";
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { name, email, password } = values;

      const result = await axios.post("http://localhost:4000/api/auth/signup", {
        name,
        email,
        password,
      });

      if (result.data.code === 200) {
        const token = result.data.token;
        localStorage.setItem("token", token);
        window.location = "/dashboard";
      } else if (result.data.code === 409) {
        setDuplicateError(true);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={SignupCSS.container}>
        <h1 className={SignupCSS["login-heading"]}>Signup</h1>
        <TextField
          variant="outlined"
          id="email"
          className={SignupCSS.name}
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          variant="outlined"
          id="email"
          className={SignupCSS.email}
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          className={SignupCSS.password}
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <div>
          <div>
            {duplicateError ? (
              <p
                style={{
                  marginTop: "-0.5rem",
                  marginBottom: "-0.5rem",
                  color: "red",
                  textAlign: "center",
                }}
              >
                User account already exists
              </p>
            ) : null}
          </div>
          <div className={SignupCSS["btn"]}>
            <Button color="primary" variant="contained" type="submit">
              Register
            </Button>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                color="secondary"
                variant="contained"
                type="submit"
                style={{ marginLeft: "1rem" }}
              >
                Go back
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
