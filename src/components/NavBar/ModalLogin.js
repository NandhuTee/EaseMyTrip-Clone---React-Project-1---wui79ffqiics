import React, { useState } from "react";
import { useAuth } from "../Context";
import Modal from "@mui/material/Modal";
import Classes from "./Navbar.module.css";
import ModalSignUp from "./ModalSignUp";

function ModalLogin() {
  const [errorMessage, setErrorMessage] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [correctCredential, setCorrectCredential] = useState(false);

  const { openLogin, setOpenLogin, openSignUp, setOpenSignUp, setIsLoggedIn } = useAuth();

  const handleCloseLogin = () => setOpenLogin(false);

  const mailInput = (e) => {
    setMail(e.target.value);
  };

  const passwordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginClick = async () => {
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/bookingportals/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: "wui79ffqiics",
          },
          body: JSON.stringify({
            email: mail,
            password: password,
            appType: "facebook",
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.data._id);
        localStorage.setItem("userName", data.data.name);
        localStorage.setItem(
          "photo",
          "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/590.jpg"
        );
        setIsLoggedIn(true);
        handleCloseLogin();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setCorrectCredential(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
      setCorrectCredential(true);
    }
  };

  const handleOpenSignUp = () => {
    setOpenSignUp(true);
  };

  return (
    <div>
      <Modal
        open={openLogin}
        onClose={handleCloseLogin}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={Classes.modalLoginSection}>
          <div style={{ width: "95%", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "22px", color: "#000", fontWeight: "bold", background: "#fff", marginTop: "15px" }}>
              <p>Login or Create an account</p>
            </div>
            <div className={Classes.closeBtn} onClick={handleCloseLogin}></div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", marginTop: "10px" }}>
              <p style={{ display: correctCredential ? "block" : "none", color: "red", textAlign: "center" }}>{errorMessage}</p>
              <input
                type="email"
                style={{ padding: "10px", border: "0.5px solid gray", borderRadius: "5px", outline: "none", marginTop: "10px" }}
                value={mail}
                onChange={mailInput}
                placeholder="Email address"
              />

              <input
                type="password"
                style={{ padding: "10px", marginTop: "15px", border: "0.5px solid gray", borderRadius: "5px", outline: "none", width: "100%", fontSize: "15px", color: "#000", background: "#fff" }}
                value={password}
                onChange={passwordInput}
                placeholder="Password"
              />
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "10px" }}>
              <div style={{ fontSize: "18px", color: "#fff", width: "100%", height: "43px", fontWeight: "600", borderRadius: "40px", background: "#EF6614", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={handleLoginClick}>
                Continue
              </div>
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ fontSize: "13px", color: "#0866FF", borderRadius: "40px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={handleOpenSignUp}>
                Create New Account?
              </div>
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "10px", marginBottom: "15px" }}>
              <p style={{ width: "100%", fontSize: "11px", color: "#8A8686", display: "flex", alignItems: "center" }}>
                By logging in, I understand & agree to EaseMyTrip terms of use and privacy policy
              </p>
            </div>
          </div>
        </div>
      </Modal>
      {openSignUp && <ModalSignUp />}
    </div>
  );
}

export default ModalLogin;
