/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */

import React from "react";
import bookLogo from "../assets/books.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store";

export const Navigations = () => {
  // Selecting user data from Redux store
  const user = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // Function to handle signout
  const signout = () => {
    // Dispatching setUser action to update user state to null
    dispatch(setUser(null));
    // Removing token from local storage
    localStorage.removeItem("token");
    // Navigating to home page
    navigate("/");
  };

  // JSX for registerAccount menu
  const registerAccount = (
    <ul style={{ display: "flex", listStyleType: "none" }}>
      <li style={{ marginRight: 18 }}>
        <Link to="/login" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', color:'white' }}>Login</Link>
      </li>
      <Link to="/register" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', color:'white' }}>Register</Link>
    </ul>
  );

  // JSX for signedIn menu
  const signedIn = (
    <ul style={{ display: "flex", listStyleType: "none" }}>
      <li style={{ marginRight: 18 }}>
        <Link to="/account" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '18px', color:'white' }}>Account</Link>
      </li>
      <li onClick={signout} style={{ cursor: "pointer", fontWeight: 'bold', fontSize: '18px', color:'white' }}>
        Logout
      </li>
    </ul>
  );

  // JSX to render navigation bar
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        color: "white",
        alignItems: "center",
        padding: '15px',
        margin: '0px',
        backgroundColor: '#4B77BE',
        backgroundSize: 'contain',
        opacity: '0.9',
      }}
    >
      <h1>
        <Link to="/" style={{ textDecoration: 'none', color:'white' }}>
          <img id="logo-image" src={bookLogo} /> Library App
        </Link>
      </h1>
      {user ? signedIn : registerAccount}
    </div>
  );
};