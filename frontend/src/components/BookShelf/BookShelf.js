import React from 'react';
import { useGlobalContext } from '../../context.';
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookShelf.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";


//https://covers.openlibrary.org/b/id/240727-S.jpg

const BookShelf = () => {
 

  // if(loading) return <Loading />;

  return (
    <>
    <Navbar/>
    <Header />
    <section className='booklist'>
      <div className=''>
        <div className='section-title'>
          <h2>MY BBOOK SHELF</h2>
        </div>
        {/* <div className='booklist-content grid'>
          {
            booksWithCovers.slice(0, 20).map((item) => {
              return (
                <Book item={item} />
              )
            })
          }
        </div> */}
      </div>
    </section>
    <Footer />
    </>
  )
}

export default BookShelf