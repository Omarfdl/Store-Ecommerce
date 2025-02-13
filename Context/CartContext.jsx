import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "./../node_modules/react-hot-toast/src/index";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  //Adding Item To Cart
  const queryClient = useQueryClient();
  const [loadingProductId, setLoadingProductId] = useState(0);
  const [cartId, setCartId] = useState();

  let headers = {
    token: localStorage.getItem("userToken"),
  };

  const addToCart = async (productId) => {
    await axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: productId,
      },
      {
        headers,
      }
    );
  };
  let cartMutation = useMutation({
    mutationKey: ["cartProduct"],
    mutationFn: addToCart,

    onSuccess: () => {
      toast.success("Successfully Add To Your Cart!");
      queryClient.invalidateQueries(["cartProduct"]);
    },

    onError: (error) => {
      toast.error("This didn't work, Try Again Later.");
    },
  });

  // Update Cart Quantity
  const updateProductCount = async ({ productId, newCount }) => {
    console.log("Updating product count:", { productId, newCount });

    await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        count: newCount,
      },
      {
        headers,
      }
    );
  };
  let updateProductMutation = useMutation({
    mutationKey: ["cartProduct"],
    mutationFn: updateProductCount,

    onMutate: async ({ productId }) => {
      setLoadingProductId(productId);
    },

    onSuccess: (data) => {
      toast.success("Count Updated Successfully!");
      setLoadingProductId(null);
      queryClient.invalidateQueries(["cartProduct"]);
    },

    onError: (error) => {
      toast.error("This didn't work, Try Again Please.");
      setLoadingProductId(null);
    },
  });

  //Delete Product From Cart
  const deleteCartItem = async (productId) => {
    await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { headers }
    );
  };
  let deleteCartItemMutation = useMutation({
    mutationKey: ["cartProduct"],
    mutationFn: deleteCartItem,

    // onMutate: async ({ productId }) => {
    //   setLoadingProductId(productId);
    // },

    onSuccess: (data) => {
      toast.success("Item Deleted Successfully!");
      setLoadingProductId(null);
      queryClient.invalidateQueries(["cartProduct"]);
    },

    onError: (error) => {
      toast.error("This didn't work, Try Again Please.");
      setLoadingProductId(null);
    },
  });

  //Get Logged User Cart Items
  function getUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers,
    });
  }

  const userCartQuery = useQuery({
    queryKey: ["useCart"],
    queryFn: getUserCart,
    enabled: !!localStorage.getItem("userToken"),
    onError: (error) => {
      if (error.response?.status === 401) {
        console.warn("Unauthorized access, redirecting to login...");
      }
    },
  });
  let { data } = userCartQuery;

  useEffect(() => {
    if (data?.data.cartId) {
      setCartId(data?.data.cartId);
    }
  }),
    [data];

  // CheckOut
  async function checkOut(cartId, url, checkOutFormData) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: checkOutFormData },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <CartContext.Provider
      value={{
        addToCart: cartMutation.mutate,
        getUserCart,
        userCartQuery,
        updateProductCount: updateProductMutation.mutate,
        deleteCartItem: deleteCartItemMutation.mutate,
        loadingProductId,
        checkOut,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
