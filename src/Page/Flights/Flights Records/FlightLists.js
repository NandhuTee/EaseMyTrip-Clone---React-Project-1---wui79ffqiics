import React, { useState } from "react";
import Classes from "./FlightRecord.module.css"; // Import CSS module for styling
import { useAuth } from "../../../components/Context"; // Import authentication context hook
import FlightDetail from "../Flight Detail/FlightDetail"; // Import FlightDetail component
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from React Router DOM
import ModalLogin from "../../../components/NavBar/ModalLogin"; // Import ModalLogin component for login modal

function FlightLists({ searchResults }) {
  const [flightDetailOpen, setFlightDetailOpen] = useState(false); // State for managing flight detail open/close
  const { openLogin, setOpenLogin, setFlightId, AirportFrom, AirportTo, setFlightBookingId } = useAuth(); // Destructure authentication context values
  const jwtToken = localStorage.getItem('token'); // Retrieve JWT token from localStorage
  const navigate = useNavigate(); // Navigation function from React Router DOM

  // Function to toggle flight detail view
  const handleFlightDetailOpen = (id) => {
    setFlightId(id); // Set flight ID in context state
    setFlightDetailOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id] || false,
    }));
  };

  // Function to handle booking a flight
  const handleBookFlight = (id) => {
    if (jwtToken != null) {
      setFlightBookingId(id); // Set booking ID in context state
      navigate("/flightbooking"); // Navigate to flight booking page
    } else {
      setOpenLogin(true); // Open login modal if user is not authenticated
    }
  };

  return (
    <div className="h-[100%] w-[100%]">
      {searchResults.length > 0 ? ( // Render flight data if search results exist
        searchResults.map((flightApidata) => (
          <div className={Classes.flightDataBox} key={flightApidata._id}>
            <div className="w-[100%] h-[100px] max-[600px]:h-[100%] flex flex-col justify-center items-center">
              <div className="w-[95%] h-[93%] flex flex-row gap-[15px] max-[600px]:justify-between">
                {/* Flight details section */}
                <div className="h-[100%] w-[15%] flex items-center">
                  <span className="text-[12px] text-[#333]">{flightApidata?.flightID}</span>
                </div>
                <div className={Classes.flighttimeDurationSection}>
                  {/* Departure time and airport */}
                  <div className="w-[28%] flex flex-col justify-center items-center">
                    <div className="text-[20px] text-[#333] font-[600] ">{flightApidata?.departureTime}</div>
                    <div className="text-[13px]  text-[#737373] font-[600]">
                      <span>{AirportFrom[0]}</span>
                    </div>
                  </div>
                  {/* Flight duration and stops */}
                  <div className={Classes.durationFlightRecords}>
                    <div className="text-[13px] w-[83%] text-[#333] flex justify-center">
                      <span>{flightApidata?.duration}h 10m</span>
                    </div>
                    <img src="https://flight.easemytrip.com/Content/img/arow_main.png" alt="Arrow icon" />
                    <div className="text-[11px] w-[83%] text-[#737373] flex items-center justify-center">
                      <span>{flightApidata?.stops === 0 ? "Nonstop" : <span>{flightApidata?.stops}-stop</span>}</span>
                    </div>
                  </div>
                  {/* Arrival time and airport */}
                  <div className="w-[28%] flex flex-col justify-center items-center">
                    <div className="text-[20px] text-[#333] font-[600] ">{flightApidata?.arrivalTime}</div>
                    <div className="text-[13px]  text-[#737373] font-[600]">
                      <span>{AirportTo[0]}</span>
                    </div>
                  </div>
                </div>
                {/* Price and seats section */}
                <div className=" h-[100%] w-[20%] flex flex-col items-center justify-center">
                  <div className="text-[20px] text-[#d63b05] w-[83%] font-[600] flex justify-center  gap-[5px]">
                    <i>₹</i> <span>{flightApidata?.ticketPrice}</span>
                  </div>
                  <div className="text-[11px] w-[83%] text-[#737373] flex justify-center">{flightApidata?.availableSeats} Seats Left</div>
                </div>
                {/* Book Now button */}
                <div className={Classes.bookNowInRow}>
                  <p className="bg-[#ef6614] rounded-[40px] text-[14px] text-[#fff] w-[90%] h-[40%] flex justify-center items-center cursor-pointer" onClick={() => handleBookFlight(flightApidata._id)}>
                    Book Now
                  </p>
                </div>
              </div>
              {/* Mobile view button */}
              <div className={Classes.mobileViewBtn}>
                <p className="bg-[#ef6614] rounded-[40px] text-[14px] text-[#fff] w-[100%] h-[3vh] flex justify-center items-center cursor-pointer" onClick={() => handleBookFlight(flightApidata._id)}>
                  Book Now
                </p>
              </div>
              {/* Login modal */}
              {openLogin && <ModalLogin />}
            </div>
            {/* Flight detail toggle */}
            <div className="w-[100%] h-[30px] flex justify-center items-center bg-[#EFF3F6]">
              <div className="w-[98%] h-[100%] text-[#2196f3] text-[12px] font-[600] flex items-center">
                <p onClick={() => handleFlightDetailOpen(flightApidata._id)} className="cursor-pointer">{flightDetailOpen[flightApidata._id] ? "Hide Detail" : "Flight Detail"}</p>
              </div>
            </div>
            {/* Display flight detail component if open */}
            {flightDetailOpen[flightApidata._id] && <FlightDetail />}
          </div>
        ))
      ) : (
        // Render no flights available message if no search results
        <p className="font-[600] text-[#000] text-[22px] flex justify-center items-center">No Flight Available For the Selected Day</p>
      )}
    </div>
  );
}

export default FlightLists;
