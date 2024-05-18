import React,{useState} from "react";
import Classes from "./FlightRecord.module.css";
import { useAuth } from "../../../components/Context";
import FlightDetail from "../Flight Detail/FlightDetail";
import { useNavigate } from "react-router-dom";
import ModalLogin from "../../../components/NavBar/ModalLogin";
function FlightLists({ searchResults }) {
  const [flightDetailOpen, setFlightDetailOpen] = useState(false);
  const {openLogin, setOpenLogin,setFlightId,AirportFrom,AirportTo,setFlightBookingId} = useAuth();
  const jwtToken =localStorage.getItem('token');
  const navigate = useNavigate();
  const handleFlightDetailOpen = (id) => {
    setFlightId(id);
    setFlightDetailOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id] || false,
    }));
  };
  const handleBookFlight=(id)=>{
    if(jwtToken != null){
    setFlightBookingId(id);
    navigate("/flightbooking");
    }else{
      setOpenLogin(true);
    }
  }
  return (
    <div className="h-[100%] w-[100%]">
      {searchResults.length > 0 ? (
        searchResults.map((flightApidata) => (
          <div className={Classes.flightDataBox} key={flightApidata._id}>
            <div className="w-[100%] h-[100px] max-[600px]:h-[100%] flex flex-col justify-center items-center">
              <div className="w-[95%] h-[93%] flex flex-row gap-[15px] max-[600px]:justify-between">
                <div className="h-[100%] w-[15%] flex items-center">
                <span className="text-[12px] text-[#333]">{flightApidata?.flightID}</span>
                </div>
                  <div className={Classes.flighttimeDurationSection}>
                  <div className=" w-[28%] flex flex-col justify-center items-center">
                  <div className="text-[20px] text-[#333] font-[600] ">{flightApidata?.departureTime}</div>
                            <div className="text-[13px]  text-[#737373] font-[600]">
                             <span>{AirportFrom[0]}</span>
                            </div>
                  </div>
                    <div className={Classes.durationFlightRecords}>
                  <div className="text-[13px] w-[83%] text-[#333] flex justify-center">
                                <span>{flightApidata?.duration}h 10m</span>
                            </div>
                              <img  src="https://flight.easemytrip.com/Content/img/arow_main.png"/>
                              <div className="text-[11px] w-[83%] text-[#737373] flex items-center justify-center">
                                <span>{flightApidata?.stops==0 ?"Nonstop":<span>{flightApidata?.stops}-stop</span> }</span>
                                </div>
                  </div>
                  <div className=" w-[28%] flex flex-col justify-center items-center">
                  <div className="text-[20px] text-[#333] font-[600] ">{flightApidata?.arrivalTime}</div>
                            <div className="text-[13px]  text-[#737373] font-[600]">
                             <span>{AirportTo[0]}</span>
                            </div>
                  </div>
                </div>
                <div className=" h-[100%] w-[20%] flex flex-col items-center justify-center">
                  <div className="text-[20px] text-[#d63b05] w-[83%] font-[600] flex justify-center  gap-[5px]">
                    <i>₹</i> <span>{flightApidata?.ticketPrice}</span>
                  </div>
                  <div className="text-[11px] w-[83%] text-[#737373] flex justify-center">{flightApidata?.availableSeats} Seats Left</div>
                </div>
                
                  <div className={Classes.bookNowInRow}>
               
                  <p className="bg-[#ef6614] rounded-[40px] text-[14px] text-[#fff] w-[90%] h-[40%] flex justify-center items-center cursor-pointer" onClick={() => handleBookFlight(flightApidata._id)}>
                    Book Now
                  </p>
                  
                </div>
                
              </div>
              <div className={Classes.mobileViewBtn}>
              <p className="bg-[#ef6614] rounded-[40px] text-[14px] text-[#fff] w-[100%] h-[3vh] flex justify-center items-center cursor-pointer" onClick={() => handleBookFlight(flightApidata._id)}>
                    Book Now
                  </p>
              </div>
              {openLogin && <ModalLogin/>}
            </div>
            <div className="w-[100%] h-[30px] flex justify-center items-center bg-[#EFF3F6]">
              <div
                className="w-[98%] h-[100%] text-[#2196f3] text-[12px] font-[600] flex items-center"
              >
                <p onClick={() => handleFlightDetailOpen(flightApidata._id)} className=" cursor-pointer">{flightDetailOpen[flightApidata._id] ? "Hide Detail" : "Flight Detail"}</p>
              </div>
            </div>
            {flightDetailOpen[flightApidata._id] && <FlightDetail/>}
          </div>
        ))
        ) : (
          <p className="font-[600] text-[#000] text-[22px] flex justify-center items-center" >No Flight Available For the Selected Day</p>
        )}
     
    </div>
  );
}
export default FlightLists;
