import React, { useEffect, useState } from "react";
import { useAuth } from "../../../components/Context"; // Import context for authentication
import ListItemButton from "@mui/material/ListItemButton"; // Import ListItemButton from Material-UI
import Classes from "../Flights.module.css"; // Import CSS modules
import FlightIcon from "@mui/icons-material/Flight"; // Import FlightIcon from Material-UI

const FlightFrom = ({ onclose }) => {
  const [airport, setAirport] = useState(""); // State to store airport search query
  const [airportDetail, setAirportDetail] = useState([]); // State to store airport details from API
  const [liData, setLiData] = useState(false); // State to manage list item data state
  const { setAriportFrom } = useAuth(); // Destructuring setAriportFrom from authentication context

  // Function to handle list item click and close modal
  const handleLiData = (city, name, iata_code) => {
    setAriportFrom([city, name, iata_code]); // Set selected airport details in authentication context
    setLiData(true); // Update list item data state to true
    onclose(liData); // Call onclose function with liData state
  };

  // Function to handle input change for airport search
  const handleChange = (e) => {
    const input = e.target.value; // Get input value
    setAirport(input); // Update airport state with input value
  };

  // Effect to fetch airport details based on search query
  useEffect(() => {
    const api = `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${airport}"}`;

    const fetchData = () => {
      fetch(api, {
        method: "GET",
        headers: {
          projectID: "uojmjpx76p25", // Project ID for API request
        },
      })
        .then((response) => response.json()) // Parse response to JSON
        .then((flightdata) => {
          const data = flightdata.data.airports; // Extract airport data from response
          setAirportDetail(data); // Update airportDetail state with fetched data
        });
    };

    fetchData(); // Call fetchData function on airport state change
  }, [airport]); // Depend on airport state change

  return (
    <div className="w-80 h-55 absolute bg-slate-50 lg:mt-10 mt-[5em] p-2 rounded ml-1 z-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      {/* Search input section */}
      <div className="flex flex-row gap-4 items-center">
        <img
          src="https://www.easemytrip.com/Content/img/icon-search.svg"
          className="items-center"
          alt="search icon"
        />
        <input
          className="w-11/12 p-2 border-none outline-none bg-slate-50"
          onChange={handleChange} // Handle input change with handleChange function
        />
      </div>

      {/* Airport list section */}
      <div className="w-full h-44 overflow-auto scrollbar">
        <ul className="cursor-pointer">
          {/* Map through airportDetail state to render list items */}
          {airportDetail.map((data, index) => (
            <ListItemButton
              onClick={() => {
                handleLiData(data.city, data.name, data.iata_code); // Handle click on list item
              }}
              className="mt-2"
              key={index}
            >
              {/* Flight details within ListItemButton */}
              <div className={Classes.listFlightTo}>
                <FlightIcon className={Classes.flightIcon} /> {/* Flight icon */}
                <span className="text-base font-semibold cursor-pointer">
                  {data.city} {/* Display city */}
                </span>
                <div className={Classes.spanFlightTo}>
                  <p className="text-sm cursor-pointer">{data.name}</p> {/* Display name */}
                  <p className="text-sm cursor-pointer">{data.country}</p> {/* Display country */}
                </div>
              </div>
            </ListItemButton>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlightFrom;
