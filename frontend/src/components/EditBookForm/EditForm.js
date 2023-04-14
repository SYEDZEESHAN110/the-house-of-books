import React, { useState } from "react";
import "./EditForm.css";
import logo from "./book.png";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FileBase64 from "react-file-base64";
import bookUpload from "../../images/Upload-Book.png";

const EditForm = () => {
  const { title, author, category, description, access, ISBN } = useSelector(
    (state) => ({
      title: state.EditFormReducer.title,
      author: state.EditFormReducer.author,
      category: state.EditFormReducer.category,
      description: state.EditFormReducer.description,
      access: state.EditFormReducer.access,
      ISBN: state.EditFormReducer.ISBN,
    })
  );

  const { id } = useParams();
  console.log(id);
  // const {bookId} = useSelector((state)=>({
  //   bookId: state.AddFormReducer.bookId
  // }))

  // const { user } = useSelector((state) => ({
  //   user: state.LoginSignupFormReducer.user,
  // }));

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  console.log("token edit wala", user);

  let mutation = useMutation({
    mutationFn: () => {
      axios
        .put(
          `http://localhost:9000/editBook/${id}`,
          {
            title: title,
            author: author,
            category: category,
            description: description,
            access: access,
            // accessPrivate: state.AddFormReducer.accessPrivate,
            ISBN: ISBN,
            image: postImage,
          },
          {
            headers: { Authorization: `Bearer ${user}` },
          }
        )
        .then((res) => {
          console.log("updatedBook", res);
        });
    },
  });

  const dispatch = useDispatch();

  const addition = (e) => {
    e.preventDefault();
    dispatch({ type: "INCREMENT_ID" });

    mutation.mutate();
    navigate("/Dashboard");
  };

  const [postImage, setPostImage] = useState({ image: "" });
  console.log(postImage);

  return (
    <div>
      <div className="BookForm">
        <div className="form-wrapper">
          <div className="Header">
            <img src={logo} alt="MyBookStack logo" className="Logo" />
            <h1 className="AppName">MYBOOKSTACK</h1>
          </div>
          <hr />
          <br />
          <h1>EDIT YOUR BOOK</h1>
          <form className="editform">
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

            <label htmlFor="image-upload" className="custom-file-upload">
              <img
                src={bookUpload}
                alt=""
                style={{ width: "155px", margin: "auto" }}
              />
            </label>

            <FileBase64
              id="image-upload"
              multiple={false}
              onDone={(base64) => setPostImage({ ...postImage, image: base64 })}
            />
            <br />
            <hr />

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
              value="EDIT"
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

export default EditForm;
