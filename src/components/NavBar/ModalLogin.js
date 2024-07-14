import React, { useState } from "react"; // Import React and useState hook
import { useAuth } from "../Context"; // Import custom authentication context
import Modal from "@mui/material/Modal"; // Import Modal component from MUI library
import Classes from "./Navbar.module.css"; // Import CSS module for styling
import ModalSignUp from "./ModalSignUp"; // Import ModalSignUp component

function ModalLogin() {
  const { openLogin, setOpenLogin, openSignUp, setOpenSignUp, setIsLoggedIn } = useAuth(); // Destructure authentication context
  const [mail, setMail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [correctCredential, setCorrectCredential] = useState(false); // State for credential validation
  const [userName, setUserName] = useState(""); // State for storing userName

  const handleCloseLogin = () => setOpenLogin(false); // Function to close the login modal

  const handleLoginClick = async () => { // Function to handle login click
    try {
      const response = await fetch("https://academics.newtonschool.co/api/v1/bookingportals/login", { // API call for login
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectID: "uojmjpx76p25",
        },
        body: JSON.stringify({
          email: mail,
          password: password,
          appType: "facebook",
        }),
      });

      if (response.ok) { // If response is OK
        const data = await response.json(); // Parse JSON data from response

        // Update localStorage with user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.data._id);
        localStorage.setItem("userName", data.data.name);
        localStorage.setItem("photo", "https://pixabay.com/illustrations/icon-user-male-avatar-business-5359553/");
        console.log(data.data.name); // Log user name

        setUserName(data.data.name); // Update userName state
        setIsLoggedIn(true); // Set user as logged in
        handleCloseLogin(); // Close login modal
      } else { // If response is not OK
        const errorData = await response.json(); // Parse JSON error data
        setErrorMessage(errorData.message); // Set error message
        setCorrectCredential(true); // Set correctCredential to true
      }
    } catch (error) { // Catch any errors
      console.error("Error:", error); // Log error
      setErrorMessage("An error occurred. Please try again."); // Set error message
    }
  };

  const handleOpenSignUp = () => { // Function to open sign-up modal
    setOpenSignUp(true);
  };

  return (
    <div>
      <Modal
        open={openLogin} // Open login modal if openLogin is true
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={Classes.modalLoginSection}>
          <div className="w-[95%] flex flex-col gap-[10px]">
            <div className="text-[22px] text-[#000] font-bold bg-[#fff] mt-[15px]">
              <p>Login or Create an account</p> {/* Title */}
            </div>
            <div className={Classes.closeBtn} onClick={handleCloseLogin}></div> {/* Close button */}
            <div className="w-[100%] flex flex-col mt-[10px]">
              <p style={{ display: !correctCredential ? "none" : "", color: "red", textAlign: "center" }}>{errorMessage}</p> {/* Error message */}
              <input
                type="email"
                className="p-[10px] border-[0.5px] border-solid border-gray-200 rounded-[5px] focus:outline-none mt-[10px]"
                value={mail} // Bind email input to mail state
                onChange={(e) => setMail(e.target.value)} // Update mail state on input change
                placeholder="Email address"
              />
              <input
                type="password"
                className="p-[10px] mt-[15px] border-[0.5px] border-solid border-gray-200 rounded-[5px] text-[15px] text-[#000000] bg-[#fff] w-[100%] focus:outline-none"
                value={password} // Bind password input to password state
                onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                placeholder="Password"
              />
            </div>
            <div className="w-[100%] flex items-center justify-center mt-[10px]">
              <div
                className="text-[18px] text-[#fff] w-[100%] h-[43px] font-[600] rounded-[40px] bg-[#EF6614] cursor-pointer flex items-center justify-center"
                onClick={handleLoginClick} // Handle login click
              >
                Continue
              </div>
            </div>
            <div className="w-[100%] flex items-center justify-center">
              <div className="text-[13px] text-[#0866FF] rounded-[40px] cursor-pointer flex items-center justify-center" onClick={handleOpenSignUp}>
                Create New Account ?
              </div>
            </div>
            <div className="w-[100%] flex justify-center items-center mt-[10px] mb-[15px]">
              <p className="w-[100%] text-[11px] text-[#8A8686] flex items-center">
                By logging in, I understand & agree to EaseMyTrip terms of use and privacy policy
              </p>
            </div>
          </div>
        </div>
      </Modal>
      {openSignUp && <ModalSignUp />} {/* Conditionally render sign-up modal */}
    </div>
  );
}

export default ModalLogin; // Export ModalLogin component
