import React from "react";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.js";
import Navbar from "../Navbar/Navbar.jsx";
import "./MyPublication.css";
import { useSelector } from "react-redux";

import axios from "axios";
import { useQuery } from "react-query";
import Book from "../BookList/Book.jsx";

const Dashboard = () => {
  const { data, isFetching, isLoading } = useQuery("all-books", async () => {
    return await axios.get("http://localhost:9000/allBooks");
  });

  const { isLoggedIn } = useSelector((state) => ({
    isLoggedIn: state.LoginSignupFormReducer.isLoggedIn,
  }));

  console.log(isLoggedIn);
  return (
    <div>
      <Navbar />
      

      <h1>My Private Books</h1>
    

      
    <div className="App">
      {/* Navbar code goes here */}
      <div className="mainslide">
        <div className="carousel">
         
          {data &&
          data.data &&
          data.data.books.slice(0, 30).map((item) => {
            console.log(item.title);
            return  <div className="card"><Book item={item} /></div>;
          })}
          
          {/* Add more cards here */}
        </div>
      </div>
    </div>
 
    <h1>My Public Books</h1>


    <div className="App">
      {/* Navbar code goes here */}
      <div className="mainslide">
        <div className="carousel">
         
          {data &&
          data.data &&
          data.data.books.slice(0, 30).map((item) => {
            console.log(item.title);
            return  <div className="card"><Book item={item} /></div>;
          })}
          
          {/* Add more cards here */}
        </div>
      </div>
    </div>
 

     

      <Footer />
    </div>
  );
};

export default Dashboard;
