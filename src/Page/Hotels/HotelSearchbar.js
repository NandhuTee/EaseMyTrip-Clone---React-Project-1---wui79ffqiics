import React, { useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Divider } from "@mui/material";
import Classes from "./Hotels.module.css";
import { useAuth } from "../../components/Context";
import "react-datepicker/dist/react-datepicker.css";
// State for toggling the traveller dropdown
function HotelSearchbar() {
  const [HotelTraveller, setHotelTraveller] = useState(false);
  const {
    setHotelLocation,
    hotelLocation,
    setHotelDepartureDate,
    hotelDepartureDate,
    searchHotelResults,
    setSearchHotelResults,
    isSelectedDayCheckOut,
    setSelectedDayCheckOut,
    seatHotelCount,
    setSeatHotelCount,
    seatHotelAdultsCount,
    setSeatHotelAdultsCount,
    seatHotelChildrenCount,
    setSeatHotelChildrenCount,
  } = useAuth();

  const CustomInput = ({ value, onClick }) => (
    <input
      className={Classes.hotelInputDatepickIn}
      type="text"
      value={moment(value).format("DD MMM YYYY")}
      onClick={onClick}
      readOnly
    />
  );
// Custom input component for DatePicker to format dates
  const CustomInputCheckout = ({ value, onClick }) => (
    <input
      className={Classes.hotelInputDatepickOut}
      type="text"
      value={moment(value).format("DD MMM YYYY")}
      onClick={onClick}
      readOnly
    />
  );
// Handler for setting the hotel location
  const handleSetLocation = (e) => {
    setHotelLocation(e.target.value);
  };
// Handler for initiating the search
  const handleSearch = () => {
    setSearchHotelResults([]);
  };
// Toggle the traveller dropdown
  const handleHotelTraveller = () => {
    setHotelTraveller(!HotelTraveller);
  };
 // Increment and decrement functions for adult and children counts
  const incrementHotelAdultsSeatCount = () => {
    setSeatHotelCount((prevCount) => prevCount + 1);
    setSeatHotelAdultsCount((prevCount) => prevCount + 1);
  };

  const decrementHotelAdultsSeatCount = () => {
    setSeatHotelCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
    setSeatHotelAdultsCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  const incrementHotelChildrenSeatCount = () => {
    setSeatHotelCount((prevCount) => prevCount + 1);
    setSeatHotelChildrenCount((prevCount) => prevCount + 1);
  };

  const decrementHotelChildrenSeatCount = () => {
    setSeatHotelCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
    setSeatHotelChildrenCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 0));
  };

  return (
    <div className={Classes.searchBarHotelHeaders}>
      <div className={Classes.searchBarHotel}>
        <div className={Classes.searchBHedersHotel}>
          <div className={Classes.searchFromHotel}>
            <p className={Classes.headingInputHotel}>
              Enter City name, Location or Specific hotel
            </p>
            <div className={Classes.inputFormSectionHotel}>
              <input
                className={Classes.formSearchBoxHotel}
                placeholder="Enter City name, Location"
                value={hotelLocation}
                onChange={handleSetLocation}
              />
            </div>
          </div>
        </div>
        <div className={Classes.hotelDatesSection}>
          <div className={Classes.searchCheckIn}>
            <div className={Classes.searchCheckInClick}>
              <p className={Classes.headingCheckIn}>Check-in</p>
              <div className={Classes.searchDateInput}>
                <DatePicker
                  className={Classes.datePickerCalender}
                  selected={hotelDepartureDate}
                  onChange={(date) => setHotelDepartureDate(date)}
                  minDate={new Date()}
                  customInput={<CustomInput />}
                />
              </div>
            </div>
          </div>
          <Divider orientation="vertical" />
          <div className={Classes.searchCheckOut}>
            <div className={Classes.searchCheckOutClick}>
              <p className={Classes.headingCheckOut}>Check-out</p>
              <DatePicker
                selected={isSelectedDayCheckOut}
                onChange={(date) => setSelectedDayCheckOut(date)}
                minDate={new Date()}
                customInput={<CustomInputCheckout />}
              />
            </div>
          </div>
        </div>
        <div className={Classes.searchRooms}>
          <div
            onClick={handleHotelTraveller}
            className={`${Classes.searchRoomsClick} ${HotelTraveller ? Classes.activeDropdown : ""}`}
          >
            <div>
              <p className={Classes.headingCheckOut}>Guests</p>
            </div>
            <div className={Classes.guestCountDisplay}>
              <span>{seatHotelCount}</span>
              <span> Guests(s)</span>
              <i className={Classes.dropDownArrow}></i>
            </div>
          </div>
        </div>
        {HotelTraveller && (
          <div className={Classes.hotelTravellerDropdown}>
            <div className={Classes.travellerItem}>
              <div className={Classes.travellerDetails}>
                <p className={Classes.travellerLabel}>Adults</p>
                <p className={Classes.travellerAge}>(12+ Years)</p>
              </div>
              <div className={Classes.travellerCounter}>
                <button
                  className={Classes.counterButton}
                  onClick={decrementHotelAdultsSeatCount}
                  disabled={seatHotelAdultsCount <= 1}
                >
                  -
                </button>
                <input
                  className={Classes.travellerInput}
                  type="text"
                  value={seatHotelAdultsCount}
                  readOnly
                />
                <button
                  className={Classes.counterButton}
                  onClick={incrementHotelAdultsSeatCount}
                  disabled={seatHotelAdultsCount >= 9}
                >
                  +
                </button>
              </div>
            </div>
            <div className={Classes.travellerItem}>
              <div className={Classes.travellerDetails}>
                <p className={Classes.travellerLabel}>Children</p>
                <p className={Classes.travellerAge}>(2-12 Years)</p>
              </div>
              <div className={Classes.travellerCounter}>
                <button
                  className={Classes.counterButton}
                  onClick={decrementHotelChildrenSeatCount}
                  disabled={seatHotelChildrenCount <= 0}
                >
                  -
                </button>
                <input
                  className={Classes.travellerInput}
                  type="text"
                  value={seatHotelChildrenCount}
                  readOnly
                />
                <button
                  className={Classes.counterButton}
                  onClick={incrementHotelChildrenSeatCount}
                  disabled={seatHotelChildrenCount >= 9}
                >
                  +
                </button>
              </div>
            </div>
            <div
              className={Classes.doneButton}
              onClick={handleHotelTraveller}
            >
              Done
            </div>
          </div>
        )}
        <div
          className={Classes.searchButtonHotel}
          onClick={handleSearch}
        >
          <h3>Modify Search</h3>
        </div>
      </div>
    </div>
  );
}

export default HotelSearchbar;
