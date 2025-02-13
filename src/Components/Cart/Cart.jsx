import style from "./Cart.module.css";
import { useCart } from "../../Context/CartContext";
import Spinner from "../spinner/spinner";
import { Link } from "react-router-dom";

export default function Cart() {
  let { userCartQuery, updateProductCount, loadingProductId, deleteCartItem } =
    useCart();
  let { data, error, isError, isLoading } = userCartQuery;
  let cartItems = data?.data.data.products;
  // console.log(cartItems);

  function increaseCount(productId, count) {
    const updatedCount = count + 1;
    updateProductCount({ productId, newCount: updatedCount });
  }

  function decreaseCount(productId, count) {
    const updatedCount = count - 1;
    updateProductCount({ productId, newCount: updatedCount });
  }

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      {cartItems.length !== 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4">
          <div className="w-full text-sm text-left rtl:text-right">
            <div className="flex flex-col gap-6">
              {cartItems?.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white border border-gray-200 shadow-lg rounded-lg p-4 flex flex-col md:flex-row items-center md:items-center w-full"
                >
                  {/* Image */}
                  <div className="p-4 w-full md:w-1/3 flex justify-center">
                    <figure>
                      <img
                        src={item.product.imageCover}
                        className="w-40 max-w-full max-h-full object-contain"
                        alt={item.product.title}
                      />
                    </figure>
                  </div>

                  {/* Info */}
                  <div className="px-6 py-4 flex flex-col justify-between items-center md:items-start w-full md:w-2/3">
                    <div className="text-center md:text-left flex flex-col gap-2">
                      <span className="font-semibold text-gray-900 text-xl">
                        {item.product.title}
                      </span>

                      <span className="font-bold text-emerald-500 mt-2">
                        ${item.price}
                      </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-4">
                      <button
                        onClick={() =>
                          decreaseCount(item.product.id, item.count)
                        }
                        disabled={loadingProductId === item.product.id}
                        className="group border border-emerald-500 rounded-full p-2 hover:bg-emerald-500 transition"
                      >
                        <i className="fa-solid fa-minus group-hover:text-white transition-colors"></i>
                      </button>

                      <span className="mx-4 text-lg font-semibold">
                        {item.count}
                      </span>

                      <button
                        onClick={() =>
                          increaseCount(item.product.id, item.count)
                        }
                        disabled={loadingProductId === item.product.id}
                        className="group border border-emerald-500 rounded-full p-2 hover:bg-emerald-500 transition"
                      >
                        <i className="fa-solid fa-plus group-hover:text-white transition-colors"></i>
                      </button>
                    </div>

                    {/* Remove Button */}
                    <div className="mt-4">
                      <button
                        onClick={() => deleteCartItem(item.product.id)}
                        className="font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link to={`/checkout`}>
            <button className="p-3 px-8 my-4 bg-emerald-500 rounded-md text-white hover:bg-emerald-600 transition-colors">
              Check Out
            </button>
          </Link>
        </div>
      ) : (
        <h2 className="text-emerald-500 text-4xl font-bold text-center mt-10">
          You Don't Have Items!
        </h2>
      )}
    </>
  );
}
