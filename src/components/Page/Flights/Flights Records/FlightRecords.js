import React, { useState, useEffect } from "react";
import Navbar from "../../../components/NavBar/Navbar";
import moment from "moment";
import Classes from "./FlightRecord.module.css";
import { useAuth } from "../../../components/Context";
import FlightFrom from "../Flight DropDown/FlightsFrom";
import Divider from "@mui/material/Divider";
import FlightsTo from "../Flight DropDown/FlightsTo";
import DatePicker from "react-datepicker";
import FlightLists from "./FlightLists";

function FlightsRecords() {
  const [flightRecordFromOpen, setFlightRecordFromOpen] = useState(false);
  const [flightRecordToOpen, setFlightRecordToOpen] = useState(false);
  const [flightTraveller, setFlightTraveller] = useState(false);
  const {
    AirportFrom,
    AirportTo,
    travellersCount,
    flightdepartureDate,
    setFlightDepartureDate,
    seatCount, setSeatCount,seatAdultsCount, setSeatAdultsCount,seatChildrenCount, setSeatChildrenCount,seatInfantCount, setSeatInfantCount
  } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
  const [errorPost, setErrorPost] = useState("");
  const [sliderValue, setSliderValue] = useState(100);
  const [value, setValue] = useState("$gte");
  const [field, setField] = useState("ticketPrice");

  const CustomInput = ({ value, onClick }) => (
    <input
      type="text"
      className={Classes.inputFlightRecord}
      value={moment(value).format("DD MMM YYYY")}
      onClick={onClick}
      readOnly
    />
  );

  const handleFlightFormOpen = () => {
    setFlightRecordFromOpen(!flightRecordFromOpen);
  };
  const handleFlightToOpen = () => {
    setFlightRecordToOpen(!flightRecordToOpen);
  };
  const handleFlightTraveller = () => {
    setFlightTraveller(!flightTraveller);
  };
  const incrementAdultsSeatCount = () => {
    setSeatCount((prevCount) => prevCount + 1);
    setSeatAdultsCount((prevCount) => prevCount + 1);
  };

  const decrementAdultsSeatCount = () => {
    setSeatCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
    setSeatAdultsCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };
  const incrementChildrenSeatCount = () => {
    setSeatCount((prevCount) => prevCount + 1);
    setSeatChildrenCount((prevCount) => prevCount + 1);
  };

  const decrementChildrenSeatCount = () => {
    setSeatCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
    setSeatChildrenCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 0));
  };

  const incrementInfantSeatCount = () => {
    setSeatCount((prevCount) => prevCount + 1);
    setSeatInfantCount((prevCount) => prevCount + 1);
  };

  const decrementInfantSeatCount = () => {
    setSeatCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
    setSeatInfantCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 0));
  };
  async function handleSearch() {
    try {
      const projectID = "uojmjpx76p25";
      const dayAbbreviation = moment(flightdepartureDate).format("ddd");
      const apiUrl = `https://academics.newtonschool.co/api/v1/bookingportals/flight?day=${dayAbbreviation}&search={"source":"${AirportFrom[2]}","destination":"${AirportTo[2]}"}&filter={"${field}":{"${value}":${sliderValue}}}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          projectID: projectID,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.data.flights);
      } else {
        const errorData = await response.json();
        setErrorPost(errorData.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorPost("An error occurred. Please try again.");
    }
  }

  
  useEffect(() => {
    handleSearch();
  }, [sliderValue]);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };
  const handleCheckboxRatingChange = (value) => {
    setSliderValue(value === sliderValue ? null : value);
  };

  const handleClickSet = (type, key, data) => {
    setField(type);
    setValue(key);
    setSliderValue(data);
  };
  return (
    <div>
      <Navbar />
      <div className={Classes.flightSearchSection}>
        <div className={Classes.searchBarFlightDiv}>
          <div className={Classes.mainDivFlightRecordSearch}>
            <div
              onClick={handleFlightFormOpen}
              className={Classes.searchFromFlightRecord}
            >
              <div className="h-[100%]">
                <span className="text-[18px] font-[600] text-[#fff] cursor-pointer">
                  {AirportFrom[0]}
                </span>
                <div className="text-sm text-[#fff] cursor-pointer flex gap-[5px]">
                  <span>[{AirportFrom[2]}]</span>
                  <span>{AirportFrom[1]}</span>
                </div>
              </div>
            </div>
          </div>
          {flightRecordFromOpen && (
            <FlightFrom onclose={handleFlightFormOpen} />
          )}
          <div className={Classes.swapImageSection}>
          
            <div className="w-[100%] h-[30%] flex justify-center">
              <Divider orientation="vertical" className={Classes.dividerFlightRecord}/>
            </div>
            <img
              className="h-[40%]"
              src="https://flight.easemytrip.com/Content/img/modify_img/swap-nw-icn.png"
            />
            <div className="w-[100%] h-[30%] flex justify-center">
              <Divider orientation="vertical" className={Classes.dividerFlightRecord}/>
            </div>
          </div>
          <div className={Classes.mainDivFlightRecordSearch}>
            <div
              onClick={handleFlightToOpen}
              className={Classes.searchToFlightRecord}
            >
              <div className="h-[100%]">
                <span className="text-[18px] font-[600] text-[#fff] cursor-pointer">
                  {AirportTo[0]}
                </span>
                <div className="text-sm text-[#fff] cursor-pointer flex gap-[5px]">
                  <span>[{AirportTo[2]}]</span>
                  <span>{AirportTo[1]}</span>
                </div>
              </div>
            </div>
          </div>
          {flightRecordToOpen && <FlightsTo onclose={handleFlightToOpen} />}

          <div className="flex justify-center items-center h-[100%] w-[17%] max-[600px]:w-[100%] max-[600px]:border max-[600px]:border-solid max-[600px]:border-[#e0dede] max-[600px]:rounded-[5px]">
            <div className="w-[95%] h-[90%]">
              <div className="flex h-[40%]">
                <p className="text-[14px] font-[500] text-[#fff]">
                  DEPARTURE DATE
                </p>
              </div>
              <DatePicker
                selected={flightdepartureDate}
                onChange={(date) => setFlightDepartureDate(date)}
                minDate={new Date()}
                customInput={<CustomInput />}
              />
            </div>
          </div>
          <div className="flex justify-center items-center h-[100%] w-[17%] max-[600px]:w-[100%] max-[600px]:border max-[600px]:border-solid max-[600px]:border-[#e0dede] max-[600px]:rounded-[5px]">
            <div onClick={handleFlightTraveller}  className="w-[95%] h-[90%] flex flex-col gap-[5px]">
              <div>
                <p className="text-[14px] font-[500] text-[#fff]">
                  TRAVELLER & CLASS
                </p>
              </div>
              <div className="flex justify-evenly items-center">
              <span className="text-[17px] font-[600]  text-[#fff]">{seatCount}</span>
              <span className="text-[13px] text-[#fff] font-[600]"> Traveller(s)</span>
              <i className={Classes.dropDownArrowChild}></i>
              </div>
            </div>
          </div>
          {flightTraveller && 
           <div className="w-[15%] max-[600px]:w-[75%] h-55 absolute bg-slate-50 lg:mt-16 mt-[16em] p-2 rounded lg:ml-[55em] ml-[0] z-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
           <div className=" w-[98%] flex flex-col gap-[5px]">
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
               <div className="w-[100%] border border-solid border-[#2196f3] text-[14px] font-[600] bg-[#fff] text-[#2196f3] flex rounded-[5px] mt-[7px] cursor-pointer justify-center items-center hover:text-[#fff] hover:bg-[#2196f3] pt-[8px] pb-[8px]" onClick={handleFlightTraveller}> Done</div>
              

           </div> 
           </div>
          }
          <div className="w-[10%] max-[600px]:w-[100%] h-[100%] flex justify-center items-center max-[600px]:mb-[10px]">
            <div
              className={Classes.searchButtonFlightRecords}
              onClick={handleSearch}
            >
              <h3>SEARCH</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[100%] bg-[#e8f2fa] flex justify-center">
        <div className="w-[80%] h-[100%] flex flex-row gap-[20px]">
            <div className={Classes.filterSideBar}>
            <div className={Classes.flightDataPage}>
              <div className="text-[#000] text-[14px] font-[600] ">
                <p> FILTER </p>
              </div>

              <div className="mt-[20px] flex flex-col">
                <label
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                  for="slider"
                >
                  One Way Price
                </label>
                <input
                  type="range"
                  id="slider"
                  name="slider"
                  min="0"
                  max="2500"
                  value={sliderValue}
                  onChange={handleSliderChange}
                  onClick={() => handleClickSet("ticketPrice", "$gte")}
                />
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <p>Min: 0</p> <p>Max: 2500</p>
                </div>
              </div>
              <div className="mt-[30px]">
                <p className="text-[#000] text-[14px] font-[600] ">
                  Stops From {AirportFrom[0]}
                </p>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="0"
                      checked={sliderValue === "0"}
                      onChange={() => handleCheckboxRatingChange("0")}
                      onClick={() => handleClickSet("stops", "$eq", "0")}
                    />
                    <label>Non Stop</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="1"
                      checked={sliderValue === "1"}
                      onChange={() => handleCheckboxRatingChange("1")}
                      onClick={() => handleClickSet("stops", "$eq", "1")}
                    />
                    <label>1 Stop</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="2"
                      checked={sliderValue === "2"}
                      onChange={() => handleCheckboxRatingChange("2")}
                      onClick={() => handleClickSet("stops", "$eq", "2")}
                    />
                    <label>2 Stop</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
              </div>
              <div className="mt-[30px]">
                <p className="text-[#000] text-[14px] font-[600] ">Duration</p>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="1"
                      checked={sliderValue === 1}
                      onChange={() => handleCheckboxRatingChange(1)}
                      onClick={() => handleClickSet("duration", "$eq", 1)}
                    />
                    <label>1 hour</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="2"
                      checked={sliderValue === 2}
                      onChange={() => handleCheckboxRatingChange(2)}
                      onClick={() => handleClickSet("duration", "$eq", 2)}
                    />
                    <label>2 hour</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="3"
                      checked={sliderValue === 3}
                      onChange={() => handleCheckboxRatingChange(3)}
                      onClick={() => handleClickSet("duration", "$eq", 3)}
                    />
                    <label>3 hour</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="4"
                      checked={sliderValue === 4}
                      onChange={() => handleCheckboxRatingChange(4)}
                      onClick={() => handleClickSet("duration", "$eq", 4)}
                    />
                    <label>4 hour</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="5"
                      checked={sliderValue === 5}
                      onChange={() => handleCheckboxRatingChange(5)}
                      onClick={() => handleClickSet("duration", "$eq", 5)}
                    />
                    <label>5 hour</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
                <div className="flex justify-between">
                  <div className="mt-[10px] flex gap-[5px] text-[12px] font-[400] text-[#333] cursor-pointer">
                    <input
                      type="checkbox"
                      value="6"
                      checked={sliderValue === 6}
                      onChange={() => handleCheckboxRatingChange(6)}
                      onClick={() => handleClickSet("duration", "$eq", 6)}
                    />
                    <label>6 hour</label>
                  </div>
                  <p style={{ marginTop: "10px" }}></p>
                </div>
              </div>
              <div className="mt-[30px]">
                <p className="text-[#000] text-[14px] font-[600] ">
                  Departure From {AirportFrom[0]}
                </p>
                <div className="w-[100%]">
                  <div className="w-[100%] border border-solid border-[#e0e0e0] bg-[#fff] mt-[5px] rounded-[5px] flex">
                    <div
                      className="w-[25%] border border-solid border-[#e0e0e0] cursor-pointer flex flex-col justify-center items-center"
                      onClick={() =>
                        handleClickSet("departureTime", "$lt", "6")
                      }
                    >
                      <div className={Classes.filterImageSun}></div>
                      <div className="w-[100%] text-[#737373] text-[10px] items-center flex flex-col justify-center">
                        <span> Before </span>
                        <span> 6 AM</span>
                      </div>
                    </div>
                    <div
                      className="w-[25%] border border-solid border-[#e0e0e0] cursor-pointer flex flex-col justify-center items-center"
                      onClick={() =>
                        handleClickSet("departureTime", "$lte", "12")
                      }
                    >
                      <div className={Classes.filterImageMid}></div>
                      <div className="w-[100%] text-[#737373] text-[10px] items-center flex flex-col justify-center">
                        <span>6 AM -</span>
                        <span> 12 PM</span>
                      </div>
                    </div>
                    <div
                      className="w-[25%] border border-solid border-[#e0e0e0] cursor-pointer flex flex-col justify-center items-center"
                      onClick={() =>
                        handleClickSet("departureTime", "$lte", "18")
                      }
                    >
                      <div className={Classes.filterImageEve}></div>
                      <div className="w-[100%] text-[#737373] text-[10px] items-center flex flex-col justify-center">
                        <span>12 PM -</span>
                        <span> 6 PM</span>
                      </div>
                    </div>
                    <div
                      className="w-[25%] border border-solid border-[#e0e0e0] cursor-pointer flex flex-col justify-center items-center"
                      onClick={() =>
                        handleClickSet("departureTime", "$gte", "18")
                      }
                    >
                      <div className={Classes.filterImageNight}></div>
                      <div className="w-[100%] text-[#737373] text-[10px] items-center flex flex-col justify-center">
                        <span> After</span>
                        <span> 6 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[79%] max-[600px]:w-[100%] h-[100%] ">
            <FlightLists searchResults={searchResults} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default FlightsRecords;
