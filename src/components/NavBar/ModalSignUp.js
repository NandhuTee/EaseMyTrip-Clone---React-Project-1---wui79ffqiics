import React, { useState } from "react"; // Import React and useState hook
import Classes from "./Navbar.module.css"; // Import CSS module for styling
import { useAuth } from "../Context"; // Import custom authentication context
import Modal from "@mui/material/Modal"; // Import Modal component from MUI library

function ModalSignUp() {
  const { openSignUp, setOpenSignUp } = useAuth(); // Destructure authentication context
  const handleCloseSignUp = () => setOpenSignUp(false); // Function to close the sign-up modal
  const [firstName, setFirstName] = useState(""); // State for first name input
  const [lastName, setLasttName] = useState(""); // State for last name input
  const [mail, setMail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [correctCredential, setCorrectCredential] = useState(false); // State for credential validation
  const emailPattern = /^\S+@\S+\.\S+$/; // Regular expression pattern for email validation

  function mailInput(e) {
    const mailSet = e.target.value;
    setMail(mailSet); // Update mail state on input change
  }

  function passwordInput(e) {
    const passwordSet = e.target.value;
    setPassword(passwordSet); // Update password state on input change
  }

  function firstNameInput(e) {
    const firstNameSet = e.target.value;
    setFirstName(firstNameSet); // Update first name state on input change
  }

  function lastNameInput(e) {
    const lastNameSet = e.target.value;
    setLasttName(lastNameSet); // Update last name state on input change
  }

  async function handleBusSignup() {
    if (!firstName) { // Check if first name is empty
      setCorrectCredential(false);
      setErrorMessage("First name is required.");
      return;
    }
    if (!mail || !password) { // Check if email or password is empty
      setCorrectCredential(false);
      setErrorMessage("Email and Password are required.");
      return;
    }
    
    if (!emailPattern.test(mail)) { // Check if email is valid
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
            projectID: "uojmjpx76p25",
          },
          body: JSON.stringify({
            name: `${firstName} ${lastName}`, // Send name, email, and password in the request body
            email: mail,
            password: password,
            appType: "facebook",
          }),
        }
      );

      if (response.status === 403) { // Check if email is already registered
        setCorrectCredential(false);
        setErrorMessage("Email is already registered. Please go and log in instead.");
      } else if (response.ok) { // If response is OK
        handleCloseSignUp(); // Close sign-up modal
      } else { // If response is not OK
        const errorData = await response.json(); // Parse JSON error data
        setErrorMessage(errorData.message); // Set error message
        setCorrectCredential(true); // Set correctCredential to true
        handleCloseSignUp(); // Close sign-up modal
      }
    } catch (error) { // Catch any errors
      console.error("Error:", error); // Log error
      setErrorMessage("An error occurred. Please try again."); // Set error message
    }
  }

  return (
    <div>
      <Modal
        open={openSignUp} // Open sign-up modal if openSignUp is true
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={Classes.modalSignUpSection}>
          <div className="w-[95%] flex flex-col gap-[10px]">
            <div className="text-[22px] text-[#000] font-bold bg-[#fff] mt-[15px]">
              <p>SignUp or Create an account</p> {/* Title */}
            </div>
            <div className={Classes.closeBtnSignUp} onClick={handleCloseSignUp}></div> {/* Close button */}
            <p className="errorDisplay" style={{ display: correctCredential ? "none" : "", color: "red", textAlign: "center" }}>{errorMessage}</p> {/* Error message */}
            <div className="w-[100%] flex gap-[2%] mt-[10px]">
              <input
                type="text"
                className="w-[49%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
                value={firstName} // Bind first name input to firstName state
                onChange={firstNameInput} // Update firstName state on input change
                placeholder="First name"
              />
              <input
                type="text"
                className="w-[49%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
                value={lastName} // Bind last name input to lastName state
                onChange={lastNameInput} // Update lastName state on input change
                placeholder="Last name"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <input
                type="email"
                className="w-[100%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
                value={mail} // Bind email input to mail state
                onChange={mailInput} // Update mail state on input change
                placeholder="Email address"
              />
              <input
                type="password"
                className="w-[100%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
                value={password} // Bind password input to password state
                onChange={passwordInput} // Update password state on input change
                placeholder="New password"
              />
            </div>
            <div className="w-[100%] flex items-center justify-center mt-[10px]">
              <div className="text-[18px] text-[#fff] w-[100%] h-[43px] font-[600] rounded-[40px] bg-[#EF6614] cursor-pointer flex items-center justify-center" onClick={handleBusSignup}>Continue</div> {/* Sign-up button */}
            </div>
            <div className="w-[100%] flex justify-center items-center mt-[10px] mb-[15px]">
              <p className="w-[100%] text-[11px] text-[#8A8686] flex items-center">By logging in, I understand & agree to EaseMyTrip terms of use and privacy policy</p> {/* Terms and conditions */}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalSignUp; // Export ModalSignUp component
