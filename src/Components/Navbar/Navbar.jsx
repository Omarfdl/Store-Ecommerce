import React, { useContext, useState } from "react";
import style from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { UserContext } from "../../../Context/userContext";

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function signOut() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
    setMenuOpen(false); // Close menu on logout
  }

  return (
    <nav className="border-gray-200 bg-white fixed top-0 z-50 left-0 right-0 shadow-md">
      <div className="flex justify-between items-center mx-auto max-w-screen-xl p-5 px-10">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="">
            <img src={logo} alt="logo" width="150px" />
          </Link>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="lg:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {userLogin && (
            <ul className="flex gap-4 text-gray-600 items-center">
              <li className="linkHover">
                <NavLink to="">Home</NavLink>
              </li>
              <li className="linkHover">
                <NavLink to="cart">Cart</NavLink>
              </li>
              <li className="linkHover">
                <NavLink to="products">Products</NavLink>
              </li>
              <li className="linkHover">
                <NavLink to="categories">Categories</NavLink>
              </li>
              <li className="linkHover">
                <NavLink to="brands">Brands</NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Authentication & Social Links */}
        <div className="hidden lg:flex items-center space-x-6">
          <ul className="flex gap-2">
            {userLogin ? (
              <li className="linkHover">
                <span
                  onClick={signOut}
                  className="text-sm hover:underline cursor-pointer"
                >
                  SignOut
                </span>
              </li>
            ) : (
              <>
                <li className="linkHover">
                  <NavLink to="login" className="text-sm hover:underline">
                    Login
                  </NavLink>
                </li>
                <li className="linkHover">
                  <NavLink to="register" className="text-sm hover:underline">
                    SignUp
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {/* Social Icons */}
          <ul className="flex gap-4 text-xl text-slate-800">
            <li className="linkHover">
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li className="linkHover">
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li className="linkHover">
              <a href="#">
                <i className="fab fa-tiktok"></i>
              </a>
            </li>
            <li className="linkHover">
              <a href="#">
                <i className="fab fa-linkedin"></i>
              </a>
            </li>
            <li className="linkHover">
              <a href="#">
                <i className="fab fa-youtube"></i>
              </a>
            </li>
            <li className="linkHover">
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden flex flex-col bg-white absolute w-full top-[4rem] left-0 transition-all duration-300 ${
          menuOpen ? "h-auto shadow-lg p-5" : "h-0 overflow-hidden"
        }`}
      >
        {userLogin && (
          <ul className="flex flex-col gap-4 text-gray-600 text-center">
            <li className="linkHover">
              <NavLink to="" onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li className="linkHover">
              <NavLink to="cart" onClick={() => setMenuOpen(false)}>
                Cart
              </NavLink>
            </li>
            <li className="linkHover">
              <NavLink to="products" onClick={() => setMenuOpen(false)}>
                Products
              </NavLink>
            </li>
            <li className="linkHover">
              <NavLink to="categories" onClick={() => setMenuOpen(false)}>
                Categories
              </NavLink>
            </li>
            <li className="linkHover">
              <NavLink to="brands" onClick={() => setMenuOpen(false)}>
                Brands
              </NavLink>
            </li>
          </ul>
        )}

        <ul className="flex flex-col gap-2 text-center mt-4">
          {userLogin ? (
            <li className="linkHover">
              <span
                onClick={signOut}
                className="text-sm hover:underline cursor-pointer"
              >
                SignOut
              </span>
            </li>
          ) : (
            <>
              <li className="linkHover">
                <NavLink to="login" onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
              </li>
              <li className="linkHover">
                <NavLink to="register" onClick={() => setMenuOpen(false)}>
                  SignUp
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Social Icons */}
        <ul className="flex justify-center gap-4 text-xl text-slate-800 mt-4">
          <li className="linkHover">
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li className="linkHover">
            <a href="#">
              <i className="fab fa-facebook"></i>
            </a>
          </li>
          <li className="linkHover">
            <a href="#">
              <i className="fab fa-tiktok"></i>
            </a>
          </li>
          <li className="linkHover">
            <a href="#">
              <i className="fab fa-linkedin"></i>
            </a>
          </li>
          <li className="linkHover">
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
          </li>
          <li className="linkHover">
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}