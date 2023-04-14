import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import logo from './logo.svg';
import "./App.css";
import AddForm from "./components/AddBookForm/AddForm.js";
import LoginSignup from "./components/LoginSignup/LoginSignup.js";
import Dashboard from "./components/MyPublication/MyPublication.js";
import BookDetails from "./components/BookDetails/BookDetails.jsx";
// import Header from "./components/Header/Header.jsx";
import EditForm from "./components/EditBookForm/EditForm";
import BookList from "./components/BookList/BookList";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

import BookShelf from "./components/BookShelf/BookShelf";
import PrivateLibrary from "./components/PrivateLibrary/PrivateLibrary";
import PublicLibrary from "./components/PublicLibrary/PublicLibrary";
import LoginHome from "./components/LoginHome/LoginHome.js"

function App() {

  // React.useEffect(
  //   ()=>{

  //   },
  //   []
  // )
  return (
    <>
      {/* Router wrapper is now used in index.js */}

      {/* <Router> */}
      <div className="App">
        
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/BookDetails/:id" element={<BookDetails />} />

          <Route path="/Register" element={<LoginSignup/>} />
          <Route path="/about/Register" element={<LoginSignup/>} />
          <Route path="/Dashboard/Register" element={<LoginSignup/>} />
          <Route path="/BookShelf/Register" element={<LoginSignup/>} />
          <Route path="/PrivateBooks/Register" element={<LoginSignup/>} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AddBook" element={<AddForm />} />
          <Route path="/Dashboard/AddBook" element={<AddForm />} />
          <Route path="/Dashboard/EditBook/:id" element={<AddForm />} />
          <Route path="/EditBook/:id" element={<EditForm />} />
          <Route path="/Dashboard/EditBook/:id" element={<EditForm />} />
          <Route path="/BookShelf/EditBook/:id" element={<EditForm />} />
          <Route path="/BookShelf" element={<BookShelf />} />
          <Route path="/PrivateBooks" element={<PrivateLibrary />} />
          <Route path="/PublicBooks" element={<PublicLibrary/>} />
          <Route path="/loginHome" element={<LoginHome/>}/>
        </Routes>
       
      </div>

      {/* Router wrapper is now used in index.js */}
      {/* </Router> */}
    </>
  );
}

export default App;
