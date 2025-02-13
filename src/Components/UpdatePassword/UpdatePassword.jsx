import React, { useState } from "react";
import style from "./UpdatePassword.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
// import { toast } from "react-hot-toast";

export default function UpdatePassword() {
  const [loadingSpinner, setloadingSpinner] = useState(false);

  async function upDatePassword(values) {
    setloadingSpinner(true);
    // console.log("Form Values:", values);

    return await axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
        email: values.email,
        newPassword: values.newPassword,
      })
      .then((res) => {
        // toast.success("Password Changed Successfully!");
        // console.log("Success:", res.data);
      })
      .catch((err) => {
        // console.log("Error Response:", err.response?.data);
        // toast.error(
        //   err.response?.data?.message || "This didn't work, Try Again Please."
        // );
      })
      .finally(() => {
        setloadingSpinner(false);
      });
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required!"),
    newPassword: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required!"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: upDatePassword,
  });

  return (
    <>
      <div>
        <h2 className="py-5 mb-5 text-3xl text-emerald-500 font-bold">
          Change Your Password
        </h2>

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
              name="newPassword"
              id="floating_newPassword"
              value={formik.values.newPassword || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none  border-slate-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_newPassword"
              className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Reset newPassword
            </label>

            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div
                className="p-1 mt-2 text-sm rounded-lg text-red-500 font-bold"
                role="alert"
              >
                <span className="font-medium">{formik.errors.newPassword}</span>
              </div>
            ) : null}
          </div>

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
        </form>
      </div>
    </>
  );
}
