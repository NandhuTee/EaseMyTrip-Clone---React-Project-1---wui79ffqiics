import React, { useState, useEffect } from "react";
import Navbar from "../../../components/NavBar/Navbar";
import { useAuth } from "../../../components/Context";
import Classes from "../Hotels.module.css";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";

function HotelBooking() {
  // State variables
  const [hotelDetailError, setHotelDetailError] = useState(null);
  const navigate = useNavigate();
  const [hotelBookingDetailData, setHotelBookingDetailData] = useState([]);
  const {
    hotelBookingId,
    hotelDepartureDate,
    seatHotelCount,
    isSelectedDayCheckOut,
    setGuestName,
    setGuestLastName,
    setFare,
    setBookingId,
    setBookingType,
  } = useAuth();

  // Date formatting
  const departureDay = moment(hotelDepartureDate).format("ddd");
  const departureDate = moment(hotelDepartureDate).format("DD MMM YYYY");
  const departureNoDate = moment(hotelDepartureDate).format("DD");
  const departureMontDate = moment(hotelDepartureDate).format("MMM");
  const departureYearDate = moment(hotelDepartureDate).format("YYYY");
  const departureCheckOutNoDate = moment(isSelectedDayCheckOut).format("DD");
  const departureMonthCheckOutDate = moment(isSelectedDayCheckOut).format(
    "MMM"
  );
  const departureYearCheckOutDate = moment(isSelectedDayCheckOut).format(
    "YYYY"
  );

  // Form input states and error handling
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  // Fetch hotel booking data
  const fetchSingleHotelData = async () => {
    try {
      const projectID = "uojmjpx76p25";
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/hotel/${hotelBookingId}`,
        {
          method: "GET",
          headers: {
            projectID,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setHotelBookingDetailData(data?.data);
      } else {
        const errorData = await response.json();
        setHotelDetailError(errorData.message);
      }
    } catch (error) {
      console.error("Error fetching hotel data:", error);
      setHotelDetailError("Failed to fetch hotel data");
    }
  };

  useEffect(() => {
    fetchSingleHotelData();
  }, [hotelBookingId]);

  // Handle input changes for guest names
  function handleFirstNameChange(e) {
    const firstName = e.target.value;
    setFirstName(firstName);
    setFirstNameError("");
  }

  function handleLastNameChange(e) {
    const lastName = e.target.value;
    setLastName(lastName);
    setLastNameError("");
  }

  // Handle payment and navigate to payment page
  const handlePayment = (hotelFare, bookingType, hotelId) => {
    if (!firstName.trim()) {
      setFirstNameError("First Name is required");
      return;
    }
    if (!lastName.trim()) {
      setLastNameError("Last Name is required");
      return;
    }
    setFare(hotelFare);
    setBookingId(hotelId);
    setBookingType(bookingType);
    navigate("/hotelpayment");
  };

  return (
    <div>
      <Navbar />
      <div className="w-[100%] h-[100%] bg-[#e8f2fa] flex justify-center">
        <div className="w-[90%] h-[100%] max-[600px] flex flex-row gap-[20px] justify-between">
          {/* Hotel booking details section */}
          <div className="w-[70.5%] max-[600px] mt-[20px]">
            <div className={Classes.bookingHotelData}>
              <div className={Classes.bookingHotelHeader}>
                <div className={Classes.hotelbookingImg}></div>
                <span>Hotel Detail</span>
              </div>
              <div className="w-[96%]">
                <div className={Classes.hotelBookingDetails}>
                  <div className="w-[98%] mt-[30px] mb-[25px] max-[600px] flex gap-[5px] justify-between">
                    {/* Hotel image section */}
                    <div className="w-[32%] max-[600px]">
                      <div className="w-[100%] h-[280px]">
                        <img
                          className="w-[100%] h-[100%]"
                          src={hotelBookingDetailData?.images?.[1]}
                          alt="Hotel Image"
                        />
                      </div>
                    </div>
                    {/* Hotel details section */}
                    <div className="w-[64%] max-[600px]">
                      <div className="text-[15px] text-[#1a1a1a] flex w-[100%]">
                        <div className="flex gap-[7px] items-center mt-[10px]">
                          <span className="text-[20px] font-[600] text-[#333]">
                            {hotelBookingDetailData?.name}
                          </span>{" "}
                          |
                          <span className="text-[12px] text-[#6a6868]">
                            {departureDay} - {departureDate}
                          </span>
                        </div>
                      </div>
                      <span className="text-[13px] text-[#737373] w-[100%]">
                        {hotelBookingDetailData?.location}
                      </span>
                      {/* Check-in and Check-out dates */}
                      <div className="w-[100%] flex mt-[30px] max-[600px] justify-center">
                        {/* Check-in details */}
                        <div className="w-[36%] flex flex-col">
                          <div className="w-[100%] text-[14px] text-[#333]">
                            <p className="flex items-center">Check-In</p>
                          </div>
                          <div className="w-[100%] text-[42px] text-[#000] h-[42px] flex items-center gap-[5px] mt-[10px]">
                            {departureNoDate}
                            <div className="flex flex-col justify-center">
                              <span className="text-[12px] text-[#000]">
                                {departureMontDate}
                              </span>
                              <span className="text-[12px] text-[#000]">
                                {departureYearDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Check-out details */}
                        <div className="w-[36%] flex flex-col">
                          <div className="w-[100%] text-[14px] text-[#333]">
                            <p className="flex items-center">Check-Out</p>
                          </div>
                          <div className="w-[100%] text-[42px] text-[#000] h-[42px] flex items-center gap-[5px] mt-[10px]">
                            {departureCheckOutNoDate}
                            <div className="flex flex-col justify-center">
                              <span className="text-[12px] text-[#000]">
                                {departureMonthCheckOutDate}
                              </span>
                              <span className="text-[12px] text-[#000]">
                                {departureYearCheckOutDate}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Room details */}
                      <div className={Classes.roomDetailBooking}>
                        <div className="bg-[#f9f8f8] p-[10px] mt-[2px] flex max-[600px] justify-center">
                          <div className="w-[36%] text-[14px] text-[#000]">
                            Room 1:
                          </div>
                          <div className="w-[36%] text-[14px] text-[#000]">
                            {seatHotelCount} Adults
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Personal details section */}
            <div className={Classes.personalDetailHotel}>
              <div className={Classes.bookingHotelHeader}>
                <div className={Classes.hotelbookingImgTravell}></div>
                <span>Primary Guest Details</span>
              </div>
              <div className={Classes.personalDetailHotelChild}>
                <h3>Add Guest Details</h3>
                <div className="w-[100%] h-[100%] mt-[20px] flex flex-row max-[600px] flex-col gap-[30px]">
                  {/* First name input */}
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    className="w-[30%] max-[600px] gap-[5px]"
                  >
                    <label className="text-[11px] font-bold">
                      First Name & (Middle name, if any)
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={handleFirstNameChange}
                      className={Classes.persnolDataFlightMobileNo}
                    />
                    {firstNameError && (
                      <p className="text-red-500 text-xs">{firstNameError}</p>
                    )}
                  </div>
                  {/* Last name input */}
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    className="w-[35%] max-[600px] gap-[5px]"
                  >
                    <label className="text-[11px] font-bold">Last Name</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={handleLastNameChange}
                      className={Classes.persnolDataFlightEmail}
                    />
                    {lastNameError && (
                      <p className="text-red-500 text-xs">{lastNameError}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Payment summary section */}
          <div className="w-[26%] max-[600px] mt-[20px] flex flex-col">
            <div className={Classes.hotelBookingAmont}>
              <div className={Classes.hotelBokkingAmountHeader}>
                <div className="text-[18px] text-[#1a1a1a] h-[50px] flex items-center ml-[10px]">
                  <p>Price Summary</p>
                </div>
              </div>
              <div className="w-[100%]">
                {/* Cost per night */}
                <div className="w-[100%] border-b-2 border-b-[#e5e3e3] flex justify-between">
                  <div className="w-[66%] pl-[4%] text-[13px] text-[#1a1a1a] h-[35px] flex items-center">
                    Adult x 1
                  </div>
                  <div className="w-[30%] text-[#1a1a1a] text-[12px] h-[35px] font-[600] flex items-center gap-[5px]">
                    <i>₹</i> {Math.floor(hotelBookingDetailData?.avgCostPerNight)}
                  </div>
                </div>
                <Divider flexItem />
                {/* Number of travelers */}
                <div className="w-[100%] border-b-2 border-b-[#e5e3e3] flex justify-between">
                  <div className="w-[66%] pl-[4%] text-[13px] text-[#1a1a1a] h-[35px] flex items-center">
                    Travelers
                  </div>
                  <div className="w-[30%] text-[#1a1a1a] text-[12px] h-[35px] font-[600] flex items-center gap-[5px]">
                    {seatHotelCount} Traveler(s)
                  </div>
                </div>
                <Divider flexItem />
                {/* Grand total */}
                <div className="w-[100%] flex justify-between">
                  <div className="w-[66%] pl-[4%] text-[18px] text-[#d63b05] h-[35px] font-bold flex items-center">
                    Grand Total
                  </div>
                  <div className="w-[30%] text-[18px] text-[#d63b05] font-bold h-[35px] flex items-center gap-[5px]">
                    <i>₹</i>{" "}
                    {Math.floor(
                      hotelBookingDetailData?.avgCostPerNight * seatHotelCount
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Continue to payment button */}
            <div className="w-[100%] mt-[7px] max-[600px] mb-[10px]">
              <p
                className="bg-[#ef6614] text-[#fff] text-[15px] font-[600] h-[45px] cursor-pointer rounded-[40px] flex justify-center items-center"
                onClick={() =>
                  handlePayment(
                    hotelBookingDetailData?.avgCostPerNight,
                    "hotel",
                    hotelBookingDetailData?._id
                  )
                }
              >
                Continue to Payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelBooking;
