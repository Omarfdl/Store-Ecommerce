import React from "react";
import style from "./Notfound.module.css";
import notfound from "../../assets/error.svg";

export default function Notfound() {
  return (
    <>
      <div className="text-center">
        <div className="text-emerald-500 rounded-lg mx-auto p-4">
          <h1 className="text-5xl font-bold">NotFound</h1>
        </div>
        <img src={notfound} alt="Not Found" className="mx-auto" />
      </div>
    </>
  );
}
