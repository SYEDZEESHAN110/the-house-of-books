import React from 'react';
import { useGlobalContext } from '../../context.';
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useQuery } from 'react-query';
import axios from 'axios';


//https://covers.openlibrary.org/b/id/240727-S.jpg



const BookList = () => {

  const {data, isFetching, isLoading} = useQuery("all-books",async ()=>{
    return await axios.get("http://localhost:9000/allBooks")
  })
  console.log(data && data.data.books);
  const allBooks = data && data.data && data.data.books;


  const {books, loading, resultTitle} = useGlobalContext();
  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      // removing /works/ to get only id
      id: (singleBook.id).replace("/works/", ""),
      cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
    }
  });

  if(loading) return <Loading />;

  return (
    <>
    <Navbar/>
    <Header />
    <section className='booklist'>
      <div className=''>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='booklist-content grid'>
          {
            data && data.data && data.data.books.slice(0, 30).map((item) => {
              console.log(item.title)
              return (
               
                <Book   item={item} />
                
              )
              
            })
          }
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}

export default BookList