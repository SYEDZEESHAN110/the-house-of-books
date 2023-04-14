import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import cover from "../../images/bookCollention.png"
import { useQuery } from 'react-query';
import axios from 'axios';


const URL = "https://openlibrary.org/works/";

const BookDetails = () => {

  const  navigate = useNavigate();
  const {id} = useParams();

  const {data, isFetching, isLoading} = useQuery("get-bookById",async ()=>{
    return await axios.get(`http://localhost:9000/BookById/${id}`,)
  })

  const book= data && data.data.books; 

 

        if(data){
          const {description, title, access, ISBN, category, author} = data;
          const newBook = {
            description: description ? description.value : "No description found",
            title: title,
            cover_img:   {cover} ,
            access: access ? access: "No access found",
            ISBN : ISBN ? ISBN : "No ISBN found",
            category: category ? category : "No category found",
            author: author ? author : "No Author found ",
          };
         
  

  if(isLoading) return <Loading />;

  return (
    <>
    <Navbar/>
    <Header />
    <section className='book-details'>
      <div className='detail'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/")}>
          <FaArrowLeft size = {22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img' >
            <img src = {cover} alt = "cover img" width="12px"/>
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Category: </span>
              <span className='text-italic'>{book?.category}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>ISBN: </span>
              <span className='text-italic'>{book?.ISBN}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Access </span>
              <span>{book?.access}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </>
  )
}
}

export default BookDetails