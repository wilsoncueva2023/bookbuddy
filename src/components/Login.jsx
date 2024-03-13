/* TODO - add your code to create a functional React component that renders a login form */

import React, { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../store'
import { AuthorizationForm } from './AuthorizationForm'

// API routes for sign in and fetching guest data
const signInRoute = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login";
const getGuestRoute = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me";


export const Login = () => {
  const dispatch = useDispatch(); // useDispatch hook to dispatch actions
  const navigate = useNavigate(); // useNavigate hook for navigation
  
    const onSubmit = async (inputs) => {
      try {
     // Sending POST request to sign in route with input data
      const {
        data: { token },
      } = await axios.post(signInRoute, inputs);
     
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
      console.error("Login error:", error);
    }
  
  };
    // Rendering AuthorizationForm component for login
    return <AuthorizationForm onSubmit={onSubmit} isLoginForm />;
  };