import React, { useState } from "react";
import style from "./CheckOut.module.css";
import { useFormik } from "formik";
import { useCart } from "../../Context/CartContext";
// import { useOrders } from "../../../Context/OrdersContext";

export default function CheckOut() {
  // let { setCheckoutData } = useOrders();
  const [loadingSpinner, setloadingSpinner] = useState(false);
  let { checkOut, cartId } = useCart();

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: () => handleCheckOut(cartId, `http://localhost:5173`),
  });

  async function handleCheckOut(cartId, url) {
    let { data } = await checkOut(cartId, url, formik.values);
    // setCheckoutData(formik.values);
    window.location.href = data?.session.url;
  }

  return (
    <>
      <h2 className="font-bold text-4xl mt-2 mb-6 text-emerald-500">
        CheckOut
      </h2>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            id="floating_details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none  border-slate-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_details"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Details
          </label>
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
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transfotop-2m -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Phone
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            id="floating_city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none  border-slate-500 focus:outline-none focus:ring-0 focus:border-emerald-500 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_city"
            className="peer-focus:font-medium left-0 absolute text-sm text-gray-500 duration-300 transfotop-2m -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your City
          </label>
        </div>

        <div className="flex flex-col">
          <button
            type="submit"
            className="transition-colors text-white bg-emerald-500 hover:bg-emerald-700 focus:outline-none font-medium rounded-lg text-sm w-3/4 mx-auto px-16 mt-2 py-2.5 text-center"
          >
            {loadingSpinner ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "CheckOut"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
