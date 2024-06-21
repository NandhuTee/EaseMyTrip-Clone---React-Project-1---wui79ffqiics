import React, { useState } from "react";
import Classes from "./Navbar.module.css";
import { useAuth } from "../Context";
import Modal from "@mui/material/Modal";

function ModalSignUp() {
  const { openSignUp, setOpenSignUp } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [correctCredential, setCorrectCredential] = useState(false);

  const emailPattern = /^\S+@\S+\.\S+$/;

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  async function handleSignUp() {
    if (!firstName) {
      setCorrectCredential(false);
      setErrorMessage("First name is required.");
      return;
    }
    if (!email || !password) {
      setCorrectCredential(false);
      setErrorMessage("Email and Password are required.");
      return;
    }
    if (!emailPattern.test(email)) {
      setCorrectCredential(false);
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/bookingportals/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: "wui79ffqiics",
          },
          body: JSON.stringify({
            name: `${firstName} ${lastName}`,
            email: email,
            password: password,
            appType: "facebook",
          }),
        }
      );

      if (response.status === 403) {
        setCorrectCredential(false);
        setErrorMessage(
          "Email is already registered. Please log in instead."
        );
      } else if (response.ok) {
        handleCloseSignUp();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setCorrectCredential(true);
        handleCloseSignUp();
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  }

  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  return (
    <Modal
      open={openSignUp}
      onClose={handleCloseSignUp}
      aria-labelledby="modal-signup-title"
      aria-describedby="modal-signup-description"
    >
      <div className={Classes.modalSignUpSection}>
        <div className={Classes.closeBtnSignUp} onClick={handleCloseSignUp}></div>
        <h2 id="modal-signup-title">Sign Up or Create an Account</h2>
        <p
          className={Classes.errorDisplay}
          style={{ display: correctCredential ? "none" : "" }}
        >
          {errorMessage}
        </p>
        <div className={Classes.inputFieldContainer}>
          <input
            type="text"
            className={Classes.inputField}
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="First name"
          />
          <input
            type="text"
            className={Classes.inputField}
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Last name"
          />
        </div>
        <input
          type="email"
          className={Classes.inputField}
          value={email}
          onChange={handleEmailChange}
          placeholder="Email address"
        />
        <input
          type="password"
          className={Classes.inputField}
          value={password}
          onChange={handlePasswordChange}
          placeholder="New password"
        />
        <button
          className={Classes.buttonPrimary}
          onClick={handleSignUp}
        >
          Continue
        </button>
        <p className={Classes.disclaimerText}>
          By signing up, I understand & agree to EaseMyTrip's terms of use and privacy policy.
        </p>
      </div>
    </Modal>
  );
}

export default ModalSignUp;
