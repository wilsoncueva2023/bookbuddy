/* TODO - add your code to create a functional React component that renders a registration form */

import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AuthorizationForm } from "./AuthorizationForm";

import { setUser } from "../store";

// API routes for sign up and fetching guest data
const signUpRoute = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register";
const getGuestRoute = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me";

export const Register = () => {
  const dispatch = useDispatch(); // useDispatch hook to dispatch actions
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Function to handle form submission
  const onSubmit = async (inputs) => {
    try {
  
      // Sending POST request to sign up route with input data
    const {
      data: { token },
    } = await axios.post(signUpRoute, inputs);

      // Storing token in local storage
    window.localStorage.setItem("token", token);

    // Fetching user data using guest route with authorization header
    const response = await axios.get(getGuestRoute, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Dispatching setUser action to update user state
    dispatch(setUser(response.data));
 
      // Navigating to account page
    navigate("/account");
  } catch (error) {
    console.error("Registration error:", error);
  }};

  // Rendering AuthorizationForm component for registration
  return <AuthorizationForm onSubmit={onSubmit} />

  };

 
