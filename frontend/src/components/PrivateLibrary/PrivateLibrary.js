import "./PrivateLibrary.css";
import { InsertPhotoRounded } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
import { useGlobalContext } from "../../context.";
import Bookprivate from "./Bookprivate.jsx";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import {
  AccountCircleRounded,
  AssignmentTurnedInRounded,
  AttachMoneyRounded,
  BarChartRounded,
  ColorLensRounded,
  DashboardRounded,
  SettingsRemoteRounded,
  TocRounded,
} from "@material-ui/icons";
import Item from "./item.js";
import { useState } from "react";

function PrivateLibrary() {
  const [open, setOpen] = useState(true);

  // for collpsing sidebar
  const handleToggle = () => {
    setOpen(!open);
  };

  const sideContainerVariants = {
    true: {
      width: "25rem",
    },
    false: {
      transition: {
        delay: 0.6,
      },
    },
  };

  const sidebarVariants = {
    true: {},
    false: {
      width: "3rem",
      transition: {
        delay: 0.4,
      },
    },
  };

  const profileVariants = {
    true: {
      alignSelf: "center",
      width: "4rem",
    },
    false: {
      alignSelf: "flex-start",
      marginTop: "2rem",
      width: "3rem",
    },
  };

  const { data, isFetching, isLoading } = useQuery("all-books", async () => {
    return await axios.get("http://localhost:9000/allBooks");
  });
  console.log(data && data.data.books);
  const allBooks = data && data.data && data.data.books;

  return (
    <div className="main">
      <motion.div
        data-Open={open}
        variants={sideContainerVariants}
        initial={`${open}`}
        animate={`${open}`}
        className="sidebar_container"
      >
        {/* sidebar div */}
        <motion.div
          className="sidebar"
          initial={`${open}`}
          animate={`${open}`}
          variants={sidebarVariants}
        >
          {/* lines_icon */}
          <motion.div
            whileHover={{
              scale: 1.2,
              rotate: 180,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(3.5px)",
              WebkitBackdropFilter: "blur(3.5px)",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              transition: {
                delay: 0.2,
                duration: 0.4,
              },
            }}
            onClick={handleToggle}
            className="lines_icon"
          >
            <TocRounded />
          </motion.div>
          {/* profile */}
          <motion.div
            layout
            initial={`${open}`}
            animate={`${open}`}
            variants={profileVariants}
            className="profile"
            transition={{ duration: 0.4 }}
            whileHover={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              backdropFilter: "blur(5.5px)",
              WebkitBackdropFilter: "blur(5.5px)",
              border: "1px solid rgba( 255, 255, 255, 0.18 )",
              cursor: "pointer",
            }}
          ></motion.div>
          {/* groups */}
          <div className="groups">
            {/* group 1 */}
            <div className="group">
              <motion.h2
                animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
              >
                MyBookStack
              </motion.h2>
              <Link to="">
                <Item icon={<DashboardRounded />} name="Dashboard" />
              </Link>

              <Link to="/BookShelf">
                {" "}
                <Item icon={<BarChartRounded />} name="My Book Shelf" />
              </Link>
            </div>
          </div>
          {/* group 2 */}
          <div className="group">
            <motion.h2
              animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
            >
              Libaries
            </motion.h2>
            <Link>
              {" "}
              <Item icon={<AttachMoneyRounded />} name="My Publication" />
            </Link>

            <Link to="/PrivateBooks">
              {" "}
              <Item
                icon={<AssignmentTurnedInRounded />}
                name="Private Library"
              />
            </Link>

            <Link to="/PublicBooks">
              {" "}
              <Item icon={<AccountCircleRounded />} name="Public Library" />
            </Link>
          </div>
          {/* group 3 */}
          <div className="group">
            <motion.h2
              animate={{ opacity: open ? 1 : 0, height: open ? "auto" : 0 }}
            >
              CUSTOMIZATION
            </motion.h2>
            <Link>
              {" "}
              <Item icon={<SettingsRemoteRounded />} name="Segments" />
            </Link>
            <Link>
              {" "}
              <Item icon={<ColorLensRounded />} name="Themems" />
            </Link>
          </div>
          <Link to="/AddBook">
            {" "}
            <Item icon={<InsertPhotoRounded />} name="Add Book" />
          </Link>
        </motion.div>
      </motion.div>

      <div className="body_container">
        <Header />
        <section className="booklist">
          <div className="">
            <div className="section-title">
              <h2>Private Library</h2>
            </div>
            <div className="booklist-content grid">
              {data &&
                data.data &&
                data.data.books.slice(0, 30).map((item) => {
                  console.log(item.title);
                  return <Bookprivate item={item} />;
                })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PrivateLibrary;
