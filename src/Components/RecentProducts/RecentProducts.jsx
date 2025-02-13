import React, { useContext, useEffect, useState } from "react";
import style from "./RecentProducts.module.css";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import Spinner from "../spinner/spinner";
import { useCart } from "../../../Context/CartContext";

export default function RecentProducts() {
  let { data, isError, isLoading, refetch, error } = useProducts();

  let { addToCart } = useCart();

  if (isError) {
    return <h2>{error}</h2>;
  }
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="row">
        {data?.data.data.map((product) => (
          <div key={product.id} className="lg:w-1/5 md:w-1/3 sm:w-1/2 px-3">
            <figure className="product">
              <Link
                to={`/ProductDetails/${product.id}/${product.category.name}`}
              >
                <img src={product.imageCover} className="w-full " alt="" />
                <figcaption className="mb-1 text-left flex flex-col justify-between">
                  <div className="mb-3">
                    <h3 className="text-emerald-600">
                      {product.category.name}
                    </h3>
                    <h3 className="">
                      {product.title.split(" ").slice(0, 3).join(" ")}
                    </h3>
                  </div>
                  <div className="flex justify-between">
                    <span>{product.price} EGP</span>
                    <span>
                      {" "}
                      {product.ratingsAverage}{" "}
                      <i className="fas fa-star text-yellow-400"></i>
                    </span>
                  </div>
                </figcaption>
              </Link>
              <button
                onClick={() => addToCart(product.id)}
                className="btn uppercase mt-2 lg:mb-4 bg-emerald-400 rounded-b-md text-white font-bold py-1 w-full"
              >
                Add to cart
              </button>
            </figure>
          </div>
        ))}
      </div>
    </>
  );
}
