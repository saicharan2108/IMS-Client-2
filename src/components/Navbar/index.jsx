import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { CgOptions } from "react-icons/cg";
import Popup from "reactjs-popup";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaEdit } from "react-icons/fa"; // Import the 'FaEdit' icon from 'react-icons/fa'

import "./index.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editedName, setEditedName] = useState(""); // New state for edited name
  const sidebarRef = useRef(null);
  const navigate = useNavigate();
  const location = window.location.pathname;
  const userDetails = JSON.parse(localStorage.getItem("user"));
  const { name, role } = userDetails;

  const updateNameInDatabase = async (newName) => {
    try {
      const response = await fetch("/api/updateName", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userDetails.id, // Assuming you have a unique userId in the database
          name: newName,
        }),
      });
      if (response.ok) {
        console.log("Name updated successfully in the database.");
        // Optionally, you can also update the name in the local storage if needed.
        localStorage.setItem("user", JSON.stringify({ ...userDetails, name: newName }));
      } else {
        console.error("Failed to update name in the database.");
      }
    } catch (error) {
      console.error("An error occurred while updating name in the database:", error);
    }
  };
  

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const activeLink = (path) => {
    if (location === path) {
      return "active-link";
    }
    return "";
  };

  const profileIconName = () => {
    const nameArray = editedName || name; // Use editedName if available, otherwise use name
    let initials = nameArray.split(" ").map((n) => n[0].toUpperCase()).join("");
    return initials;
  };

  const isAdmin = role === "admin";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle name change
  const handleNameChange = () => {
    // Code to update the name in the backend (not shown here).
    // For this example, let's assume the edited name is available in the variable 'editedName'.
    updateNameInDatabase(editedName); // Call the API to update the name in the database

    localStorage.setItem("user", JSON.stringify({ ...userDetails, name: editedName }));
    setEditedName(""); // Clear the editedName state after saving the changes.
  };

  // Function to handle opening the name edit popup
  const handleEditNameClick = () => {
    setEditedName(name); // Set the editedName state to the current name when the edit icon is clicked
  };

  return (
    <>
      <div className="hamburger-container">
        <RxHamburgerMenu className="hamburger" onClick={() => setIsOpen(true)} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="mobile-side-bar"
            initial={{
              x: "-100vw",
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: "-100vw",
            }}
            transition={{
              duration: 0.3,
            }}
            ref={sidebarRef}
          >
            <div>
              <RxCross2 className="cross" onClick={() => setIsOpen(false)} />
            </div>
            <div className="profile-container">
              <div className="profile-icon">{profileIconName()}</div>
              <div>
                {/* Render the edited name if available, otherwise render the original name */}
                <h3>{editedName || name}</h3>
                <p className="role">{role}</p>
              </div>
              <FaEdit className="edit-icon" onClick={handleEditNameClick} />
            </div>
            <div className="sidebar-sub">
              <ul className="nav-links">
                <Link to="/" className={`link ${activeLink("/")}`}>
                  <li>My Tasks</li>
                </Link>
                {/* Uncomment this section if needed */}
                {/* <Link to="/all-tasks" className={`link ${activeLink("/all-tasks")}`}>
                  <li>All Tasks</li>
                </Link> */}
                {isAdmin && (
                  <Link to="/admin/dashboard" className={`link ${activeLink("/admin/dashboard")}`}>
                    <li>Dashboard</li>
                  </Link>
                )}
                <Link to="/assigned-to-me" className={`link ${activeLink("/assigned-to-me")}`}>
                  <li>Assigned to Me</li>
                </Link>
                <Link to="/events" className={`link ${activeLink("/events")}`}>
                  <li>Events</li>
                </Link>
              </ul>
              <button
                type="button"
                className="logout-btn"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <nav className="desktop-sidebar">
        <img src="https://res.cloudinary.com/dlovqnrza/image/upload/v1689734240/PC-Logo-NEW-for-Website-Page-PNG-1-300x140_aqlfy0.png" className="Plogo" />
        <div className="profile-container">
          <div className="profile-icon">{profileIconName()}</div>
          <div>
            {/* Render the edited name if available, otherwise render the original name */}
            <h3>{editedName || name}</h3>
            <p className="role">{role}</p>
          </div>
          <FaEdit className="edit-icon" onClick={handleEditNameClick} />
        </div>
        <div className="sidebar-sub">
          <ul className="nav-links">
            <Link to="/" className={`link ${activeLink("/")}`}>
              <li>My Tasks</li>
            </Link>
            {/* Uncomment this section if needed */}
            {/* <Link to="/all-tasks" className={`link ${activeLink("/all-tasks")}`}>
              <li>All Tasks</li>
            </Link> */}
            {isAdmin && (
              <Link to="/admin/dashboard" className={`link ${activeLink("/admin/dashboard")}`}>
                <li>Dashboard</li>
              </Link>
            )}
            <Link to="/assigned-to-me" className={`link ${activeLink("/assigned-to-me")}`}>
              <li>Assigned to Me</li>
            </Link>
            <Link to="/events" className={`link ${activeLink("/events")}`}>
              <li>Events</li>
            </Link>
          </ul>
          <button
            type="button"
            className="logout-btn"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
        {/* Popup for editing the name */}
        <Popup
          open={editedName !== ""}
          closeOnDocumentClick
          onClose={() => setEditedName("")}
        >
          <div>
            <h2>Edit Name</h2>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <button onClick={handleNameChange}>Save</button>
          </div>
        </Popup>
      </nav>
    </>
  );
};

export default Navbar;
