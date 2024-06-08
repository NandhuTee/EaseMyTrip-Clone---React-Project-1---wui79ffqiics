import React from "react";
import Classes from "../Train.module.css";
import moment from "moment";
import Divider from "@mui/material/Divider";
import { useAuth } from "../../../components/Context";
import { useNavigate } from "react-router-dom";
import ModalLogin from "../../../components/NavBar/ModalLogin";
function TrainData({ searchResultsTrain }) {
  const { traindepartureDate,setTrainBookingId,openLogin, setOpenLogin } = useAuth();
  const departureDay = moment(traindepartureDate).format("ddd");
  const jwtToken =localStorage.getItem('token');
  const departureDate = moment(traindepartureDate).format("DD MMM YYYY");
  const navigate = useNavigate();
  const handleBookBus=(id)=>{
    if(jwtToken != null){
    setTrainBookingId(id);
    navigate("/trainBooking");
    }else{
      setOpenLogin(true);
    }
  }
  return (
    <div className="h-[100%] w-[100%]">
      {searchResultsTrain.length > 0 ? (
        searchResultsTrain.map((trainApidata, index) => (
          <div key={index} className={Classes.trainDataSection}>
            <div className=" bg-[#F2F9FF] p-[8px] w-[100%] rounded-[6px] flex max-[600px]:flex-col">
              <div className="w-[59%] max-[600px]:w-[100%] ml-[5px] flex items-center justify-start text-[12px] gap-[5px] ">
                <span>{trainApidata.source}</span>
                <img
                  className="w-[11px] h-[11px]"
                  src="https://railways.easemytrip.com/Content/Train/TrainImg/arrow-right.svg"
                />
                <span>{trainApidata.destination}</span>
              </div>
              <div className="w-[40%] max-[600px]:w-[100%] flex justify-end max-[600px]:justify-start">
                <ul className="flex justify-center gap-[6px] ">
                  <li className="text-[#737373] text-[11px] flex items-center">
                    Runs on :{" "}
                  </li>
                  {trainApidata?.daysOfOperation?.map((day, i) => (
                    <li
                      key={i}
                      className="text-[#4fc82e] font-[600] text-[11px] flex items-center"
                    >
                      {day}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-[100%] h-[12vh]  flex items-center justify-center bg-[#fff]">
              <div className="w-[98%] h-[90%] flex items-center gap-[10px]">
                <div className="w-[25%] h-[100%]  flex flex-col justify-evenly">
                  <p className="font-[600] text-[16px] text-[#000] w-[100%] flex">
                    {trainApidata?.trainName}
                  </p>
                  <p className=" p-[5px] w-[35%] max-[600px]:w-[70%] h-[4vh]  font-[500] text-[15px] text-[#313131] bg-[#F2F9FF] rounded-[3px] border border-solid border-[#B6D5F0] flex justify-center items-center">
                    {trainApidata?.trainNumber}
                  </p>
                </div>
                <div className="w-[13%] h-[100%] flex flex-col justify-evenly">
                  <p className="font-[600] text-[18px] text-[#0a0a0a] w-[100%] flex">
                    {trainApidata?.departureTime}
                  </p>
                  <p className="w-[100%] font-[500] text-[11px] text-[#737373] flex items-center">
                    {trainApidata?.source}
                  </p>
                  <div className="w-[100%] text-[10px] text-[#737373] font-[500]">
                    <span>{departureDay}</span>, <span>{departureDate}</span>
                  </div>
                </div>
                <div className="w-[29%] h-[100%]  flex flex-col items-center justify-center">
                  <div className="w-[100%] flex items-center justify-center">
                    <p className="text-[12px] text-[#737373]">
                      {trainApidata?.travelDuration}
                    </p>
                  </div>
                  <div className="w-[100%] h-[2vh] flex items-center justify-center">
                    <img src="https://flight.easemytrip.com/Content/img/arow_main.png" />
                  </div>
                  <div className="text-[11px] w-[83%] text-[#737373] flex justify-center">
                    {trainApidata?.availableSeats} Seats Left
                  </div>
                </div>
                <div className="w-[13%] h-[100%] flex flex-col justify-evenly">
                  <p className="font-[600] text-[18px] text-[#0a0a0a] w-[100%] flex">
                    {trainApidata?.arrivalTime}
                  </p>
                  <p className="w-[100%] font-[500] text-[11px] text-[#737373] flex items-center">
                    {trainApidata?.destination}
                  </p>
                  <div className="w-[100%] text-[10px] text-[#737373] font-[500]">
                    <span>{departureDay}</span>, <span>{departureDate}</span>
                  </div>
                </div>
              </div>
            </div>
            <Divider flexItem />
            <div className="w-[100%] flex justify-center">
              <div className=" w-[98%] text-[14px] mt-[10px] text-[#000]">
                <p>Seat Availability</p>
              </div>
            </div>
            <div className="w-[100%] flex justify-center">
              <div className="w-[98%] h-[100%] mb-[10px] text-[11px] mt-[10px] flex gap-[15px] flex-wrap">
                {trainApidata?.coaches?.map((coach, i) => (
                  <div
                    className="w-[15%] max-[600px]:w-[40%] h-[15vh] bg-[#fefae5]  border border-[#f9f2b4] border-solid rounded-[5px] font-[500] text-[11px] flex flex-col justify-center items-center gap-[5px]"
                    key={i}
                  >
                    <span className="font-[500] text-[12px]">
                      ({coach?.coachType})
                    </span>
                    <span className="font-[600] text-[13px]">
                      ₹ {trainApidata?.fare}
                    </span>
                    <span className="text-[#ff0000] text-[13px]">
                      Seats Available {coach?.numberOfSeats}
                    </span>
                    <span className="bg-[#ef6614] text-[#fff] w-[50%] h-[3vh] cursor-pointer rounded-[50px] text-[11px] flex items-center justify-center" onClick={() => handleBookBus(trainApidata._id)}>
                      Book Now
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {openLogin && <ModalLogin/>}
          </div>
        ))
      ) : (
        <p className="font-[600] text-[#000] text-[22px] flex justify-center items-center" >No Trains Available For the Selected Day</p>
      )}
    </div>
  );
}
export default TrainData;
