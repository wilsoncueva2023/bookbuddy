/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

export const SingleBook = () => {
  const { bookId } = useParams();
  const user = useSelector((state) => state.userData);
  const [book, setBook] = useState({});
  // Hook for navigation
  const navigate = useNavigate();

  // Effect hook to fetch book details
  useEffect(() => {
    const getBookDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`
        );
        setBook(data.book);
        console.log(data);
      } catch (error) {
        console.error("Error fetching book details", error);
      }
    };

    getBookDetails();
  }, [bookId]); // Re-fetch when bookId changes

  // function to handle handle checkout function
  const handleCheckout = async () => {
    const url = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${book.id}`;
    try {
      await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/account");
    } catch (error) {
      console.error("Error during checkout", error);
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };
// JSX to render book details
  return (
    <>
      
      <div
        style={{
          position: "absolute",
          top: "60%",
          left: "50%",
          background: "#fffafa",
          transform: "translate(-50%, -50%)",
          boxShadow: "5px 10px #dfd3c3",
        }}
      >
        <p
        style={{
          fontSize: "22px",
          textAlign: "center"
        }}
      >
        BOOK SUMMARY
      </p>
        {book ? (
          <Card sx={{ maxWidth: 600 }}>
            <CardContent
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <img
                src={book.coverimage}
                alt={book.title}
                style={{
                  width: "240px",
                }}
              />
              <div
                style={{
                  width: "250px",
                }}
              >
                <Typography variant="h5" component="div">
                  {book.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  style={{ fontStyle: "italic" }}
                >
                  {book.author}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  style={{ marginTop: "8px" }}
                >
                  {book.description}
                </Typography>
              </div>
            </CardContent>
            
              <CardActions>
                <div 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: '350px'
                }}
                >
                <Button
                  size="small"
                  onClick={handleGoBack}
                  style={{
                    marginTop: '10px',
                    color: '#fff',
                    padding:'10px 20px',
                    border: '1px solid #4B77BE',
                    borderRadius:'5px',
                    backgroundColor:'#4B77BE'
                  }}
                >
                  Go Back
                </Button>
                {user && (
                  <Button
                  style={{
                    marginTop: '10px',
                    color: '#fff',
                    padding:'10px 20px',
                    border: '1px solid #4B77BE',
                    borderRadius:'5px',
                    backgroundColor:'#4B77BE'
                  }}
                  size="small"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
                )}
                </div>
              </CardActions>
            
          </Card>
        ) : (
          <Typography variant="h6">Loading...</Typography>
        )}
      </div>
    </>
  );
};