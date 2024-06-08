import React, { useState, useEffect } from "react";
import Navbar from "../../../components/NavBar/Navbar";
import { useAuth } from "../../../components/Context";
import moment from "moment";
import Classes from "../Train.module.css";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

function TrainBooking() {
  const [hotelDetailError, setHotelDetailError] = useState(null);
  const [trainBookingDetailData, setTrainBookingDetailData] = useState([]);
  const {
    traindepartureDate,
    guestName,
    setGuestName,
    trainBookingId,
    setTrainBookingId,
    guestLastName, setGuestLastName,
    setFare,
    setBookingId,
    setBookingType,
  } = useAuth();
  const departureDay = moment(traindepartureDate).format("dddd");
  const departureDate = moment(traindepartureDate).format("DD MMM YYYY");
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  function guestNameInput(e) {
    const firstSet = e.target.value;
    setGuestName(firstSet);
  }
  function guestLastNameInput(e) {
    const lastSet = e.target.value;
    setGuestLastName(lastSet);
  }

  const fetchSingleFlightData = async () => {
    try {
      const projectID = "wui79ffqiics";
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/train/${trainBookingId}`,
        {
          method: "GET",
          headers: {
            projectID,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTrainBookingDetailData(data?.data);
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
    fetchSingleFlightData();
  }, []);

  const handlePayment = (trainfare, bookingType, trainId) => {
    if (!firstName.trim()) {
      setFirstNameError("First Name is required");
      return;
    }
    if (!lastName.trim()) {
      setLastNameError("Last Name is required");
      return;
    }
    setFare(trainfare);
    setBookingId(trainId);
    setBookingType(bookingType);
    navigate("/trainpayment");
  };
  return (
    <div>
      <Navbar />
      <div className=" w-[100%] h-[100vh] max-[600px]:h-[100%] bg-[#e8f2fa] flex justify-center">
        <div className="w-[90%] h-[100%] flex max-[600px]:flex-col flex-row gap-[20px] justify-between">
          <div className="  w-[70.5%] max-[600px]:w-[100%] mt-[20px]">
            <div className={Classes.bookingTrainData}>
              <div className={Classes.bookingHeader}>
                <div className={Classes.trainbookingImg}></div>
                <span>Train Details</span>
              </div>
              <div className="w-[96%]">
                <div className={Classes.trainBookingDetails}>
                  <div className=" w-[98%] mt-[20px] mb-[30px] flex flex-col gap-[5px]">
                    <div className="w-[100%] flex flex-col gap-[5px] ">
                      <div className="w-[100%] flex ">
                        <div className="w-[100%] flex">
                          <div className="w-[100%] text-[15px] text-[#000] font-[500] flex items-center gap-[5px]">
                            <span className="text-[22px] text-[#111]">
                              {trainBookingDetailData?.source}
                            </span>
                            <span className="text-[22px] text-[#111]"> → </span>{" "}
                            <span className="text-[22px] text-[#1a1a1a]">
                              {trainBookingDetailData?.destination}
                            </span>{" "}
                            <span className="ml-[5px] mr-[5px]">|</span>{" "}
                            <span>{departureDay},</span>{" "}
                            <span>{departureDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className=" w-[100%] flex">
                        <div className="w-[20%]">
                          <div className="w-[100%] mt-[2px]">
                            <p className="text-[14px] text-[#2196f3]">
                              {trainBookingDetailData?.trainName}
                            </p>
                            <span className=" font-bold text-[12px]">
                              Train No:
                            </span>
                            <span className="text-[12px] ml-[5px]">
                              ({trainBookingDetailData?.trainNumber})
                            </span>
                          </div>
                        </div>
                        <div className="w-[75%] flex">
                          <div className="w-[33%]">
                            <div className="w-[80%] text-[#1a1a1a] pl-[20%] items-start text-[28px] font-[700]">
                              <span>
                                {trainBookingDetailData?.departureTime}
                              </span>
                            </div>
                            <div className={Classes.trainBookingSImgM}>
                              <span className={Classes.trainStartImg}></span>
                            </div>
                            <div className="w-[100%] float-start text-[#3c3c3c] text-[13px] items-start mt-[20px] pl-[20%]">
                              {trainBookingDetailData?.source}
                            </div>
                            <div className="w-[100%] float-start text-[#3c3c3c] text-[13px] items-start mt-[5px] pl-[20%]">
                              {departureDay}, {departureDate}
                            </div>
                          </div>
                          <div className="w-[33%]">
                            <div className="w-[100%] text-[#737373] text-[12px] items-center justify-center">
                              <span className="flex justify-center">
                                {trainBookingDetailData?.travelDuration}
                              </span>
                            </div>
                            <div className={Classes.trainBookingMImg}>
                              <span className={Classes.trainMidleImg}></span>
                            </div>
                          </div>
                          <div className="w-[34%]">
                            <div className="w-[75%] text-[#1a1a1a] pl-[25%] text-end text-[28px] font-[700]">
                              <span>{trainBookingDetailData?.arrivalTime}</span>
                            </div>
                            <div className={Classes.trainBookingLImgM}>
                              <span className={Classes.trainLastImg}></span>
                            </div>
                            <div className="w-[100%] float-start text-[#3c3c3c] text-[13px] text-right mt-[20px] pr-[25%]">
                              {trainBookingDetailData?.destination}
                            </div>
                            <div className="w-[100%] float-start text-[#3c3c3c] text-[13px] text-right mt-[5px] pr-[25%]">
                              {departureDay}, {departureDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={Classes.personalDetailTrain}>
              <div className={Classes.bookingHeader}>
                <div className={Classes.PersbookingImg}></div>
                <span>Travellers Details</span>
              </div>
              <div className={Classes.personalDetail}>
                <h3>Add Contact Details</h3>
                <div className="w-[100%] h-[100%] mt-[20px] flex flex-row max-[600px]:flex-col gap-[30px]">
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    className="w-[30%] max-[600px]:w-[98%] gap-[5px]"
                  >
                    <label className="text-[11px] font-bold">
                      (First Name & (Middle name, if any)
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setFirstNameError("");
                      }}
                      className={Classes.persnolDataTrainFName}
                    />
                    {firstNameError && (
                      <p className="text-red-500 text-xs">{firstNameError}</p>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    className="w-[35%] max-[600px]:w-[98%] gap-[5px] mb-[10px]"
                  >
                    <label className="text-[11px] font-bold">Last Name</label>
                    <input
                      type="text"
                      className={Classes.persnolDataTrainLName}
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setLastNameError("");
                      }}
                    />
                    {lastNameError && (
                      <p className="text-red-500 text-xs">{lastNameError}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[26%] max-[600px]:w-[100%] mt-[20px] flex flex-col">
            <div className={Classes.trainBookingAmont}>
                    <div className={Classes.trainBokkingAmountHeader}>
                        <div className="text-[18px] text-[#1a1a1a] h-[50px] flex items-center ml-[10px]">
                            <p>Price Summary</p>
                        </div>
                    </div>
                    <div className=" w-[100%]">
                        <div className="w-[100%] border-b-2  border-b-[#e5e3e3] flex justify-between">
                            <div className="w-[66%] pl-[4%] text-[13px] text-[#1a1a1a] h-[35px] flex items-center">Passenger x 1</div>
                            <div className="w-[30%] text-[#1a1a1a] text-[12px] h-[35px] font-[600] flex items-center gap-[5px]"><i>₹</i>{" "}{trainBookingDetailData?.fare}</div>
                        </div>
                        <Divider flexItem />
                        <div className="w-[100%] border-b-2  border-b-[#e5e3e3] flex justify-between">
                            <div className="w-[66%] pl-[4%] text-[13px] text-[#1a1a1a] h-[35px] flex items-center">Travelare</div>
                            <div className="w-[30%] text-[#1a1a1a] text-[12px] h-[35px] font-[600] flex items-center gap-[5px]"> Traveller(s)</div>
                            {/* {selectedSeats.length} */}
                        </div>
                        <Divider flexItem />
                        <div className="w-[100%] flex justify-between">
                                  <div className="w-[66%] pl-[4%] text-[18px] text-[#d63b05] h-[35px] font-bold flex items-center">Grand Total</div>
                                  <div className="w-[30%] text-[18px] text-[#d63b05] font-bold h-[35px] flex items-center gap-[5px]">
                                    <i>₹</i>{" "}
                                    {trainBookingDetailData?.fare }
                                    {/* * selectedSeats.length */}
                                    
                                  </div>
                                </div>
                    </div>
                    
                </div>
            <div className="w-[100%] mt-[7px] max-[600px]:mb-[10px]">
              <p className="bg-[#ef6614] text-[#fff] text-[19px] h-[45px] cursor-pointer rounded-[40px] flex justify-center items-center"
              onClick={() =>
                handlePayment(trainBookingDetailData?.fare,"train",trainBookingDetailData?._id)}
              >
                Continue Booking
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TrainBooking;
