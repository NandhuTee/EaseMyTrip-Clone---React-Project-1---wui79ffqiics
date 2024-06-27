import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import Classes from "../Hotels.module.css";
import Navbar from "../../../components/NavBar/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import _debounce from "lodash/debounce";
import { Divider} from "@mui/material";
import { useAuth } from "../../../components/Context";
import ListItemButton from "@mui/material/ListItemButton";
import HotelResult from "./HotelResult";

function Hotels() {
  const {
    setHotelLocation,
    hotelLocation,
    hotelDepartureDate,
    setHotelDepartureDate,
    searchHotelResults,
    setSearchHotelResults,
    isSelectedDayCheckOut,
    setSelectedDayCheckOut,
    seatHotelCount, setSeatHotelCount,seatHotelAdultsCount,
    setSeatHotelAdultsCount,seatHotelChildrenCount,setSeatHotelChildrenCount
  } = useAuth();
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [initialApiCallMade, setInitialApiCallMade] = useState(false);

  const [originalHotelData, setOriginalHotelData] = useState([]);
  const [hotelErrorPost, setHotelErrorPost] = useState("");
  const [sortOption, setSortOption] = useState("");
  
  const [selectedOption, setSelectedOption] = useState(0);
  const [value, setValue] = useState("$gte");
  const [field, setField] = useState("rating");
  const locations = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Kolkata",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Surat",
    "Jaipur",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Pimpri-Chinchwad",
    "Patna",
    "Vadodara",
    "Ghaziabad",
    "Jodhpur",
    "Dhanbad",
    "Gwalior",
    "Rajkot",
    "Kalyan-Dombivali",
    "Vasai-Virar",
    "Ludhiana",
    "Meerut",
    "Amritsar",
    "Agra",
    "Faridabad",
    "Coimbatore",
    "Varanasi",
    "Allahabad",
    "Vijayawada",
    "Jabalpur",
    "Raipur",
    "Srinagar",
  ];
  const [filteredLocations, setFilteredLocations] = useState(locations);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [HotelTraveller, setHotelTraveller] = useState(false);
  const openDropdown = () => {
    setDropdownOpen(true);
  };

  const closeDropdown=()=>{
    console.log("Closing dropdown");
    setDropdownOpen(false);
  };
  const CustomInput = ({ value, onClick }) => (
    <input
      className={Classes.hotelInputDatepickIn}
      type="text"
      value={moment(value).format("DD MMM YYYY")}
      onClick={onClick}
      readOnly
    />
  );
  const CustomInputCheckout = ({ value, onClick }) => (
    <input
      className={Classes.hotelinputDatepickOut}
      type="text"
      value={moment(value).format("DD MMM YYYY")}
      onClick={onClick}
      readOnly
    />
  );
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setHotelLocation(inputValue);

    const filtered = inputValue ==="" ? locations :locations.filter((location) =>
    location.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredLocations(filtered);
  };
  async function handleHotelSearch() {

    if (isFetching || (initialApiCallMade && page < 1)) {
      return;
    }
    try {
      setIsFetching(true);
      //const projectID = "2zqsmiro66wm";
      const projectID = "uojmjpx76p25";
      const formattedDate = moment(hotelDepartureDate).format("dddd");
      let apiUrlHotel = `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${hotelLocation}"}&day="${formattedDate}"&filter={"${field}":{"${value}":${selectedOption}}}&limit=10&page=${page}`;
      const response = await fetch(apiUrlHotel, {
        method: "GET",
        headers: {
          projectID: projectID,
        },
      });
      if (response.ok) {
        setPage((prevPage) => prevPage + 1);
        const hotelData = await response.json();
        setSearchHotelResults((prevData) => [
          ...prevData,
          ...hotelData.data.hotels,
        ]);
        if (!initialApiCallMade) {
          setInitialApiCallMade(true);
        }
      } else {
        const errorData = await response.json();
        setHotelErrorPost(errorData.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setHotelErrorPost("An error occurred. Please try again.");
    } finally {
      setIsFetching(false);
    }
  }
  const handleScroll = _debounce(() => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      handleHotelSearch();
      // filterByPriceRange(lowerPrice,highPrice);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleSetLocation = (e) => {
    setHotelLocation(e.target.value);
  };
  const handleCheckboxRatingChange = (value) => {
    setSelectedOption(value === selectedOption ? 0 : value);
  };

  const handleLocationClick = (location) => {
    setHotelLocation(location);
   
  };
  const handleClickSet = (type, key, data) => {
    setField(type);
    setValue(key === value ? "$gte":key);
    setSelectedOption(data);
    setPage(1);
    setSearchHotelResults([]);
    // handleHotelSearch();
  };
  
  function resetFilters() {
    setSearchHotelResults([...originalHotelData]);
  }
  useEffect(() => {
    if (!originalHotelData && searchHotelResults) {
      setOriginalHotelData([...searchHotelResults]);
    }
  }, [searchHotelResults, originalHotelData]);
  // const resetFilters = () => {
  //   setSelectedRating(null);
  //   setSelectedPriceRange(null);
  //   setSelectedRoomTypes([]);
  // };
  useEffect(() => {
    handleHotelSearch();
    setPage(1);
  }, [selectedOption,field,value]);

  const handleSearch = () => {
    setSearchHotelResults([]);
    handleHotelSearch();
  };

  const handleHotelTraveller = () => {
    setHotelTraveller(!HotelTraveller);
  };

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
    <div className={Classes.hotelsParent}>
      <Navbar />
      <div className={Classes.searchBarHotelHeaders}>
        <div className={Classes.searchBarHotel}>
          <div className={Classes.searchBHedersHotel}>
            <div className={Classes.searchFromHotel}>
              <p className={Classes.headingInputHotel}>
                Enter City name,Location or Specific hotel
              </p>
              <div className={Classes.inputFormSectionHotel} onClick={openDropdown}>
                <input
                  className={Classes.formSearchBoxHotel}
                  placeholder="Enter City name,Location"
                  value={hotelLocation}
                  onChange={handleInputChange}
                ></input>
                {isDropdownOpen && (
                  <div className={Classes.dropMyLocationChild} onMouseLeave={closeDropdown}>
                    {filteredLocations.map((location, index) => (
                      <ListItemButton
                        key={index}
                        onClick={() =>{handleLocationClick(location);}
                        }
                      >
                        <p className={Classes.locationP}>{location}</p>
                        
                      </ListItemButton>
                    ))}
                  </div>
                )}
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
            <Divider orientation="vertical" className=" max-[600px]:hidden"/>
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
            <div onClick={handleHotelTraveller}  className={Classes.searchRoomsClick}>
              <div>
              <p className={Classes.headingCheckOut}>Guests</p>
              </div>
              <div className="flex justify-evenly items-center max-[600px]:mb-[5px]">
              <span className=" text-[#000]">{seatHotelCount}</span>
              <span className=" text-[#000]"> Guests(s)</span>
              <i className={Classes.dropDownArrow}></i>
              </div>
            </div>
          </div>
          {HotelTraveller && 
          <div className="w-[15%] max-[600px]:w-[80%] h-55 absolute bg-slate-50 mt-[11em] p-2 rounded lg:ml-[52em] ml-[0] z-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className=" w-[98%] flex flex-col gap-[5px]">
                <div className="w-[100%] flex mb-[15px] mt-[5px] justify-between items-center">
                    <div className="flex flex-col justify-center">
                        <p className="text-[13px] text-[#000] font-[600]"> Adults</p>
                        <p className="text-[11px]">(12+ Years)</p>
                    </div>
                    <div className=" rounded-[4px] border border-[#dcdcdc] border-solid flex items-center">
                        <button className="w-[26px] h-[31px] border-[0] text-[18px] cursor-pointer text-[#000]" onClick={decrementHotelAdultsSeatCount} disabled={seatHotelAdultsCount <= 1}>-</button>
                        <input className={Classes.travellerInput}type="text" value={seatHotelAdultsCount} readOnly/>
                        <button className="w-[26px] h-[31px] border-[0] text-[18px] cursor-pointer text-[#000]" onClick={incrementHotelAdultsSeatCount} disabled={seatHotelAdultsCount >= 9}>+</button>
                    </div>
                </div>
                <div className="w-[100%] flex mb-[15px] justify-between items-center">
                    <div className="flex flex-col justify-center">
                        <p className="text-[13px] text-[#000] font-[600]"> Children</p>
                        <p className="text-[11px]">(2-12 Years)</p>
                    </div>
                    <div className=" rounded-[4px] border border-[#dcdcdc] border-solid flex items-center">
                        <button className="w-[26px] h-[31px] border-[0] text-[18px] cursor-pointer text-[#000]" onClick={decrementHotelChildrenSeatCount} disabled={seatHotelChildrenCount <= 0}>-</button>
                        <input className={Classes.travellerInput}type="text" value={seatHotelChildrenCount} readOnly/>
                        <button className="w-[26px] h-[31px] border-[0] text-[18px] cursor-pointer text-[#000]" onClick={incrementHotelChildrenSeatCount} disabled={seatHotelChildrenCount >= 9}>+</button>
                    </div>
                </div>
               
                <div className="w-[100%] border border-solid border-[#2196f3] text-[14px] font-[600] bg-[#fff] text-[#2196f3] flex rounded-[5px] mt-[7px] cursor-pointer justify-center items-center hover:text-[#fff] hover:bg-[#2196f3] pt-[8px] pb-[8px]" onClick={handleHotelTraveller}> Done</div>
               

            </div> 
            </div>
          }
          <div className={Classes.searchButtonHotel} onClick={handleSearch}>
            <h3>SEARCH</h3>
          </div>
        </div>
      </div>
      {/* <div className={Classes.rightHeaderHotel}>
        <div>
          <h5>hotel</h5>
        </div>
        <div className={Classes.hotelSorting}>
          <input></input>
          <p>Sort By:</p>
          <select
            onChange={(e) => handleSort(e.target.value)}
            value={sortOption}
            // open={isOpen}
            name="selectedFruit"
          >
            <option value="">-- Select Option --</option>
            <option value="price">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
            <option value="rating">Customer Ratings</option>
          </select>
        </div>
      </div> */}

      <div className={Classes.hotelbackgroundSection}>
        <div className={Classes.hotelMainSection}>
          <div className={Classes.leftSideDataHotel}>
            <div className={Classes.hotelMap}>
              <div className={Classes.hotelMapImageDiv}>
                <img src="https://www.easemytrip.com/hotels/images/maplocico.svg" />
                <button className={Classes.mapButton}>Show on Map</button>
              </div>
            </div>
            <div className={Classes.filterSection}>
              <div className={Classes.filterHotelReset}>
                <p className={Classes.resetAllHotel} onClick={resetFilters}>
                  Reset All
                </p>
              </div>
              <div className={Classes.filterPriceSection}>
                <div className={Classes.filterPriceHeading}>
                  <h3>Price per night</h3>
                </div>
                <div className={Classes.filterHotelPriceCheckBoxDiv}>
                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="2000"
                      checked={selectedOption === 2000}
                      onChange={() => handleCheckboxRatingChange(2000)}
                      onClick={() => handleClickSet("avgCostPerNight", "$lte", 2000)}
                    />{" "}
                    <img
                      className={Classes.hotelINRLogo}
                      src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_grey.svg"
                    />{" "}
                    Below - ₹ 2000
                  </label>
                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="3000"
                      checked={selectedOption === 3000}
                      onChange={() => handleCheckboxRatingChange(3000)}
                      onClick={() => handleClickSet("avgCostPerNight", "$lte", 3000)}
                    />{" "}
                    <img
                      className={Classes.hotelINRLogo}
                      src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_grey.svg"
                    />{" "}
                    ₹ 2001 - ₹ 3000
                  </label>

                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="5000"
                      checked={selectedOption === 5000}
                      onChange={() => handleCheckboxRatingChange(5000)}
                      onClick={() => handleClickSet("avgCostPerNight", "$lte", 5000)}
                    />{" "}
                    <img
                      className={Classes.hotelINRLogo}
                      src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_grey.svg"
                    />{" "}
                    ₹ 3001 - ₹ 5000
                  </label>

                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="5001"
                      checked={selectedOption === 5001}
                      onChange={() => handleCheckboxRatingChange(5001)}
                      onClick={() => handleClickSet("avgCostPerNight", "$gte", 5001)}
                    />{" "}
                    <img
                      className={Classes.hotelINRLogo}
                      src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_grey.svg"
                    />{" "}
                    ₹ 5001 - ₹ 8000
                  </label>

                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="8000"
                      checked={selectedOption === 8000}
                      onChange={() => handleCheckboxRatingChange(8000)}
                      onClick={() => handleClickSet("avgCostPerNight", "$gte", 8000)}
                    />{" "}
                    <img
                      className={Classes.hotelINRLogo}
                      src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_grey.svg"
                    />{" "}
                    above - ₹ 8000
                  </label>
                </div>
              </div>
              <div className={Classes.filterPriceSection}>
                <div className={Classes.filterPriceHeading}>
                  <h3>User Rating</h3>
                </div>
                <div className={Classes.filterHotelPriceCheckBoxDiv}>
                <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="5"
                      checked={selectedOption === 5}
                      onChange={() => handleCheckboxRatingChange(5)}
                      onClick={() => handleClickSet("rating", "$eq", 5)}
                    />{" "}
                    Excellent: 5
                  </label>
                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="4.5"
                      checked={selectedOption === 4.5}
                      onChange={() => handleCheckboxRatingChange(4.5)}
                      onClick={() => handleClickSet("rating", "$eq", 4.5)}
                    />{" "}
                    Excellent: 4.5+
                  </label>
                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="4"
                      checked={selectedOption === 4}
                      onChange={() => handleCheckboxRatingChange(4)}
                      onClick={() => handleClickSet("rating", "$eq", 4)}
                    />{" "}
                    Very Good: 4+
                  </label>
                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="3.5"
                      checked={selectedOption === 3.5}
                      onChange={() => handleCheckboxRatingChange(3.5)}
                      onClick={() => handleClickSet("rating", "$eq", 3.5)}
                    />{" "}
                    Good: 3.5+
                  </label>

                  <label className={Classes.lableHotelPrice}>
                    <input
                      type="checkbox"
                      value="3"
                      checked={selectedOption === 3}
                      onChange={() => handleCheckboxRatingChange(3)}
                      onClick={() => handleClickSet("rating", "$eq", 3)}
                    />{" "}
                    Average: 3+
                  </label>
                </div>
              </div>
              <div>
                
              </div>
            </div>
          </div>

          <div className={Classes.rightSideDataHotel}>
            <HotelResult searchHotelResults={searchHotelResults} />
          </div>
        </div>
      </div>
      {isFetching && <p>Loading...</p>}
    </div>
  );
}
export default Hotels;
