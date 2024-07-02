import React,{useState} from "react";
import { useAuth } from "../Context";
import Modal from "@mui/material/Modal";
import Classes from "./Navbar.module.css"
import ModalSignUp from "./ModalSignUp";
function ModalLogin() {
  const handleCloseLogin = () => setOpenLogin(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { openLogin, setOpenLogin,openSignUp, setOpenSignUp, setIsLoggedIn } = useAuth();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [correctCredential,setCorrectCredential]=useState(false);
  function mailInput(e) {
    const mailSet = e.target.value;
    setMail(mailSet);
  }

  function passwordInput(e) {
    const passwordSet = e.target.value;
    setPassword(passwordSet);
  }

  async function handleLoginClick() {
    
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/bookingportals/login",
        {
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
        }
      );
      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.data._id);
        localStorage.setItem("userName",data.data.name);
        localStorage.setItem("photo","https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/590.jpg");
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
    }
  }

  const handleOpenSignUp= () => {
    setOpenSignUp(true);
}
  return (
    <div>
      <Modal
        open={openLogin}
       
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={Classes.modalLoginSection}>
          <div className="w-[95%] flex flex-col gap-[10px]">
            <div className="text-[22px] text-[#000] font-bold bg-[#fff] mt-[15px]">
              <p>Login or Create an account</p>
            </div>
            <div className={Classes.closeBtn} onClick={handleCloseLogin}></div>
            <div className="w-[100%] flex flex-col  mt-[10px]">
              <p style={{display:!correctCredential?"none":"",color:"red",textAlign:"center"}}>{errorMessage}</p>
              <input
                type="email"
                className="p-[10px] border-[0.5px] border-solid border-gray-200 rounded-[5px] focus:outline-none mt-[10px]"
                value={mail}
                onChange={mailInput}
                placeholder="Email address"
              />

              <input
                type="password"
                className="p-[10px] mt-[15px] border-[0.5px] border-solid border-gray-200 rounded-[5px] text-[15px] text-[#000000] bg-[#fff] w-[100%] focus:outline-none"
                value={password}
                onChange={passwordInput}
                placeholder="Password"
              />
            </div>
            <div className="w-[100%] flex items-center justify-center mt-[10px]">
              <div className="text-[18px] text-[#fff] w-[100%] h-[43px] font-[600] rounded-[40px] bg-[#EF6614] cursor-pointer flex items-center justify-center"  onClick={handleLoginClick}>Continue</div>
            </div>
            <div className="w-[100%] flex items-center justify-center">
              <div className="text-[13px] text-[#0866FF]   rounded-[40px] cursor-pointer flex items-center justify-center" onClick={handleOpenSignUp}>Create New Account ?</div>
            </div>
            <div className="w-[100%] flex justify-center items-center mt-[10px] mb-[15px]">
              <p className="w-[100%] text-[11px] text-[#8A8686] flex items-center">By logging in, I understand & agree to EaseMyTrip terms of use  and privacy policy</p>
            </div>
          </div>
          
        </div>
      </Modal>
      {openSignUp &&(<ModalSignUp/>)}
    </div>
  );
}
export default ModalLogin;
