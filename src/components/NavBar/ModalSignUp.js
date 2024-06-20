// Importing necessary libraries and components
import React, { useState } from "react";
import Classes from "./Navbar.module.css"; // Importing CSS module for styling
import { useAuth } from "../Context"; // Custom hook for authentication context
import Modal from "@mui/material/Modal"; // Material-UI Modal component

function ModalSignUp() {
  // State management using React hooks
  
  const { openSignUp, setOpenSignUp } = useAuth(); // Destructuring state and methods from authentication context(Manages the modal's open/close state)
  const [firstName, setFirstName] = useState(""); // State for first name input field
  const [lastName, setLastName] = useState(""); // State for last name input field
  const [mail, setMail] = useState(""); // State for email input field
  const [password, setPassword] = useState(""); // State for password input field
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages during signup
  const [correctCredential, setCorrectCredential] = useState(false); // State to track correct credentials

  // Regular expression pattern for validating email format
  const emailPattern = /^\S+@\S+\.\S+$/;

  // Handler for email input change and update state accordingly.
  function mailInput(e) {
    const mailSet = e.target.value;
    setMail(mailSet);
  }

  // Handler for password input change
  function passwordInput(e) {
    const passwordSet = e.target.value;
    setPassword(passwordSet);
  }

  // Handler for first name input change
  function firstNameInput(e) {
    const firstNameSet = e.target.value;
    setFirstName(firstNameSet);
  }

  // Handler for last name input change
  function lastNameInput(e) {
    const lastNameSet = e.target.value;
    setLasttName(lastNameSet);
  }

  // Function to handle signup process
  async function handleBusSignup() {
    // Validation checks before making the API call
    if (!firstName) {
      setCorrectCredential(false);
      setErrorMessage("First name is required.");
      return;
    }
    if (!mail || !password) {
      setCorrectCredential(false);
      setErrorMessage("Email and Password are required.");
      return;
    }
    if (!emailPattern.test(mail)) {
      setCorrectCredential(false);
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      // Making a POST request to the signup API endpoint
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
            email: mail,
            password: password,
            appType: "facebook", // Example app type
          }),
        }
      );

      // Handling different response scenarios from the API
      if (response.status === 403) {
        // If email is already registered
        setCorrectCredential(false);
        setErrorMessage(
          "Email is already registered. Please go and log in instead."
        );
      } else if (response.ok) {
        // Successful signup
        handleCloseSignUp();
      } else {
        // Other error scenarios
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setCorrectCredential(true);
        handleCloseSignUp();
      }
    } catch (error) {
      // Handling network or unexpected errors
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  }

  // Handler to close the signup modal
  const handleCloseSignUp = () => {
    setOpenSignUp(false);
  };

  // JSX for rendering the signup modal
  return (
    <div>
      <Modal
        open={openSignUp} // Modal open state
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={Classes.modalSignUpSection}>
          <div className="w-[95%] flex flex-col gap-[10px]">
            <div className="text-[22px] text-[#000] font-bold bg-[#fff] mt-[15px]">
              <p>SignUp or Create an account</p>
            </div>
            <div
              className={Classes.closeBtnSignUp}
              onClick={handleCloseSignUp}
            ></div>
            {/* Displaying error message based on credential validity */}
            <p
              className="errorDisplay"
              style={{
                display: correctCredential ? "none" : "",
                color: "red",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </p>
            {/* Input fields for first name, last name, email, and password */}
            <div className="w-[100%] flex gap-[2%] mt-[10px]">
              <input
                type="text"
                className="w-[49%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
                value={firstName}
                onChange={firstNameInput}
                placeholder="First name"
              />
              <input
                type="text"
                className="w-[49%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
                value={lastName}
                onChange={lastNameInput}
                placeholder="Last name"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <input
                type="email"
                className="w-[100%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
                value={mail}
                onChange={mailInput}
                placeholder="Email address"
              />

              <input
                type="password"
                className="w-[100%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
                value={password}
                onChange={passwordInput}
                placeholder="New password"
              />
            </div>
            {/* Continue button for signup */}
            <div className="w-[100%] flex items-center justify-center mt-[10px]">
              <div className="text-[18px] text-[#fff] w-[100%] h-[43px] font-[600] rounded-[40px] bg-[#EF6614] cursor-pointer flex items-center justify-center" onClick={handleBusSignup}>
                Continue
              </div>
            </div>
            {/* Terms of use and privacy policy */}
            <div className="w-[100%] flex justify-center items-center mt-[10px] mb-[15px]">
              <p className="w-[100%] text-[11px] text-[#8A8686] flex items-center">
                By logging in, I understand & agree to EaseMyTrip terms of use
                and privacy policy
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// Exporting ModalSignUp component as the default export from this module
export default ModalSignUp;



