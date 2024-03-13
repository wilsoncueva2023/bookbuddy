/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useGetAllBooksQuery } from "../store";
import { Link } from "react-router-dom";
import { Button } from '@mui/material'



export const Books = () => {
  // Using useSelector hook to select part of the Redux store state
  const user = useSelector((state) => state.userData);
  console.log(user);
  // Destructuring data, isLoading, and refetch from useGetAllBooksQuery hook
  const { data, isLoading, refetch } = useGetAllBooksQuery();
  // If data is still loading, display a loading message
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  // Extracting books from the data
  const books = data.books;
  // Function to handle checkout action
  const checkout = async (book) => {
    const url = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${book.id}`;
    // Making a patch request to update book status
    await axios.patch(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    refetch();
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: '20px',
        justifyContent: 'center',
        padding: '12px',
        marginTop: '20px',
      }}
    >
      {books.map((book) => (
          <div
            className="book-cards"
            key={book.id}
            style={{
              border: "1px solid grey",
              borderRadius: '4px',
              padding: "10px",
              textAlign: 'center',
              background: '#fff',
              boxShadow: '5px 10px #dfd3c3',
            }}
          >
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>{book.title}</p>
            <Link to={`/books/${book.id}`}>
            <img
              style={{ width: "98%" }}
              src={book.coverimage}
              alt={`${book.title} image`}
            />
            </Link>
            {user && (
              <Button
              style={{
                marginTop: '10px',
                color: '#fff',
                padding:'10px 20px',
                border: '1px solid #4B77BE',
                borderRadius:'5px',
                backgroundColor: '#4B77BE'
              }}
              onClick={() => checkout(book)}>Check Out</Button>
            )}
          </div>
        ))}
    </div>
  );
};
