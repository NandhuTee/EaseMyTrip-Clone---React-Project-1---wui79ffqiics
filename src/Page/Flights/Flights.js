import React, { useState, useEffect } from "react";
import moment from "moment"; // Importing moment for date formatting
import Classes from "./Flights.module.css"; // Importing CSS modules
import Navbar from "../../components/NavBar/Navbar"; // Importing Navbar component
import Divider from "@mui/material/Divider"; // Importing Divider component from Material-UI
import DatePicker from "react-datepicker"; // Importing DatePicker component

import { useAuth } from "../../components/Context"; // Importing useAuth context hook
import FlightsTo from "./Flight DropDown/FlightsTo"; // Importing FlightsTo component
import FlightFrom from "./Flight DropDown/FlightsFrom"; // Importing FlightFrom component
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for navigation

function Flights() {
  // State variables using useState hook
  const [open, setOpen] = useState(false);
  const [openToModal, setOpenToModal] = useState(false);
  const [flightFromOpen, setFlightFromOpen] = useState(false);
  const [flightTraveller, setFlightTraveller] = useState(false);
  const [flightToOpen, setFlightToOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [errorPost, setErrorPost] = useState("");
  const [offers, setOffers] = useState([]);
  const [selectedOfferType, setSelectedOfferType] = useState("ALL");
  const [loading, setLoading] = useState(true);

  // Destructuring values from useAuth context hook
  const {
    AirportFrom,
    AirportTo,
    travellersCount,
    flightdepartureDate,
    setFlightDepartureDate,
    seatCount,
    setSeatCount,
    seatAdultsCount,
    setSeatAdultsCount,
    seatChildrenCount,
    setSeatChildrenCount,
    seatInfantCount,
    setSeatInfantCount,
  } = useAuth();

  const navigate = useNavigate(); // Navigation hook for routing

  // Custom input component for DatePicker
  const CustomInput = ({ value, onClick }) => (
    <input
      type="text"
      className={Classes.inputFlight}
      value={moment(value).format("DD MMM YYYY")} // Formatting date using moment.js
      onClick={onClick}
      readOnly
    />
  );

  // Function to handle search button click
  const handleSearch = () => {
    navigate("/flightrecord"); // Navigate to "/flightrecord" route
  };

  // Effect hook to fetch offers based on selectedOfferType
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const yourProjectID = "uojmjpx76p25"; // Example project ID
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"${selectedOfferType}"}`, // API endpoint to fetch offers based on selectedOfferType
          {
            method: "GET",
            headers: {
              projectID: yourProjectID, // Adding projectID header
            },
          }
        );
        const data = await response.json(); // Parsing response to JSON
        setOffers(data.data.offers); // Setting fetched offers to state
      } catch (error) {
        console.error("Error fetching offers:", error); // Logging error if fetch fails
        setOffers([]); // Setting offers to empty array in case of error
      } finally {
        setLoading(false); // Setting loading state to false after fetching
      }
    };

    fetchOffers(); // Calling fetchOffers function
  }, [selectedOfferType]); // Dependency array with selectedOfferType

  // Handlers for opening/closing flight dropdowns and traveller modal
  const handleFlightToOpen = () => {
    setFlightToOpen(!flightToOpen); // Toggling flightToOpen state
  };
  const handleFlightFormOpen = () => {
    setFlightFromOpen(!flightFromOpen); // Toggling flightFromOpen state
  };
  const handleFlightTraveller = () => {
    setFlightTraveller(!flightTraveller); // Toggling flightTraveller state
  };

  // Handler for changing offer type and resetting loading state
  const handleOfferTypeChange = (type) => {
    setSelectedOfferType(type); // Setting selectedOfferType state
    setLoading(true); // Setting loading state to true
  };

  // Handlers for incrementing and decrementing seat counts for adults, children, and infants
  const incrementAdultsSeatCount = () => {
    setSeatCount((prevCount) => prevCount + 1); // Incrementing total seat count
    setSeatAdultsCount((prevCount) => prevCount + 1); // Incrementing adults seat count
  };

  const decrementAdultsSeatCount = () => {
    setSeatCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1)); // Decrementing total seat count with minimum of 1
    setSeatAdultsCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1)); // Decrementing adults seat count with minimum of 1
  };

  const incrementChildrenSeatCount = () => {
    setSeatCount((prevCount) => prevCount + 1); // Incrementing total seat count
    setSeatChildrenCount((prevCount) => prevCount + 1); // Incrementing children seat count
  };

  const decrementChildrenSeatCount = () => {
    setSeatCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1)); // Decrementing total seat count with minimum of 1
    setSeatChildrenCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0)); // Decrementing children seat count with minimum of 0
  };

  const incrementInfantSeatCount = () => {
    setSeatCount((prevCount) => prevCount + 1); // Incrementing total seat count
    setSeatInfantCount((prevCount) => prevCount + 1); // Incrementing infant seat count
  };

  const decrementInfantSeatCount = () => {
    setSeatCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1)); // Decrementing total seat count with minimum of 1
    setSeatInfantCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0)); // Decrementing infant seat count with minimum of 0
  };

  // JSX structure for the flights component
  return (
    <div className={Classes.flightsSection}>
      <Navbar /> {/* Rendering Navbar component */}
      <div className={Classes.flightBooking}>
        <div className={Classes.headSearchbar}>
          <div className={Classes.captionFlight}>
            <h1 className={Classes.searchLowestFlightH1}>
              Search Lowest Price
            </h1>
          </div>
        </div>
        <div className={Classes.searchBarFlight}>
          {/* From Flight dropdown */}
          <div className={Classes.mainDivFlightSearch}>
            <div
              onClick={handleFlightFormOpen}
              className={Classes.searchFromFlight}
            >
              <div className={Classes.inputHeading}>
                <p className={Classes.pInputFlight}>From</p>
              </div>
              <div className={Classes.inputToSection}>
                <span className="text-xl font-semibold cursor-pointer">
                  {AirportFrom[0]} {/* Displaying airport name */}
                </span>
                <div className="text-sm cursor-pointer flex gap-[5px]">
                  <span>[{AirportFrom[2]}]</span> {/* Displaying airport code */}
                  <span>{AirportFrom[1]}</span> {/* Displaying city name */}
                </div>
              </div>
            </div>
          </div>
          {flightFromOpen && <FlightFrom onclose={handleFlightFormOpen} />} {/* Rendering FlightFrom component if flightFromOpen is true */}
          <Divider orientation="vertical" className={Classes.divider} /> {/* Vertical divider */}
          <img
            className={Classes.swapIcon}
            src="https://www.easemytrip.com/Content/img/swipe_icon.svg"
          /> {/* Swap icon */}
          {/* To Flight dropdown */}
          <div className={Classes.mainDivFlightSearch}>
            <div
              onClick={handleFlightToOpen}
              className={Classes.searchToFlight}
            >
              <div className={Classes.inputHeading}>
                <p className={Classes.pInputFlight}>To</p>
              </div>
              <div className={Classes.inputToSection}>
                <span className="text-xl font-semibold cursor-pointer">
                  {AirportTo[0]} {/* Displaying airport name */}
                </span>
                <div className="text-sm cursor-pointer flex gap-[5px]">
                  <span>[{AirportTo[2]}]</span> {/* Displaying airport code */}
                  <span>{AirportTo[1]}</span> {/* Displaying city name */}
                </div>
              </div>
            </div>
          </div>
          {flightToOpen && <FlightsTo onclose={handleFlightToOpen} />} {/* Rendering FlightsTo component if flightToOpen is true */}
          <Divider orientation="vertical" className={Classes.divider}/> {/* Vertical divider */}
          {/* Departure date selection */}
          <div className={Classes.searchDepartureFlight}>
            <div className={Classes.flighthomeDeparture}>
              <div className={Classes.departureHeading}>
                <img src="https://www.easemytrip.com/images/hotel-img/hp_icon_2.png" />
                <p className={Classes.pInputFlight}>DEPARTURE DATE</p>
              </div>
              <DatePicker
                selected={flightdepartureDate} // Selected date state
                onChange={(date) => setFlightDepartureDate(date)} // onChange handler for setting departure date
                minDate={new Date()} // Minimum selectable date
                customInput={<CustomInput />} // Custom input component
              />
            </div>
          </div>
          
          <Divider orientation="vertical" className={Classes.divider}/> {/* Vertical divider */}
          {/* Traveller and class selection */}
          <div className={Classes.searchTravellerFlight}>
            <div onClick={handleFlightTraveller} className={Classes.hotelChooseTraveller}>
              <div>
                <p className={Classes.pInput}>TRAVELLER & CLASS</p>
              </div>
              <div className="flex justify-evenly items-center">
                <span className="text-[26px] font-[600] text-[#000]">{seatCount}</span> {/* Displaying total seat count */}
                <span className="text-[13px] text-[#000] font-[600]"> Traveller(s)</span>
                <i className={Classes.dropDownArrow}></i> {/* Dropdown arrow icon */}
              </div>
            </div>
          </div>
          {/* Modal for selecting number of travellers */}
          {flightTraveller && 
          <div className="w-[15%] max-[600px]:w-[70%] h-55 absolute bg-slate-50 lg:mt-10 mt-[21em] p-2 rounded lg:ml-[55em] ml-[1em] z-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className=" w-[98%] flex flex-col gap-[5px]">
                {/* Adults selection */}
                <div className="w-[100%] flex mb-[15px] mt-[5px] justify-between items-center">
                    <div className="flex flex-col justify-center">
                        <p className="text-[13px] text-[#000] font-[600]"> Adults</p>
                        <p className="text-[11px]">(12+ Years)</p>
                    </div>
                    <div className=" rounded-[4px] border border-[#dcdcdc] border-solid flex items-center">
                        <button className="w-[26px] h-[31px] border-[0] text-[18px] cursor-pointer text-[#000]" onClick={decrementAdultsSeatCount} disabled={seatAdultsCount <= 1}>-</button>
                        <input className={Classes.travellerInput}type="text" value={seatAdultsCount} readOnly/>
                        <button className="w-[26px] h-[31px] border-[0] text-[18px] cursor-pointer text-[#000]" onClick={incrementAdultsSeatCount} disabled={seatAdultsCount >= 9}>+</button>
                    </div>
                </div>
                {/* Children selection */}
                <div className="w-[100%] flex mb-[15px] justify-between items-center">
                    <div className="flex flex-col justify-center">
                        <p className="text-[13px] text-[#000] font-[600]"> Children</p>
                        <p className="text-[11px]">(2-12 Years)</p>
                    </div>
                    <div className=" rounded-[4px] border border-[#dcdcdc] border-solid flex items-center">
                        <button className="w-[26px] h-[31px] border-[0] text-[18px] cursor-pointer text-[#000]" onClick={decrementChildrenSeatCount} disabled={seatChildrenCount <= 0}>-</button>
                        <input className={Classes.travellerInput}type="text" value={seatChildrenCount} readOnly/>
                        <button className="w-[26px] h-[31px] border-[0] text-[18px] cursor-pointer text-[#000]" onClick={incrementChildrenSeatCount} disabled={seatChildrenCount >= 9}>+</button>
                    </div>
                </div>
                {/* Infants selection */}
                <div className="w-[100%] flex mb-[15px] justify-between items-center">
                    <div className="flex flex-col justify-center">
                        <p className="text-[13px] text-[#000] font-[600]"> Infant</p>
                        <p className="text-[11px]">(0-2 Years)</p>
                    </div>
                    <div className=" rounded-[4px] border border-[#dcdcdc] border-solid flex items-center">
                        <button className="w-[26px] h-[31px] border-[0] text-[18px] cursor-pointer text-[#000]" onClick={decrementInfantSeatCount} disabled={seatInfantCount <= 0}>-</button>
                        <input className={Classes.travellerInput}type="text" value={seatInfantCount} readOnly/>
                        <button className="w-[26px] h-[31px] border-[0] text-[18px] cursor-pointer text-[#000]" onClick={incrementInfantSeatCount} disabled={seatInfantCount >= 9}>+</button>
                    </div>
                </div>
                {/* Done button to close modal */}
                <div className="w-[100%] border border-solid border-[#2196f3] text-[14px] font-[600] bg-[#fff] text-[#2196f3] flex rounded-[5px] mt-[7px] cursor-pointer justify-center items-center hover:text-[#fff] hover:bg-[#2196f3] pt-[8px] pb-[8px]" onClick={handleFlightTraveller}> Done</div>
            </div> 
          </div>
          }

          {/* Search button */}
          <div className={Classes.searchButtonFlight} onClick={handleSearch}>
            <h3 className={Classes.h3Search}>SEARCH</h3>
          </div>
        </div>
      </div>

      {/* Heading for exclusive offers */}
      <div className={Classes.offerHeadingFlight}>
        <div className={Classes.headingDivFlight}>
          <h3 className={Classes.headingOffers}>Exclusive Offers</h3>
        </div>
      </div>

      {/* List of offer types */}
      <div className={Classes.listOffers}>
        <p
          className={Classes.listOffersFlight}
          onClick={() => handleOfferTypeChange("ALL")}
        >
          All Offers
        </p>
        <p
          className={Classes.listOffersFlight}
          onClick={() => handleOfferTypeChange("FLIGHTS")}
        >
          Flights
        </p>
      </div>

      {/* Section for displaying flight offers */}
      <div className={Classes.flightOffersSection}>
        {loading ? (
          <p>Loading offers...</p>
        ) : (
          offers.map((offer) => (
            <div className={Classes.flightOfersBoxes} key={offer.id}>
              <div className={Classes.offersFlightImagediv}>
                <div className={Classes.flightOffersImage}>
                  <img
                    className={Classes.imageOffersFlight}
                    src={offer.heroUrl} // Offer image URL
                    alt={offer.title} // Alt text for image
                  />
                </div>

                <div className={Classes.descriptionFlightoffer}>
                  <p>
                    {offer.pTl} {offer.pTx} {/* Offer description */}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Flights; // Exporting Flights component
