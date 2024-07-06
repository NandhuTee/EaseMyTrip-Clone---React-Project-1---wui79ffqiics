import React, { useEffect, useState } from "react";
import { useAuth } from "../../../components/Context"; // Importing authentication context
import ListItemButton from "@mui/material/ListItemButton"; // Importing ListItemButton from Material-UI
import Classes from "../Flights.module.css"; // Importing CSS module
import FlightIcon from "@mui/icons-material/Flight"; // Importing FlightIcon from Material-UI icons

const FlightsTo = ({ onclose }) => {
  const [airport, setAirport] = useState(""); // State to store airport search input
  const [airportDetail, setAirportDetail] = useState([]); // State to store fetched airport details
  const [liData, setLiData] = useState(false); // State to manage ListItemButton data selection
  const { setAriportTo } = useAuth(); // Destructuring authentication context for setting destination airport

  // Function to handle data selection in ListItemButton
  const handleLiData = (city, name, iata_code) => {
    setAriportTo([city, name, iata_code]); // Set destination airport in authentication context
    setLiData(true); // Set ListItemButton data selection flag to true
    onclose(liData); // Call onclose callback with data selection status
  };

  // Function to handle change in airport search input
  const handleChange = (e) => {
    const input = e.target.value; // Get input value from event
    setAirport(input); // Update airport state with input value
  };

  // Effect hook to fetch airport details based on airport state
  useEffect(() => {
    const api = `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${airport}"}`; // API endpoint for fetching airport details
    const projectId = "uojmjpx76p25"; // Project ID for API request

    // Function to fetch data from API
    const fetchData = () => {
      fetch(api, {
        method: "GET", // HTTP GET method
        headers: {
          projectID: projectId, // Setting project ID header
        },
      })
        .then((response) => response.json()) // Parse response as JSON
        .then((flightdata) => {
          const data = flightdata.data.airports; // Extract airport data from API response
          setAirportDetail(data); // Update airportDetail state with fetched data
        });
    };

    fetchData(); // Call fetchData function on component mount and whenever airport state changes
  }, [airport]); // Dependency array with airport state triggers effect on change

  return (
    <div className="w-80 h-55 absolute bg-slate-50 lg:mt-10 mt-[11em] p-2 rounded lg:ml-[23em] ml-[0] z-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      {/* Search input container */}
      <div className="flex flex-row gap-4 items-center">
        <img
          src="https://www.easemytrip.com/Content/img/icon-search.svg"
          className="items-center"
          alt="search icon"
        />
        <input
          className="w-11/12 p-2 border-none outline-none bg-slate-50"
          onChange={handleChange} // Call handleChange on input change
        />
      </div>
      
      {/* List container for displaying airport details */}
      <div className="w-full h-44 overflow-auto scrollbar">
        <ul className="cursor-pointer">
          {/* Mapping through airportDetail to render ListItemButton for each airport */}
          {airportDetail.map((data, index) => (
            <ListItemButton
              onClick={() => {
                handleLiData(data.city, data.name, data.iata_code); // Call handleLiData on ListItemButton click
              }}
              className="mt-2"
              key={index}
            >
              <div className={Classes.listFlightTo}>
                <FlightIcon className={Classes.flightIcon} /> {/* Render FlightIcon */}
                <span className={`${Classes.cityName} text-base font-semibold cursor-pointer`}>
                  {data.city} {/* Display city name */}
                </span>
                <div className={Classes.spanFlightTo}>
                  <p className="text-sm cursor-pointer">{data.name}</p> {/* Display airport name */}
                  <p className="text-sm cursor-pointer">{data.country}</p> {/* Display country name */}
                </div>
              </div>
            </ListItemButton>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlightsTo;
