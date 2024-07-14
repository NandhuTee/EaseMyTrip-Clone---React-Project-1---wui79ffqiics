import React, { useState, useEffect } from "react"; // Import React, useState, and useEffect hooks
import Classes from "./Navbar.module.css"; // Import CSS module for styling
import Avatar from '@mui/material/Avatar'; // Import Avatar component from Material-UI
import { Divider } from "@mui/material"; // Import Divider component from Material-UI
import { Link, NavLink } from "react-router-dom"; // Import Link and NavLink components from React Router
import ListItemButton from "@mui/material/ListItemButton"; // Import ListItemButton component from Material-UI
import { useAuth } from "../Context"; // Import custom authentication context
import ModalLogin from "./ModalLogin"; // Import ModalLogin component
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from React Router

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for user dropdown menu
  const [isDropdownHelpOpen, setDropdownHelpOpen] = useState(false); // State for customer care dropdown
  const [userName, setUserName] = useState(localStorage.getItem("userName")); // State for username
  const [userIcon, setUserIcon] = useState(localStorage.getItem("photo")); // State for user icon
  const [isToken, setIsToken] = useState(localStorage.getItem("token")); // State for token
  const navigate = useNavigate(); // Hook for navigation
  const { openLogin, setOpenLogin, isLoggedIn, setIsLoggedIn } = useAuth(); // Destructure authentication context

  useEffect(() => {
    setUserName(localStorage.getItem("userName")); // Update username from localStorage
    setUserIcon(localStorage.getItem("photo")); // Update user icon from localStorage
    setIsToken(localStorage.getItem("token")); // Update token from localStorage
  }, [isLoggedIn]); // Run effect when isLoggedIn changes

  const openDropdown = () => {
    setDropdownOpen(true); // Open user dropdown menu
  };

  const closeDropdown = () => {
    setDropdownOpen(false); // Close user dropdown menu
  };

  const openDropdownHelp = () => {
    setDropdownHelpOpen(true); // Open customer care dropdown
  };

  const closeDropdownHelp = () => {
    setDropdownHelpOpen(false); // Close customer care dropdown
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("userName"); // Remove username from localStorage
    localStorage.removeItem("photo"); // Remove user icon from localStorage
    setIsLoggedIn(false); // Update isLoggedIn state
    setUserName(""); // Clear username state
    setUserIcon(""); // Clear user icon state
    setIsToken(null); // Clear token state
  };

  const handleMyBooking = () => {
    navigate("/mybooking"); // Navigate to MyBooking page
  };

  const handleOpenLogin = () => setOpenLogin(true); // Open login modal

  return (
    <div className={Classes.navbarEase}>
      <div className={Classes.navClickSection}>
        <div className={Classes.navContent}>
          <div className={Classes.navLogoSection}>
            <NavLink to="/">
              <img
                className={Classes.logoEase}
                src="https://www.easemytrip.com/images/brandlogo/emtlogo_new6.svg"
                alt="logo Image" // Alt text for logo image
              />
            </NavLink>
          </div>
          <div className={Classes.navRouteContent}>
            <div className={Classes.clickSection}>
              <Link className={Classes.linkSection} to={"/"}>
                <h3 className={Classes.clickFLIGHTSH3}>FLIGHTS</h3> {/* Link to Flights */}
              </Link>
              <Divider orientation="vertical" style={{ height: "40%" }} /> {/* Vertical divider */}
              <Link className={Classes.linkSection} to={"/hotelhome"}>
                <h3 className={Classes.clickHOTELSH3}>HOTELS</h3> {/* Link to Hotels */}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={Classes.navUser}>
        {/* Customer Care Section */}
        <div
          className={Classes.customerCare}
          onMouseEnter={openDropdownHelp} // Open customer care dropdown on mouse enter
          onMouseLeave={closeDropdownHelp} // Close customer care dropdown on mouse leave
        >
          <div className={Classes.careIcon}>
            {/* Replace the image with text or icon */}
            <p className={Classes.customerCareText}>Customer Care</p> {/* Customer care text */}
          </div>
          <div className={Classes.navCare}>
            {isDropdownHelpOpen && (
              <div
                className={Classes.dropdownCareContent}
                onMouseEnter={openDropdownHelp} // Keep customer care dropdown open on mouse enter
                onMouseLeave={closeDropdownHelp} // Close customer care dropdown on mouse leave
              >
                <div className={Classes.careBox}>
                  <div className={Classes.careCall}>
                    <p>Call us at:</p>
                    <p className={Classes.careNumber}>1800-123-456</p> {/* Customer care phone number */}
                  </div>
                  <Divider className={Classes.dividerCare} /> {/* Divider */}
                  <div className={Classes.careMail}>
                    <p>Email us at:</p>
                    <p className={Classes.careEmail}>support@easemytrip.com</p> {/* Customer care email */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className={Classes.myAcount}
          onMouseEnter={openDropdown} // Open user dropdown on mouse enter
          onMouseLeave={closeDropdown} // Close user dropdown on mouse leave
        >
          <div className={Classes.userIconNav}>
            <img
              className={Classes.iconMan}
              src="https://www.easemytrip.com/images/common/home-sub-sprite.png"
              alt="profile" // Alt text for profile icon
            />
          </div>
          <div className={Classes.navAcount}>
            <p>{isToken ? `Hi, ${userName}` : "My Account"}</p> {/* Display username if logged in, otherwise display "My Account" */}
            {isDropdownOpen && (
              <div
                className={Classes.dropdownContent}
                onMouseEnter={openDropdown} // Keep user dropdown open on mouse enter
                onMouseLeave={closeDropdown} // Close user dropdown on mouse leave
              >
                <div className={Classes.accountBox}>
                  <div className={Classes.avatar}>
                    {isToken ? (
                      <Avatar src={userIcon} /> // Display user avatar if logged in
                    ) : (
                      <Avatar /> // Display default avatar if not logged in
                    )}
                  </div>
                  <div className={Classes.loginBtnSection}>
                    {isToken ? (
                      <button className={Classes.btnLogin} onClick={handleLogout}>
                        Logout
                      </button> // Display logout button if logged in
                    ) : (
                      <button className={Classes.btnLogin} onClick={handleOpenLogin}>
                        Login
                      </button> // Display login button if not logged in
                    )}
                  </div>
                  {isToken && (
                    <>
                      <Divider className={Classes.dividerLogin} /> {/* Divider */}
                      <div className={Classes.dropMyBookings}>
                        <ListItemButton onClick={handleMyBooking}>
                          <p className={Classes.bookingP}>My Booking</p> {/* Link to My Booking */}
                        </ListItemButton>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            {openLogin && <ModalLogin />} {/* Render ModalLogin component if openLogin is true */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar; // Export Navbar component
