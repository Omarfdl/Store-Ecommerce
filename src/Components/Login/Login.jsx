import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/userContext";

export default function Login() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [loadingSpinner, setloadingSpinner] = useState(false);

  function handleLogin(values) {
    setloadingSpinner(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setloadingSpinner(false);
        if (res.data.message == "success") {
          console.log(res);
          localStorage.setItem("userToken", res.data.token);
          setuserLogin(res.data.token);
          navigate("/");
        }
      })
      .catch((res) => {
        setloadingSpinner(false);
        setApiError(res.response.data.message);
      });
  }

  let validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email Is Not Valid!")
      .required("Email is required!"),

    password: yup
      .string()
      .min(6, "Password lenght must be at least 6.")
      .required("Password is required!"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    // validate: validation,
    onSubmit: handleLogin,
  });

  return (
    <>
      {ApiError && (
        <div className="w-5/12 bg-red-700 p-3 mb-10 mx-auto font-semibold text-white rounded-xl">
          {ApiError}
        </div>
      )}
      <h2 className="font-bold text-4xl mt-2 mb-6 text-emerald-500">Login</h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="floating_email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none  border-slate-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>

          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-1 mt-2 text-sm rounded-lg text-red-500 font-bold"
              role="alert"
            >
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="floating_password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none  border-slate-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transfotop-2m -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>

          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-1 mt-2 text-sm rounded-lg text-red-500 font-bold"
              role="alert"
            >
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col">
          <button
            type="submit"
            className="text-white bg-emerald-500 hover:bg-emerald-700 focus:outline-none font-medium rounded-lg text-sm w-3/4 mx-auto px-16 mt-2 py-2.5 text-center"
          >
            {loadingSpinner ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Submit"
            )}
          </button>

          <span className="my-3">
            Do you have an account?
            <Link
              to={"/register"}
              className="font-semibold text-emerald-500 hover:underline ms-1"
            >
              Signup
            </Link>
          </span>
        </div>
        <div>
          <span>
            <Link
              to={"/forgotpassword"}
              className="font-semibold text-emerald-500 hover:underline ms-1"
            >
              Forgot password?
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}
