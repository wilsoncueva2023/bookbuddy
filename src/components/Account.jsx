/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button } from '@mui/material'

export const Account = () => {
  // State to store user's reserved books and loading status
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  // Selecting user data from Redux store
  const user = useSelector((state) => state.userData);

  // Function to fetch user's reserved books
  const getCheckedBooks = async () => {
    const { data } = await axios.get(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // Setting reserved books and updating loading status
    setBooks(data.reservation);
    setLoading(false);
  };

  // Effect hook to fetch user's reserved books on component mount or user change
  useEffect(() => {
    console.log('User:', user);
    getCheckedBooks();
  }, [user]);

  // If loading, display a loading message
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // Function to handle returning a book
  const returnBook = async (book) => {
    console.log(book);
    try {
      const url = `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${book.id}`;
      // Making a delete request to return the book
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // Refreshing the list of reserved books
      await getCheckedBooks();
    }catch (error) {
      console.error("Error returning book", error);
    }

  };

  return (
    <>
    {user && (
      <p style={{ textAlign: 'center', fontSize: '24px'}}>Welcome {user.name}</p>
    )}
     {books.length > 0 && (
      <p style={{ textAlign: 'center', fontSize: '28px'}}>Checkout your reserved list:</p>
     )}
    {books.length === 0 ? (
      <p style={{ textAlign: 'center', fontSize: '28px'}}>NO BOOKS TO CHECKOUT</p>
    ) : (
    <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
      gap: '20px',
      justifyContent: 'center',
      padding: '12px',
      marginTop: '20px'
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
              background: '#fffafa',
              boxShadow: '5px 10px #dfd3c3',
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>{book.title}</p>
          <img
            style={{ width: "100%" }}
            src={book.coverimage}
            alt={`${book.title} image`}
          />
          <Button onClick={ () => returnBook(book) }
          style={{
            marginTop: '10px',
            color: '#fff',
            padding:'10px 20px',
            border: '1px solid #4B77BE',
            borderRadius:'5px',
            backgroundColor:'#4B77BE'
          }}
          >Return book</Button>
        </div>
      
      ))}
    </div>
     )}
    </>
  );
};



