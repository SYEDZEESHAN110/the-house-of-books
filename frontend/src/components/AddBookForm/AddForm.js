import React, { useState } from "react";
import "./AddForm.css";

import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import FileBase64 from "react-file-base64";
import bookUpload from "../../images/Upload-Book.png";

const AddForm = () => {
  const { bookId, id, title, author, category, description, access, ISBN } =
    useSelector((state) => ({
      bookId: state.AddFormReducer.bookId,
      id: state.AddFormReducer.id,
      title: state.AddFormReducer.title,
      author: state.AddFormReducer.author,
      category: state.AddFormReducer.category,
      description: state.AddFormReducer.description,
      access: state.AddFormReducer.access,
      ISBN: state.AddFormReducer.ISBN,
    }));

  const navigate = useNavigate();

  // const { user } = useSelector((state) => ({
  //   user: state.LoginSignupFormReducer.user,
  // }));

  const user = JSON.parse(localStorage.getItem("user"));

  console.log("token add wala", user);

  let mutation = useMutation({
    mutationFn: () => {
      axios
        .post(
          "http://localhost:9000/addBook",
          {
            title: title,
            author: author,
            category: category,
            description: description,
            access: access,
            // accessPrivate: state.AddFormReducer.accessPrivate,
            ISBN: ISBN,
            image: postImage,
            // rating: rating,
          },
          {
            headers: { Authorization: `Bearer ${user}` },
          }
        )
        .then((res) => {
          if (res.status === 200 || 201) {
            const bookId = res.data.books._id;
            dispatch({ type: "INCREMENT_BOOKID", payload: bookId });
            console.log("Book added success");
            console.log(bookId);
            console.log("uploaded");
          }
        });
    },
  });

  const dispatch = useDispatch();

  const addition = (e) => {
    e.preventDefault();
    dispatch({ type: "INCREMENT_ID" });
    mutation.mutate();
  };

  const [postImage, setPostImage] = useState({image:""} );
  console.log(postImage);

  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   const base64 = await convertToBase64(file);
  //   setPostImage({ ...postImage, myFile: base64 });
  // };

  return (
    <div>
      <div className="BookForm">
        <button
          type="button"
          className="goBack flex flex-c back-btn"
          style={{ marginTop: "40px", color: "white" }}
          onClick={() => navigate("/Dashboard")}
        >
          <FaArrowLeft size={22} />
          <span className="fs-18 fw-6">Go Back</span>
        </button>
        <div className="form-wrapper">
          <div className="Header">
           
            <h1 className="AppName">THE HOUSE OF BOOK</h1>
          </div>
          <hr />
          <br />
          <h1>Add New Book</h1>
          <form className="addform" onSubmit={addition}>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => {
                dispatch({ type: "INCREMENT_TITLE", payload: e.target.value });
              }}
            />

            <label>Author Name</label>
            <input
              type="text"
              name="author"
              value={author}
              onChange={(e) => {
                dispatch({ type: "INCREMENT_AUTHOR", payload: e.target.value });
              }}
            />

            <label>ISBN Number</label>
            <input
              type="text"
              name="isbn"
              value={ISBN}
              onChange={(e) => {
                dispatch({ type: "INCREMENT_ISBN", payload: e.target.value });
              }}
            />

            <label>Category</label>
            <select
              className="category"
              name="category"
              value={category}
              onChange={(e) => {
                dispatch({
                  type: "INCREMENT_CATEGORY",
                  payload: e.target.value,
                });
              }}
            >
              <option value="">Select a Category</option>
              <option value="fiction">Programing</option>
              <option value="fiction">Islamic</option>
              <option value="non-fiction">Sports</option>
              <option value="fiction">Fiction</option>
              <option value="non-fiction">Sports</option>
            </select>

            <label>Access</label>
            <select
              className="category"
              name="access"
              value={access}
              onChange={(e) => {
                dispatch({ type: "INCREMENT_ACCESS", payload: e.target.value });
              }}
            >
              <option value="">Select a Access</option>
              <option value="private">Private</option>
              <option value="public">Public</option>
            </select>
            <br />
            <br />

            <label>Cover Image</label>

            <label htmlFor="image-upload" className="custom-file-upload">
              <img
                src={bookUpload}
                alt=""
                style={{ width: "155px", margin: "auto" }}
              />
            </label>
            {/* <input
              type="file"
              label="Image"
              name="myImage"
              id="image-upload"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleImageUpload(e)}
            /> */}
            <FileBase64
            id="image-upload"
              multiple={ false}
              onDone={(base64)=>setPostImage({...postImage,
              image: base64}) }
            />
            <br />
            <hr />
            <br />

            <label>Description</label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => {
                dispatch({
                  type: "INCREMENT_DESCRIPTION",
                  payload: e.target.value,
                });
              }}
            ></textarea>

            <input
              type="submit"
              value="ADD"
              onClick={(e) => {
                addition(e);
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddForm;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
