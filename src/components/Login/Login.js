import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LoginCSS from "./Login.module.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const [loginError, setLoginError] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const login = async () => {
        const { email, password } = values;
        const result = await axios.post("http://localhost:4000/login", {
          email,
          password,
        });

        if (
          result.data.error === "no_user_found" ||
          result.data.error === "invalid_details"
        ) {
          setLoginError(true);
          values.email = "";
          values.password = "";
        }

        if (result.data._id) {
          localStorage.setItem("token", result.data.token);
          window.location = "/dashboard";
        }
      };
      login();
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={LoginCSS.container}>
        <h1 className={LoginCSS["login-heading"]}>Login</h1>
        <TextField
          variant="outlined"
          id="email"
          className={LoginCSS.email}
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          className={LoginCSS.password}
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
        {loginError ? (
          <p
            style={{
              marginTop: "-0.5rem",
              marginBottom: "-0.5rem",
              color: "red",
            }}
          >
            Email or password is incorrect
          </p>
        ) : null}

        <Button color="primary" variant="contained" type="submit">
          Login
        </Button>
        <p className={LoginCSS["new-account"]}>
          Don't have an account?{" "}
          <Link to="/signup" className={LoginCSS["new-account-link"]}>
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
