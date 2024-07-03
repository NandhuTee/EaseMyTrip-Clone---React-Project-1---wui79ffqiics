import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import { useAuth } from "../../../components/Context"; // Import context for authentication
import moment from "moment"; // Import moment.js for date formatting

function FlightDetail() {
  // State to manage any error in fetching flight details
  const [flightError, setFlightError] = useState(null); 
  // State to store flight details
  const [flightDetails, setFlightDetails] = useState([]);
  
  // Destructuring flight details from useAuth context
  const { flightId, AirportFrom, AirportTo, flightdepartureDate } = useAuth();
  
  // Format the departure date to a readable day format
  const departureDay = moment(flightdepartureDate).format("ddd");
  // Format the departure date to a readable full date format
  const departureDate = moment(flightdepartureDate).format("DD MMM YYYY");

  // Function to fetch flight details from API
  const fetchFlightDetails = async () => {
    try {
      const projectID = "uojmjpx76p25"; // Project ID for API request
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightId}`,
        {
          method: "GET", // HTTP method
          headers: {
            projectID, // Custom header for the API
          },
        }
      );

      if (response.ok) {
        const data = await response.json(); // Parse JSON if response is ok
        setFlightDetails(data?.data); // Set flight details state
      } else {
        const errorData = await response.json(); // Parse JSON if response is not ok
        setFlightError(errorData.message); // Set error state
      }
    } catch (error) {
      console.error("Error fetching flight data:", error); // Log error if fetch fails
      setFlightError("Failed to fetch flight data"); // Set error state for failed fetch
    }
  };

  // useEffect to fetch flight details on component mount
  useEffect(() => {
    fetchFlightDetails(); // Call fetch function
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center">
      {/* Container for flight information header */}
      <div className="w-[98%] mt-2 bg-[#f6f4f4] rounded-[20px] p-2">
        {/* Header section with blue background */}
        <div className="bg-[#2196f3] rounded-[20px] text-[#fff] flex justify-center items-center py-2">
          <p>Flight Information</p>
        </div>
      </div>

      {/* Container for main flight details */}
      <div className="w-[98%] h-[18vh] max-[600px]:h-auto flex justify-center items-center mt-4">
        <div className="w-full h-full flex flex-col">
          {/* Display source to destination */}
          <div className="text-[15px] text-[#000] mb-2">
            <span>{flightDetails?.source}</span> → <span>{flightDetails?.destination}</span>
          </div>

          {/* Container for detailed flight info */}
          <div className="w-full h-[75%] flex">
            {/* Flight ID section */}
            <div className="w-[25%] flex items-center">
              <span className="text-[16px] text-[#1e1f1f]">{flightDetails?.flightID}</span>
            </div>

            {/* Container for departure and arrival times */}
            <div className="w-[75%] flex gap-4">
              {/* Departure time section */}
              <div className="w-[32%] flex flex-col items-center">
                <div className="text-[20px] text-[#333] font-[600]">
                  {flightDetails?.departureTime}
                </div>
                <div className="text-[13px] text-[#525252] font-[600]">
                  <span>{AirportFrom[0]}</span> <span>({AirportFrom[2]})</span>
                </div>
                <div className="text-[12px] text-[#333]">
                  <span>{departureDay}</span>-<span>{departureDate}</span>
                </div>
              </div>

              {/* Flight duration section */}
              <div className="w-[32%] flex flex-col items-center">
                <img className="w-[10%] max-[600px]:w-[25%] h-[4vh] overflow-hidden" 
                     src="https://flight.easemytrip.com/Content/img/split-img.png" 
                     alt="Flight Split Icon" />
                <div className="text-[12px] text-[#333]">
                  <span>{flightDetails?.duration}h 10m</span>
                </div>
              </div>

              {/* Arrival time section */}
              <div className="w-[32%] flex flex-col items-center">
                <div className="text-[20px] text-[#333] font-[600]">
                  {flightDetails?.arrivalTime}
                </div>
                <div className="text-[13px] text-[#525252] font-[600]">
                  <span>{AirportTo[0]}</span> <span>({AirportTo[2]})</span>
                </div>
                <div className="text-[12px] text-[#333]">
                  <span>{departureDay}</span>-<span>{departureDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error message section */}
      {flightError && (
        <div className="mt-4 text-red-500">
          {flightError}
        </div>
      )}
    </div>
  );
}

export default FlightDetail;
