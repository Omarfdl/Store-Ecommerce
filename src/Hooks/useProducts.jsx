import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useProducts() {
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let productsQ = useQuery({
    queryKey: ["Products"],
    queryFn: getProducts,
    staleTime: 15000,
  });

  return productsQ;
}
