import { useState, useEffect } from "react";
import Classes from "./HotelHome.module.css";
import Navbar from "../../components/NavBar/Navbar";
import Divider from "@mui/material/Divider";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useAuth } from "../../components/Context";
import ListItemButton from "@mui/material/ListItemButton";
import {useNavigate } from "react-router-dom";

function HotelHome() {
  const {
    setHotelLocation,
    hotelLocation,
    hotelDepartureDate,
    setHotelDepartureDate,
    isSelectedDayCheckOut, setSelectedDayCheckOut,seatHotelCount, setSeatHotelCount,seatHotelAdultsCount,
    setSeatHotelAdultsCount,seatHotelChildrenCount,setSeatHotelChildrenCount
  } = useAuth();
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOfferType, setSelectedOfferType] = useState("HOTELS");
  const [loading, setLoading] = useState(true);
  const [HotelTraveller, setHotelTraveller] = useState(false);
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

  const CustomInput = ({ value, onClick }) => (
    <input
      type="text"
      className={Classes.inputhotel}
      value={moment(value).format("DD MMM YYYY")}
      onClick={onClick}
      readOnly
    />
  );
  const CustomInputReturn = ({ value, onClick }) => (
    <input
      type="text"
      className={Classes.inputhotel}
      value={moment(value).format("DD MMM YYYY")}
      onClick={onClick}
      readOnly
    />
  );
  const handleSearch = () => {
    navigate("/hotels");
  };
  const openDropdown = () => {
    setDropdownOpen(true);
  };

  const closeDropdown=()=>{
    console.log("Closing dropdown");
    setDropdownOpen(false);
  };
  const handleLocationClick = (location) => {
    setHotelLocation(location);
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setHotelLocation(inputValue);

    const filtered = inputValue ==="" ? locations :locations.filter((location) =>
    location.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredLocations(filtered);
  };

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        //const yourProjectID = "2zqsmiro66wm";
        const yourProjectID = "uojmjpx76p25";
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"${selectedOfferType}"}`,
          {
            method: "GET",
            headers: {
              projectID: yourProjectID,
            },
          }
        );
        const data = await response.json();
        setOffers(data.data.offers);
      } catch (error) {
        console.error("Error fetching offers:", error);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [selectedOfferType]);

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
    <div className={Classes.flightsSection}>
      <Navbar />

      <div className={Classes.hotelSearchSection}>
        <div className={Classes.headSearchbar}>
          <div className={Classes.captionHotel}>
            <h1 className={Classes.searchLowestH1}>
              Same hotel, Cheapest price. Guaranteed!
            </h1>
          </div>
        </div>
        <div className={Classes.searchBar}>
          <div className={Classes.mainDivSearch}>
            <div className={Classes.searchFrom}>
              <div className={Classes.inputHeading}>
                <img src="https://www.easemytrip.com/images/hotel-img/hp_icon_1.png" />
                <p className={Classes.pInput}>Enter City name, Location</p>
              </div>
              <div className={Classes.inputFormSection} onClick={openDropdown}>
                <input
                  className={Classes.formSearchBox}
                  placeholder="FROM"
                  value={hotelLocation}
                  onChange={handleInputChange}
                ></input>
                {isDropdownOpen && (
                  <div className={Classes.dropMyLocation}onMouseLeave={closeDropdown}>
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
          <Divider orientation="vertical" className={Classes.dividerHotel}/>
          <div className={Classes.hotelhomesSectionCheckIn}>
            <div className={Classes.hotelhomeCheckIn}>
              <div className={Classes.checkInHeading}>
                <img src="https://www.easemytrip.com/images/hotel-img/hp_icon_2.png" />
                <p className={Classes.pInput}>Check-in</p>
              </div>

              <DatePicker
                selected={hotelDepartureDate}
                onChange={(date) => setHotelDepartureDate(date)}
                minDate={new Date()}
                customInput={<CustomInput />}
              />
            </div>
          </div>
          <Divider orientation="vertical" className={Classes.dividerHotel}/>
          <div className={Classes.searchReturn}>
            <div className={Classes.hotelCheckOut}>
              <div className={Classes.checkOutHeading}>
                <img src="https://www.easemytrip.com/images/hotel-img/hp_icon_2.png" />
                <p className={Classes.pInput}>Check-out</p>
              </div>
              <DatePicker
                selected={isSelectedDayCheckOut}
                onChange={(date) => setSelectedDayCheckOut(date)}
                minDate={new Date()}
                customInput={<CustomInputReturn />}
              />
            </div>
          </div>
          <Divider orientation="vertical" className={Classes.dividerHotel}/>
          <div className={Classes.searchTraveller}>
            <div onClick={handleHotelTraveller} className={Classes.hotelChooseRooms}>
              <div>
                <p className={Classes.pInput}>Guests</p>
              </div>
              <div className="flex justify-evenly items-center">
              <span className="text-[26px] font-[600] text-[#000]">{seatHotelCount}</span>
              <span className="text-[13px] text-[#000] font-[600]"> Guests(s)</span>
              <i className={Classes.dropDownArrow}></i>
              </div>
            </div>
          </div>
          {HotelTraveller && 
          <div className="w-[15%] max-[600px]:w-[80%] h-55 absolute bg-slate-50 lg:mt-14 mt-[19em] p-2 rounded lg:ml-[52em] ml-[0] z-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
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
          <div className={Classes.searchButton} onClick={handleSearch}>
            <h3 className={Classes.h3SubmitBtnHotel}>SEARCH</h3>
          </div>
        </div>
      </div>
      <div className={Classes.hotelHomeQr}>
        <div className={Classes.qrImageDiv}>
          <img
            className={Classes.imageQr}
            src="https://www.easemytrip.com/images/hotel-img/app-download-strip3.png"
          />
        </div>
      </div>
      <div className={Classes.offerHeading}>
        <div className={Classes.headingDiv}>
          <h3 className={Classes.headingOffers}>Exclusive Offers</h3>
        </div>
      </div>
      <div className={Classes.hotelOffersSection}>
        {loading ? (
          <p>Loading offers...</p>
        ) : (
          offers.map((offer) => (
            <div className={Classes.hotelOfersBoxes} key={offer.id}>
              <div className={Classes.offersImagediv}>
                <div className={Classes.hotelOffersImage}>
                  <img
                    className={Classes.imageOffersHotel}
                    src={offer.heroUrl}
                    alt={offer.title}
                  />
                </div>

                <div className={Classes.descriptionHoteloffer}>
                  <p>
                    {offer.pTl} {offer.pTx}
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
export default HotelHome;
