import React, { useState, useEffect } from "react";
import Classes from "./Navbar.module.css";
import Avatar from '@mui/material/Avatar';
import { Divider } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import { useAuth } from "../Context";
import ModalLogin from "./ModalLogin";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownHelpOpen, setDropdownHelpOpen] = useState(false); // State for customer care dropdown
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userIcon, setUserIcon] = useState(localStorage.getItem("photo"));
  const [isToken, setIsToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const { openLogin, setOpenLogin, isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    setUserName(localStorage.getItem("userName"));
    setUserIcon(localStorage.getItem("photo"));
    setIsToken(localStorage.getItem("token"));
  }, [isLoggedIn]);

  const openDropdown = () => {
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const openDropdownHelp = () => {
    setDropdownHelpOpen(true);
  };

  const closeDropdownHelp = () => {
    setDropdownHelpOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("photo");
    setIsLoggedIn(false);
    setUserName(""); // Clear userName state on logout
    setUserIcon(""); // Clear userIcon state on logout
    setIsToken(null); // Clear token state on logout
  };

  const handleMyBooking = () => {
    navigate("/mybooking");
  };

  const handleOpenLogin = () => setOpenLogin(true);

  return (
    <div className={Classes.navbarEase}>
      <div className={Classes.navClickSection}>
        <div className={Classes.navContent}>
          <div className={Classes.navLogoSection}>
            <NavLink to="/">
              <img
                className={Classes.logoEase}
                src="https://www.easemytrip.com/images/brandlogo/emtlogo_new6.svg"
                alt="logo Image"
              />
            </NavLink>
          </div>
          <div className={Classes.navRouteContent}>
            <div className={Classes.clickSection}>
              <Link className={Classes.linkSection} to={"/"}>
                <h3 className={Classes.clickFLIGHTSH3}>FLIGHTS</h3>
              </Link>
              <Divider orientation="vertical" style={{ height: "40%" }} />
              <Link className={Classes.linkSection} to={"/hotelhome"}>
                <h3 className={Classes.clickHOTELSH3}>HOTELS</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={Classes.navUser}>
        {/* Customer Care Section */}
        <div
          className={Classes.customerCare}
          onMouseEnter={openDropdownHelp}
          onMouseLeave={closeDropdownHelp}
        >
          <div className={Classes.careIcon}>
            {/* Replace the image with text or icon */}
            <p className={Classes.customerCareText}>Customer Care</p>
          </div>
          <div className={Classes.navCare}>
            {isDropdownHelpOpen && (
              <div
                className={Classes.dropdownCareContent}
                onMouseEnter={openDropdownHelp}
                onMouseLeave={closeDropdownHelp}
              >
                <div className={Classes.careBox}>
                  <div className={Classes.careCall}>
                    <p>Call us at:</p>
                    <p className={Classes.careNumber}>1800-123-456</p>
                  </div>
                  <Divider className={Classes.dividerCare} />
                  <div className={Classes.careMail}>
                    <p>Email us at:</p>
                    <p className={Classes.careEmail}>support@easemytrip.com</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className={Classes.myAcount}
          onMouseEnter={openDropdown}
          onMouseLeave={closeDropdown}
        >
          <div className={Classes.userIconNav}>
            <img
              className={Classes.iconMan}
              src="https://www.easemytrip.com/images/common/home-sub-sprite.png"
              alt="profile"
            />
          </div>
          <div className={Classes.navAcount}>
            <p>{isToken ? `Hi, ${userName}` : "My Account"}</p>
            {isDropdownOpen && (
              <div
                className={Classes.dropdownContent}
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <div className={Classes.accountBox}>
                  <div className={Classes.avatar}>
                    {isToken ? (
                      <Avatar src={userIcon} />
                    ) : (
                      <Avatar />
                    )}
                  </div>
                  <div className={Classes.loginBtnSection}>
                    {isToken ? (
                      <button className={Classes.btnLogin} onClick={handleLogout}>
                        Logout
                      </button>
                    ) : (
                      <button className={Classes.btnLogin} onClick={handleOpenLogin}>
                        Login
                      </button>
                    )}
                  </div>
                  {isToken && (
                    <>
                      <Divider className={Classes.dividerLogin} />
                      <div className={Classes.dropMyBookings}>
                        <ListItemButton onClick={handleMyBooking}>
                          <p className={Classes.bookingP}>My Booking</p>
                        </ListItemButton>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
            {openLogin && <ModalLogin />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
