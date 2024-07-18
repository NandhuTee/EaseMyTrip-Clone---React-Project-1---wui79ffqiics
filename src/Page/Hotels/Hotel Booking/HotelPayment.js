import React, { useState } from "react";
import Navbar from "../../../components/NavBar/Navbar"; // Importing Navbar component
import Classes from "../Hotels.module.css"; // Importing CSS modules
import upiQr from "../../../Design/PhonePayUpiQr.jpg"; // Importing UPI QR image
import { useAuth } from "../../../components/Context"; // Importing useAuth context hook
import Divider from "@mui/material/Divider"; // Importing Divider component from Material-UI
import PaymentSuccessfull from "../../Payment Successfull/PaymentSuccessfull"; // Importing PaymentSuccessfull component

function HotelPayment() {
  const [selectedOption, setSelectedOption] = useState("UPI"); // State for selected payment option (initially UPI)
  const bartoken = localStorage.getItem("token"); // Retrieving token from localStorage
  const [showSuccessfull, setShowSuccessfull] = useState(false); // State for showing payment success message
  const { fare, bookingId, bookingType, seatCount } = useAuth(); // Using useAuth hook to retrieve authentication context values
  const [allFieldsFilled, setAllFieldsFilled] = useState(false); // State for checking if all payment fields are filled

  // Handler for changing payment option
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  // Handler for input change (validates UPI ID or card details based on selected option)
  const handleInputChange = (event) => {
    const isUPIOption = selectedOption === "UPI";
    const isDebitCreditCardOption = selectedOption === "DebitCreditCard";

    let isValid = false;

    if (isUPIOption) {
      const isValidEmail = /^[^\s@]+@[^\s@]+$/.test(event.target.value.trim()); // Basic email validation for UPI ID
      isValid = isValidEmail;
    } else if (isDebitCreditCardOption) {
      isValid = event.target.value.trim() !== ""; // Checking if card details are filled
    }

    setAllFieldsFilled(isValid);
  };

  // Function to fetch payment data from API
  const fetchPaymentData = () => {
    if (allFieldsFilled) {
      // Fetching payment data if all fields are filled
      const api = "https://academics.newtonschool.co/api/v1/bookingportals/booking";

      fetch(api, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bartoken}`, // Setting Authorization header with token
          projectID: "uojmjpx76p25",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingType: bookingType,
          bookingDetails: {
            hotelId: bookingId,
            startDate: "2023-10-09T10:03:53.554+00:00",
            endDate: "2023-10-09T10:03:53.554+00:00",
          },
        }),
      }).then((response) => {
        if (response.ok) {
          setShowSuccessfull(!showSuccessfull); // Showing success message on successful payment
        }
      });
    }
  };

  return (
    <div>
      <Navbar /> {/* Rendering Navbar component */}
      {/* Main content area */}
      <div className="w-[100%] h-[100%] bg-[#e8f2fa] flex justify-center">
        <div className=" w-[90%] h-[100%] flex max-[600px]:flex-col flex-row gap-[20px] justify-between mb-[20px]">
          {/* Left section for payment options */}
          <div className=" w-[70.5%] max-[600px]:w-[100%] mt-[20px]">
            <div className={Classes.personalDetailHotel}>
              <div className={Classes.bookingHotelHeader}>
                <div className={Classes.PersPaymentmg}></div>
                <span>Payment Mode</span>
              </div>
              {/* Payment options section */}
              <div className="w-[100%] h-[100%] flex">
                <div className={Classes.paymentLeftSection}>
                  {/* UPI payment option */}
                  <div
                    style={{
                      borderTop: "2px solid lightgray",
                      width: "100%",
                      padding: "10px",
                      display: "flex",
                      cursor: "pointer",
                      backgroundColor:
                        selectedOption === "UPI" ? "white" : "transparent",
                    }}
                    onClick={() => handleOptionClick("UPI")}
                  >
                    <img
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "10px",
                      }}
                      src="https://starlinebattery.com/wp-content/uploads/2022/08/UPI_logo_PNG-300x300-1.jpg"
                      alt="UPI Logo"
                    />
                    <div>
                      <h3 style={{ color: "#008cff" }}>UPI Options</h3>
                      <p style={{ color: "gray", fontSize: "14px" }}>
                        Make Online Payments Directly from Bank
                      </p>
                    </div>
                  </div>
                  {/* Debit/Credit Card payment option */}
                  <div
                    style={{
                      borderTop: "2px solid lightgray",
                      borderBottom: "2px solid lightgray",
                      width: "100%",
                      padding: "10px",
                      cursor: "pointer",
                      display: "flex",
                      backgroundColor:
                        selectedOption !== "UPI" ? "white" : "transparent",
                    }}
                    onClick={() => handleOptionClick("DebitCreditCard")}
                  >
                    <img
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "10px",
                      }}
                      src="https://banner2.cleanpng.com/20180630/iyq/kisspng-credit-card-debit-card-clip-art-5b37907f1a4f07.4745129515303681271078.jpg"
                      alt="Debit/Credit Card Logo"
                    />
                    <div>
                      <h4>Credit/Cebit/ATM Card</h4>
                      <p style={{ fontSize: "11px", color: "gray" }}>
                        Visa,MasterCard,Amex,Rupay And <br /> More
                      </p>
                    </div>
                  </div>
                </div>
                {/* Payment form section */}
                <div className="w-[67%] max-[600px]:w-[100%] pt-[2%] pb-[2%] pl-[3%]">
                  {/* UPI payment form */}
                  {selectedOption === "UPI" && (
                    <div className="w-[100%] mt-[13px] flex flex-col justify-center items-center">
                      <span className="  w-[100%] text-[13px] font-[600] flex justify-between items-center">
                        <span className="w-[50%]">Enter Your UPI ID</span>{" "}
                        <span className="w-[38%]">Scan the Qr Code</span>
                      </span>
                      <div className="w-[100%] mt-[6px] flex">
                        <div className="w-[49%]">
                          <input
                            type="email"
                            className={Classes.paymentUpiInput}
                            onChange={handleInputChange}
                            placeholder="Enter Your UPI ID"
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "48%",
                          }}
                        >
                          <img
                            style={{ width: "150px", marginLeft: "10px" }}
                            src={upiQr}
                            alt="UPI QR Code"
                          />
                        </div>
                      </div>
                      {/* Total fare display */}
                      <div className="w-[100%] mt-[25px] flex items-center justify-between">
                        <div className="w-[50%] flex items-center">
                          <span className=" w-auto text-[#333333] text-[14px] font-bold pt-[5px] flex items-center gap-[5px]">
                            Total Fare : <i>₹</i>
                          </span>
                          <span className=" w-auto text-[#F00] text-[28px] font-bold mt-[1.5%] ml-[5px] flex items-center">
                            {Math.floor(fare * seatCount)}
                          </span>
                        </div>
                        {/* Payment button */}
                        <div
                          className={`w-[40%] items-center flex justify-end  ${
                            allFieldsFilled
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          }`}
                          onClick={fetchPaymentData}
                        >
                          <span
                            className={`text-[19px] w-[100%] p-[7px] rounded-[4px] text-[#ffffff] ${
                              allFieldsFilled ? "bg-[#ef6614]" : "bg-gray-400"
                            } flex justify-center`}
                            disabled={!allFieldsFilled}
                          >
                            Make Payment
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Debit/Credit Card payment form */}
                  {selectedOption === "DebitCreditCard" && (
                    <div style={{ padding: "10px 20px 20px 20px" }}>
                      <div className="w-[100%] flex flex-col">
                        <label className="text-[15px] pt-[3%]">
                          Card Number
                        </label>
                        <input
                          className=" mt-[10px] text-[14px] h-[50px] border border-solid border-[#ccc] rounded-[4px] p-[3%] focus:outline-none"
                          type="text"
                          placeholder="Enter Your Card Number Here"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-[100%] flex flex-col">
                        <label className="text-[15px] pt-[3%]">
                          Name on card
                        </label>
                        <input
                          className=" mt-[10px] text-[14px] h-[50px] border border-solid border-[#ccc] rounded-[4px] p-[3%] focus:outline-none"
                          type="text"
                          placeholder="Enter Your Name On Card"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="w-[100%] flex flex-col">
                        <label className="text-[15px] pt-[3%] ">
                          Expiry Month, Year & CVV
                        </label>
                        <div className="w-[100%] flex gap-[10px] mt-[10px]">
                          <div className="w-[32%]">
                            <input
                              className=" border border-solid border-[#ccc] text-[14px] rounded-[4px] h-[50px] p-[3%] bg-[#ffffff] focus:outline-none"
                              type="number"
                              placeholder="Month"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="w-[32%]">
                            <input
                              className="border border-solid border-[#ccc] text-[14px] rounded-[4px] h-[50px] p-[3%] bg-[#ffffff] focus:outline-none"
                              type="number"
                              placeholder="Year"
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="w-[30%] ">
                            <input
                              className="border border-solid border-[#ccc] text-[14px] rounded-[4px] h-[50px] p-[3%] bg-[#ffffff] focus:outline-none"
                              type="number"
                              placeholder="CVV"
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                      {/* Total fare display */}
                      <div className="w-[100%] mt-[25px] flex items-center justify-between">
                        <div className="w-[50%] flex items-center">
                          <span className=" w-auto text-[#333333] text-[14px] font-bold pt-[5px] flex items-center gap-[5px]">
                            Total Fare : <i>₹</i>
                          </span>
                          <span className=" w-auto text-[#F00] text-[28px] font-bold mt-[1.5%] ml-[5px] flex items-center">
                            {Math.floor(fare * seatCount)}
                          </span>
                        </div>
                        {/* Payment button */}
                        <div
                          className={`w-[40%] items-center flex justify-end  ${
                            allFieldsFilled
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                          }`}
                          onClick={fetchPaymentData}
                        >
                          <span
                            className={`text-[19px] w-[100%] p-[7px] rounded-[4px] text-[#ffffff] ${
                              allFieldsFilled ? "bg-[#ef6614]" : "bg-gray-400"
                            } flex justify-center`}
                            disabled={!allFieldsFilled}
                          >
                            Make Payment
                          </span>
                        </div>
                      </div>
                      {/* Terms and conditions */}
                      <p className="w-[100%] text-[12px] mt-[20px]">
                        By continuing to pay, I understand and agree with the{" "}
                        <span style={{ color: "#008cff" }}>privacy policy</span>
                        , the
                        <span style={{ color: "#008cff" }}>
                          {" "}
                          user agreement
                        </span>
                        , and
                        <span style={{ color: "#008cff" }}>
                          {" "}
                          terms of service
                        </span>
                        of EaseMyTrip
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Right section for price summary */}
          <div className="w-[26%] max-[600px]:w-[100%] mt-[60px] flex flex-col">
            <div className={Classes.hotelBookingAmont}>
              <div className={Classes.hotelBokkingAmountHeader}>
                <div className="text-[18px] text-[#1a1a1a] h-[50px] flex items-center ml-[10px]">
                  <p>Price Summary</p>
                </div>
              </div>
              <div className=" w-[100%]">
                {/* Fare details */}
                <div className="w-[100%] border-b-2  border-b-[#e5e3e3] flex justify-between">
                  <div className="w-[66%] pl-[4%] text-[13px] text-[#1a1a1a] h-[35px] flex items-center">
                    Adult x 1
                  </div>
                  <div className="w-[30%] text-[#1a1a1a] text-[12px] h-[35px] font-[600] flex items-center gap-[5px]">
                    <i>₹</i> {Math.floor(fare)}
                  </div>
                </div>
                <Divider flexItem />
                {/* Seat count */}
                <div className="w-[100%] border-b-2  border-b-[#e5e3e3] flex justify-between">
                  <div className="w-[66%] pl-[4%] text-[13px] text-[#1a1a1a] h-[35px] flex items-center">
                    Traveller
                  </div>
                  <div className="w-[30%] text-[#1a1a1a] text-[12px] h-[35px] font-[600] flex items-center gap-[5px]">
                    {seatCount} Traveller(s)
                  </div>
                </div>
                <Divider flexItem />
                {/* Total fare */}
                <div className="w-[100%] flex justify-between">
                  <div className="w-[66%] pl-[4%] text-[18px] text-[#d63b05] h-[35px] font-bold flex items-center">
                    Grand Total
                  </div>
                  <div className="w-[30%] text-[18px] text-[#d63b05] font-bold h-[35px] flex items-center gap-[5px]">
                    <i>₹</i>
                    {Math.floor(fare * seatCount)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Showing payment success message */}
        {showSuccessfull && <PaymentSuccessfull />}
      </div>
    </div>
  );
}

export default HotelPayment;
