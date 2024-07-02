import React,{useState} from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import {Divider} from "@mui/material";
import Classes from "./Hotels.module.css";
import { useAuth } from "../../components/Context";
import "react-datepicker/dist/react-datepicker.css";

function HotelSearchbar(){
  const [HotelTraveller, setHotelTraveller] = useState(false);
    const{
        setHotelLocation,
        hotelLocation,
        setHotelDepartureDate,
        hotelDepartureDate,
        searchHotelResults, setSearchHotelResults,
        isSelectedDayCheckOut, setSelectedDayCheckOut, seatHotelCount, setSeatHotelCount,seatHotelAdultsCount,
        setSeatHotelAdultsCount,seatHotelChildrenCount,setSeatHotelChildrenCount,
    }=useAuth();

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

    const handleSetLocation = (e) => {
        setHotelLocation(e.target.value);
      };

      const handleSearch=()=>{
        setSearchHotelResults([]);

      }

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
    return(
        <div className={Classes.searchBarHotelHeaders}>
        <div className={Classes.searchBarHotel}>
          <div className={Classes.searchBHedersHotel}>
            <div className={Classes.searchFromHotel}>
              <p className={Classes.headingInputHotel}>
                Enter City name,Location or Specific hotel
              </p>
              <div className={Classes.inputFormSectionHotel}>
                <input
                  className={Classes.formSearchBoxHotel}
                  placeholder="Enter City name,Location"
                  value={hotelLocation}
                  onChange={handleSetLocation}
                ></input>
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
            <div onClick={handleHotelTraveller}  className={Classes.searchRoomsClick}>
              <div>
              <p className={Classes.headingCheckOut}>Guests</p>
              </div>
              <div className="flex justify-evenly items-center">
              <span className=" text-[#000]">{seatHotelCount}</span>
              <span className=" text-[#000]"> Guests(s)</span>
              <i className={Classes.dropDownArrow}></i>
              </div>
            </div>
          </div>
          {HotelTraveller && 
          <div className="w-[15%] h-55 absolute bg-slate-50 mt-[11em] p-2 rounded ml-[52em] z-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
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

          <div
            className={Classes.searchButtonHotel}
            onClick={handleSearch}
          >
            <h3>Modify Search</h3>
          </div>
        </div>
      </div>
    )
}
export default HotelSearchbar;