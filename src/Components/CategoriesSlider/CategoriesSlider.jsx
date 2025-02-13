import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";
import { useQuery } from "@tanstack/react-query";

export default function CategoriesSlider() {
  // const [categories, setCategories] = useState([]);

  var Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
  });

  if (isError) {
    return <h2>{error}</h2>;
  }
  if (isLoading) {
    return;
  }

  return (
    <>
      <div className="pb-20 pt-5 items-center">
        <h2 className="text-left text-xl mb-2 bg-emerald-500 text-white w-fit p-2 rounded-md">
          Shop Popular Categories
        </h2>
        <Slider {...Settings}>
          {/* key ? */}
          {data?.data?.data.length &&
            data?.data?.data.map((category) => (
              <div
                key={category?._id}
                className="w-1/8 text-left p-2"
              >
                <img
                  className="w-full lg:h-[250px] md:h-[270px] h-[430px] object-cover rounded-md"
                  src={category.image}
                  alt=""
                />
                <span>{category.name}</span>
              </div>
            ))}
        </Slider>
      </div>
    </>
  );
}
