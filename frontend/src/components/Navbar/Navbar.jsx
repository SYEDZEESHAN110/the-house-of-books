import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../LoginSignup/LoginSignup.reducer";

const Navbar = () => {

  const dispatch = useDispatch()

  const [toggleMenu, setToggleMenu] = useState(false);

  const handleNavbar = () => setToggleMenu(!toggleMenu);

  // const {isLoggedIn} = useSelector((state)=>({
  //   isLoggedIn: state.LoginSignupFormReducer.isLoggedIn
  // }))
  const isLoggedIn = Boolean( localStorage.getItem('isLoggedIn'));
console.log(isLoggedIn,"logo logo logologo")
  const handleLogout = () => {
    dispatch(login(false))
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn",false)
  }

  return (
    <nav className="navbar" id="navbar">
      <div className=" navbar-content flex flex-sb">
        <div className="brand-and-toggler flex flex-sb">
          <Link to="/" className="navbar-brand flex">
          
            <span className="text-uppercase fw-7 fs-24 ls-1">THEHOUSEOFBOOK</span>
          </Link>
          <button
            type="button"
            className="navbar-toggler-btn"
            onClick={handleNavbar}
          >
            <HiOutlineMenuAlt3
              size={35}
              style={{
                color: `${toggleMenu ? "#fff" : "#010101"}`,
              }}
            />
          </button>
        </div>

        <div
          className={
            toggleMenu
              ? "navbar-collapse show-navbar-collapse"
              : "navbar-collapse"
          }
        >
          <ul className="navbar-nav" >
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                Home
              </Link>
            </li>
            
   
            <li className="nav-item">
              <Link
                to="editBook"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                {isLoggedIn ? "EditBook" : ""}
              </Link>
            </li>
            <li className="nav-item" >
              <Link
                to="addBook"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                {isLoggedIn ? "AddBook" : ""}

              </Link>
            </li>
            {isLoggedIn ? (
          <>
          <Link
                to="/"
                className="nav-link text-uppercase flex flex-sb text-white fs-22 fw-6 ls-1"
                style={{marginLeft:"30px"}}
                onClick={handleLogout}
              >
                <FaSignOutAlt/> Logout
              </Link>
            
          </>
        ) : (
          <li className="nav-item">
              <Link
                to="register"
                className="nav-link text-uppercase flex flex-sb text-white fs-22 fw-6 ls-1"
              >
                <FaSignInAlt/> Login/Register
              </Link>
            </li>
        )}
            
          </ul>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
