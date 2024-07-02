import React, { useState, useEffect } from "react";
import Classes from "./Navbar.module.css";
import Avatar from '@mui/material/Avatar';
import { Box, Divider, Modal } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import { useAuth } from "../Context";
import ModalLogin from "./ModalLogin";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [userIcon, setUserIcon] = useState(localStorage.getItem("photo"));
  const [isToken, setIsToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const { openLogin, setOpenLogin, isLoggedIn, setIsLoggedIn } = useAuth();
  const [isDropdownhelpOpen, setDropdownhelpOpen] = useState(false);

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

  const openDropdownhelp = () => {
    setDropdownhelpOpen(true);
  };

  const closeDropdownhelp = () => {
    setDropdownhelpOpen(false);
  };

  const handleLoginLogout = () => {
    if (isToken) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setUserName(""); // Clear userName state on logout
    }
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
              <Divider orientation="vertical" style={{ height: "40%" }} />
              <Link className={Classes.linkSection} to={"/train"}>
                <h3 className={Classes.clickTRAINSH3}>TRAINS</h3>
              </Link>
              <Divider orientation="vertical" style={{ height: "40%" }} />
              <Link className={Classes.linkSection} to={"/bus"}>
                <h3 className={Classes.clickBUSH3}>BUS</h3>
              </Link>
            </div>
          </div>
          <div className={Classes.navJoinSection}>
            <img
              className={Classes.joinIcon}
              src="https://www.easemytrip.com/emt-pro/img/emtpro-header-icon.svg"
              alt="Join Icon"
            />
          </div>
        </div>
      </div>
      <div className={Classes.navUser}>
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
            <p>{isToken ? userName : "My Account"}</p>
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
                      userName
                    ) : (
                      <button className={Classes.btnLogin} onClick={handleOpenLogin}>
                        LOGIN OR SIGNUP
                      </button>
                    )}
                  </div>
                  <Divider className={Classes.dividerLogin} />
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
            {openLogin && <ModalLogin />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
