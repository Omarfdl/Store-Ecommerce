import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useCart } from "./CartContext";

export const OrdersContext = createContext();

export default function OrdersContextProvider({ children }) {
  const [checkoutData, setCheckoutData] = useState({});
  useEffect(() => {
    // console.log(checkoutData);
  }, []);

  let headers = {
    token: localStorage.getItem("userToken"),
  };
  let { cartId } = useCart();

  function createCashOrder() {
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`),
      { headers };
  }

  return (
    <OrdersContext.Provider value={{ setCheckoutData }}>
      {children}
    </OrdersContext.Provider>
  );
}

export const useOrders = () => useContext(OrdersContext);
