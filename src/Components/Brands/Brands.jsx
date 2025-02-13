import React from "react";
import style from "./Brands.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../spinner/spinner";
import { Link, useNavigate } from "react-router-dom";

export default function Brands() {
  function getAllBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["brands"],
    queryFn: getAllBrands,
  });
  let brands = data?.data.data;

  return (
    <>
      {brands ? (
        <div className="row">
          {brands?.map((brand) => (
            <div
              key={brand._id}
              className="lg:w-1/5 md:w-1/3 sm:w-1/2 px-3 mx-auto my-4 group"
            >
              <Link to={`${brand._id}`}>
                <figure className="flex flex-col">
                  <img className="w-[400px]" src={brand.image} alt="" />

                  <figcaption>
                    <span className="font-bold group-hover:text-emerald-500 transition-colors">
                      {brand.name}
                    </span>
                  </figcaption>
                </figure>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <Spinner></Spinner>
      )}
    </>
  );
}
