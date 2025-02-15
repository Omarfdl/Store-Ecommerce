import "./App.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Cart from "./Components/Cart/Cart";
import Products from "./Components/Products/Products";
import Login from "./Components/Login/Login";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Register from "./Components/Register/Register";
import Notfound from "./Components/Notfound/Notfound";
import Home from "./Components/Home/Home";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import BrandDetails from "./Components/BrandDetails/BrandDetails";
import CheckOut from "./Components/CheckOut/CheckOut";
import AllOrders from "./Components/AllOrders/AllOrders";
import UserContextProvider from "./Context/userContext";
import CartContextProvider from "./Context/CartContext";
import OrdersContextProvider from "./Context/OrdersContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "./../node_modules/@tanstack/react-query-devtools/src/production";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPasswordCode from "./Components/ResetPasswordCode/ResetPasswordCode";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();

const R = createHashRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "brands",
        element: <Brands />,
      },
      {
        path: "brands/:brandId",
        element: <BrandDetails />,
      },
      {
        path: "productdetails/:id/:category",
        element: <ProductDetails />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <CheckOut />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "resetpassword",
        element: <ResetPasswordCode />,
      },
      {
        path: "updatepassword",
        element: <UpdatePassword />,
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <CartContextProvider>
            <OrdersContextProvider>
              <RouterProvider router={R}></RouterProvider>
              <ReactQueryDevtools />
              <Toaster />
            </OrdersContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
