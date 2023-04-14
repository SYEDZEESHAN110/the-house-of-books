import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./PrivateLibrary.css";
import bgImage from "../../images/book.png";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios"
import {MdDataSaverOn} from "react-icons/md"

const Bookprivate = ({item}) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient()
  
    // JWT token from localstorage
    const user = JSON.parse(localStorage.getItem('user'))
  
  
  // console.log("yehi to he id",item._id)
  
    let mutationSave = useMutation({
      mutationFn: () => {
        return axios.put("http://localhost:9000/", {
  
          id: item._id,
  
        });
      },
    });
  
    let mutationDelete = useMutation({
      mutationFn: ()=> {
  
        return axios.delete(`http://localhost:9000/delBook/${item._id}`, 
        {
          headers: { Authorization: `Bearer ${user}` },
        }
        )
  
      },
      onSuccess: () => {
        queryClient.invalidateQueries('all-books')
      }
    })
  
    const handleSave = (e) => {
      e.preventDefault();
      mutationSave.mutate();
    };
    const handleEdit = (e) =>{
      e.preventDefault()
      navigate(`/EditBook/${item._id}`)
    }
    const handlDelete = (e) => {
      e.preventDefault();
      mutationDelete.mutate();
    }
  
    return (
      <div className="book-item flex flex-column flex-sb" key={item._id}>
        <div className="book-item-img">
          <img src={item.image} alt="cover" />
        </div>
        <div className="book-item-info text-center">
          <Link to={`/BookDetails/${item._id}`}>
            <div className="book-item-info-item title fw-7 fs-18">
              <span>{item.title}</span>
            </div>
          </Link>
  
          <div className="book-item-info-item author fs-15">
            <span className="text-capitalize fw-7">Author: </span>
            <span>{item.author}</span>
          </div>
  
          <div className="book-item-info-item edition-count fs-15">
            <span className="text-capitalize fw-7">Category: </span>
            <span>{item.category}</span>
          </div>
  
          <div className="book-item-info-item publish-year fs-15">
            <span className="text-capitalize fw-7">Access: </span>
            <span>{item.access}</span>
          </div>
          <div
            className="book-item-info-item publish-year fs-15 flex "
            style={{ gap: "10px" }}
          >
            
            <button class="save-btn" onClick={(e) => handleEdit(e)}>
              EDIT
            </button>
            <button class="save-btn" onClick={(e) => handlDelete(e)}>
              DELETE
            </button>
            <div class="save-icon" onClick={(e) => handleSave(e)}>
              <MdDataSaverOn className="save-icon" style={{width:"35px",height:"35px",fontWeight:'bolder' ,cursor:'pointer'}} />
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default Bookprivate
