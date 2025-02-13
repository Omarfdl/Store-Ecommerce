import React, { useState } from "react";
import style from "./Register.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [loadingSpinner, setloadingSpinner] = useState(false);

  function handleRegister(values) {
    setloadingSpinner(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((res) => {
        setloadingSpinner(false);
        if (res.data.message == "success") {
          // console.log(res);
          navigate("/login");
        }
      })
      .catch((res) => {
        setloadingSpinner(false);
        setApiError(res.response.data.message);
      });
  }

  // function validation(values) {
  //   ---------------Manually Validation------------------
  //   let errors = {};
  //   if (values.name == "") {
  //     errors.name = "Name Required!";
  //   } else if (!/^[a-zA-Z]{3,10}$/.test(values.name)) {
  //     errors.name = "Name is not valid!";
  //   }
  //   return errors;
  // }

  let validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Name must be at least 3 characters.")
      .max(12, "Name can't be more than 10 characters.")
      .required("Name is required!"),

    email: yup
      .string()
      .email("Email Is Not Valid!")
      .required("Email is required!"),

    password: yup
      .string()
      .min(6, "Password lenght must be at least 6.")
      .required("Password is required!"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "The Password Doesn't Match!")
      .required("Password is required!"),

    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "The Number Is Not Valid!")
      .required("Phone Number is required!"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    // validate: validation,
    onSubmit: handleRegister,
  });

  return (
    <>
      {ApiError && (
        <div className="w-5/12 bg-red-700 p-3 mb-10 mx-auto font-semibold text-white rounded-xl">
          {ApiError}
        </div>
      )}
      <h2 className="font-bold text-4xl mt-2 mb-6 text-emerald-500">
        Register Now
      </h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="floating_name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none  border-slate-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_name"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>

          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-1 mt-2 text-sm rounded-lg text-red-500 font-bold"
              role="alert"
            >
              <span className="font-medium">{formik.errors.name}</span>
            </div>
          ) : null}
        </div>

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

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            id="floating_repeat_password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none  border-slate-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_repeat_password"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transfotop-2m -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>

          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-1 mt-2 text-sm rounded-lg text-red-500 font-bold"
              role="alert"
            >
              <span className="font-medium">{formik.errors.rePassword}</span>
            </div>
          ) : null}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="floating_phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none  border-slate-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_phone"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transfotop-m -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone
          </label>

          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-1 mt-2 text-sm rounded-lg text-red-500 font-bold"
              role="alert"
            >
              <span className="font-medium">{formik.errors.phone}</span>
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
              to={"/login"}
              className="font-semibold text-emerald-500  hover:underline ms-1"
            >
              Login
            </Link>
          </span>
        </div>
      </form>
    </>
  );
}
