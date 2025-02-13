import React from "react";
import style from "./BrandDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function BrandDetails() {
  let { brandId } = useParams();

  function getSpecificBrand() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${brandId}`
    );
  }

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["Brand"],
    queryFn: getSpecificBrand,
  });

  console.log(data?.data.data);

  return (
    <>
      <h1>BrandDetails</h1>
    </>
  );
}
