import React, { useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner/spinner";
import { useCart } from "../../Context/CartContext";

export default function ProductDetails() {
  const [relatedproducts, setrelatedproducts] = useState([]);
  let { id, category } = useParams();
  let { addToCart } = useCart();

  function getProduct(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["ProductDetails"],
    queryFn: () => getProduct(id),
  });

  // if (isError) {
  //   return <h2>{error}</h2>;
  // }
  // if (isLoading) {
  //   return <Spinner />;
  // }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [data]);

  function getRelatedProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter(
          (product) => product.category.name == category
        );
        setrelatedproducts(related);
      })
      .catch((res) => {
        // console.log(res.data.data);
      });
  }

  useEffect(() => {
    refetch();
    getRelatedProducts();
  }, [id, category]);

  return (
    <>
      {data && (
        <div className="row items-center">
          <div className="md:w-1/4">
            <img src={data?.data?.data?.imageCover} className="w-full" alt="" />
          </div>

          <div className="md:w-3/4 text-left px-3">
            <div>
              <h3 className="font-semibold text-xl my-3">
                {data?.data?.data?.title}
              </h3>
              <h4 className="text-gray-500 ms-2">
                {data?.data?.data?.description}
              </h4>
            </div>
            <div className="my-5">
              <h3>{data?.data?.data?.category.name}</h3>
              <div className="flex justify-between mt-1">
                <span className="font-semibold">
                  {data?.data?.data?.price} EGP
                </span>
                <span className="font-semibold">
                  {" "}
                  {data?.data?.data?.ratingsAverage}{" "}
                  <i className="fas fa-star text-yellow-400"></i>
                </span>
              </div>
            </div>
            <button
              onClick={() => addToCart(data?.data.data.id)}
              className="btn uppercase mt-2 bg-emerald-400 hover:bg-emerald-600 rounded-md text-white font-bold py-2 w-full"
            >
              Add to cart
            </button>
          </div>
        </div>
      )}

      <div className="row my-5">
        {relatedproducts.length > 0 ? (
          relatedproducts.map((product) => (
            <div key={product.id} className="md:w-1/5 sm:w-1/2 px-3">
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
                <button className="btn uppercase mt-2 bg-emerald-400 rounded-b-md text-white font-bold py-1 w-full">
                  Add to cart
                </button>
              </figure>
            </div>
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}
