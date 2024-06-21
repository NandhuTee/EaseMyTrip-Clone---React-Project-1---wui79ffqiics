
import React, { useState } from "react";
import Classes from "./Navbar.module.css";
import Avatar from '@mui/material/Avatar';
import { Box, Divider, Modal } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import { useAuth } from "../Context";
import ModalLogin from "./ModalLogin";
import { useNavigate } from "react-router-dom";

function Navbar() {
  // State variables and hooks initialization
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State for dropdown menu
  const [isDropdownhelpOpen, setDropdownhelpOpen] = useState(false); // State for help dropdown
  const { openLogin, setOpenLogin, isLoggedIn, setIsLoggedIn } = useAuth(); // Authentication context
  const navigate = useNavigate(); // React Router navigation hook

  // Local storage variables
  const UserIcon = localStorage.getItem("photo");
  const UserName = localStorage.getItem("userName");
  const isToken = localStorage.getItem("token");

  // Function to open user dropdown menu
  const openDropdown = () => {
    setDropdownOpen(true);
  };

  // Function to close user dropdown menu
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Function to open help dropdown menu
  const openDropdownhelp = () => {
    setDropdownhelpOpen(true);
  };

  // Function to close help dropdown menu
  const closeDropdownhelp = () => {
    setDropdownhelpOpen(false);
  };

  // Function to handle login/logout action
  const handleLoginLogout = () => {
    if (isToken) {
      localStorage.removeItem('token'); // Remove token from local storage
      setIsLoggedIn(false); // Update isLoggedIn state to false
    }
  };

  // Function to navigate to MyBooking page
  const handleMyBooking = () => {
    navigate("/mybooking"); // Navigate to /mybooking route
  };

  // Function to open login modal
  const handleOpenLogin = () => setOpenLogin(true);

  return (
    <div className={Classes.navbarEase}>
      {/* Navigation section */}
      <div className={Classes.navClickSection}>
        <div className={Classes.navContent}>
          {/* Logo section */}
          <div className={Classes.navLogoSection}>
            <NavLink to="/">
              <img
                className={Classes.logoEase}
                src="https://www.easemytrip.com/images/brandlogo/emtlogo_new6.svg"
                alt="logo Image"
              />
            </NavLink>
          </div>

          {/* Route links section */}
          <div className={Classes.navRouteContent}>
            <div className={Classes.clickSection}>
              <Link className={Classes.linkSection} to={"/"}>
                <h3 className={Classes.clickFLIGHTSH3}>FLIGHTS</h3>
              </Link>
              <Divider orientation="vertical" style={{ "height": "40%" }} />
              <Link className={Classes.linkSection} to={"/hotelhome"}>
                <h3 className={Classes.clickHOTELSH3}>HOTELS</h3>
              </Link>
              
            </div>
          </div>

          {/* Join section */}
          <div className={Classes.navJoinSection}>
            <img
              className={Classes.joinIcon}
              src="https://www.easemytrip.com/emt-pro/img/emtpro-header-icon.svg"
              alt="Join Icon"
            />
          </div>
        </div>
      </div>

      {/* User account section */}
      <div className={Classes.navUser}>
        <div className={Classes.myAcount}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          {/* User icon */}
          <div className={Classes.userIconNav}>
            <img
              className={Classes.iconMan}
              src="https://www.easemytrip.com/images/common/home-sub-sprite.png"
              alt="profile"
            />
          </div>

          {/* User account details */}
          <div className={Classes.navAcount}>
            <p>{isToken ? UserName : "My Account"}</p>
            {/* Dropdown content */}
            {isDropdownOpen && (
              <div className={Classes.dropdownContent}
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <div className={Classes.accountBox}>
                  {/* User avatar */}
                  <div className={Classes.avatar}>
                    {isToken ?
                      <Avatar src={UserIcon} />
                      : <Avatar />}
                  </div>

                  {/* Login button or user name */}
                  <div className={Classes.loginBtnSection}>
                    {isToken ? UserName : <button className={Classes.btnLogin} onClick={handleOpenLogin}>LOGIN OR SIGNUP</button>}
                  </div>

                  {/* Divider */}
                  <Divider className={Classes.dividerLogin} />

                  {/* My Bookings and Logout buttons */}
                  <div className={Classes.dropMyBookings}>
                    <ListItemButton onClick={handleMyBooking}>
                      <p className={Classes.bookingP}>My Booking</p>
                    </ListItemButton>
                    <ListItemButton onClick={handleLoginLogout}>
                      <p className={Classes.bookingP}>Log Out</p>
                    </ListItemButton>
                  </div>
                </div>
              </div>
            )}
            {/* Modal for Login */}
            {openLogin && (<ModalLogin />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
