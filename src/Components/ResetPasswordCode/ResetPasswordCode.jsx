import React, { useState } from "react";
import style from "./ResetPasswordCode.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import toast from "../../../node_modules/react-hot-toast/"
export default function ResetPasswordCode() {
  const [loadingSpinner, setloadingSpinner] = useState(false);
  let navigate = useNavigate();

  async function resetPasswordCode(values) {
    setloadingSpinner(true);
    // console.log(values);

    return await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        resetCode: values.code,
      })
      .then((res) => {
        // toast.success("Your Code Is Correct!");
        navigate("/updatepassword");
        // console.log("Success:", res.data);
      })
      .catch((err) => {
        // toast.error("This didn't work, Try Again Please.");
        // console.log("Error Response:", err.response?.data);
        // console.log("Error Details:", err);
      })
      .finally(() => {
        setloadingSpinner(false);
      });
  }

  let validationSchema = yup.object().shape({
    code: yup.string().required("Reset Code is required!"),
  });

  let formik = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: validationSchema,
    onSubmit: resetPasswordCode,
  });

  return (
    <>
      <div>
        <h2 className="py-5 mb-5 text-3xl text-emerald-500 font-bold">
          Enter The Reset Code
        </h2>
        <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="code"
              id="floating_Code"
              value={formik.values.code || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none  border-slate-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_Code"
              className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Reset Code
            </label>

            {formik.errors.code && formik.touched.code ? (
              <div
                className="p-1 mt-2 text-sm rounded-lg text-red-500 font-bold"
                role="alert"
              >
                <span className="font-medium">{formik.errors.code}</span>
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
