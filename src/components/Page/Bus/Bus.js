import React,{useState,useEffect} from "react";
import Navbar from "../../components/NavBar/Navbar";
import Classes from "./Bus.module.css";
import Divider from "@mui/material/Divider";
import { useAuth } from "../../components/Context";
import BusFrom from "./Drop Down/BusFrom";
import BusTo from "./Drop Down/BusTo";
import DatePicker from "react-datepicker";
import moment from "moment";
import {useNavigate } from "react-router-dom";
function Bus(){
  const {busdepartureDate, setBusDepartureDate,busCity, busToCity} = useAuth();
  const [busFromOpen, setBusFromOpen] = useState(false);
    const [busToOpen, setBusToOpen] = useState(false);
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [selectedOfferType, setSelectedOfferType] = useState("CABS");
    const CustomInput = ({ value, onClick }) => (
      <input
        type="text"
        className={Classes.inputBus}
        value={moment(value).format("DD MMM YYYY")}
        onClick={onClick}
        readOnly
      />
    );
  const handleSearchTrain = () => {
    navigate("/busrecord");
    };
    const handleBusCityInput = () => {
      setBusFromOpen(!busFromOpen);
    };
  const handleBusCityToInput = () => {
    setBusToOpen(!busToOpen);
    };
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const yourProjectID = "wui79ffqiics";
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
    return(
        <div>
            <Navbar/>
            <div className={Classes.BusBooking}>
            <div className=" border w-[100%] h-[5vh] flex flex-row justify-center items-center">
          <div className="w-[75%] h-[100%] flex justify-end items-center">
            <h1 className="text-[20px] text-[#fff] font-[600]">
            Online Bus Tickets!
            </h1>
          </div>
        </div>
        <div className={Classes.searchBarBus}>
          <div className={Classes.mainDivBusSearch}>
            <div
              onClick={handleBusCityInput}
              className={Classes.searchFromBus}
            >
              <div className={Classes.inputHeadingT}>
                <p className={Classes.pInputBus}>From</p>
              </div>
              <div>
                <span className="text-[19px] font-[600] text-[#000] max-[600px]:mb-[5px] cursor-pointer flex items-center">
                  {busCity}
                </span>
              </div>
            </div>
          </div>
          {busFromOpen && <BusFrom onClose={handleBusCityInput} />}
          <div className={Classes.swapDiv}>
          <div className="w-[100%] h-[30%] flex justify-center">
              <Divider orientation="vertical" className={Classes.deviderBus}/>
            </div>
          <img
            className={Classes.swapTIcon}
            src="https://www.easemytrip.com/Content/img/swipe_icon.svg"
          />
          <div className="w-[100%] h-[30%] flex justify-center">
              <Divider orientation="vertical" className={Classes.deviderBus}/>
            </div>
          </div>
          <div className={Classes.mainDivBusSearch}>
            <div
              onClick={handleBusCityToInput}
              className={Classes.searchToBus}
            >
              <div className={Classes.inputHeading}>
                <p className={Classes.pInputBus}>To</p>
              </div>
              <div>
              <span className="text-[19px] font-[600] text-[#000] max-[600px]:mb-[5px] cursor-pointer flex items-center">
                  {busToCity}
                </span>
              </div>
            </div>
          </div>
          {busToOpen && <BusTo onClose={handleBusCityToInput} />}

          <Divider orientation="vertical" className={Classes.deviderBus}/>
          <div className={Classes.searchDepartureBus}>
            <div className="w-[92%] h-[90%] flex justify-center">
              <div className="flex flex-col  w-[80%]">
                <p className={Classes.pInputBus}>Departure Date</p>
                <DatePicker
                selected={busdepartureDate}
                onChange={(date) => setBusDepartureDate(date)}
                minDate={new Date()}
                customInput={<CustomInput />}
              />
              </div>
              <div className="w-[20%] flex items-center justify-center">
              <img src="https://www.easemytrip.com/images/hotel-img/hp_icon_2.png" />
              </div>
              
            </div>
          </div>
          <div className="w-[20%] max-[600px]:w-[90%] max-[600px]:rounded-[40px] h-[100%] lg:mt-[0] mt-[5px] lg:mb-[0] mb-[5px] bg-[#ef6614] flex justify-center items-center text-[#fff] cursor-pointer" onClick={handleSearchTrain}>
            <h3 className=" max-[600px]:h-[4vh] flex items-center ">SEARCH</h3>
          </div>
        </div>
      </div>
      <div className="h-[5vh] mt-[25px] flex justify-center items-center">
        <div className="h-[90%] w-[15%] max-[600px]:w-[100%] flex justify-center items-center">
          <h3 className="text-[28px] font-[700]">Exclusive Offers</h3>
        </div>
      </div>
      <div className="h-[45vh] mt-[25px] w-[100%] flex flex-row items-center overflow-y-auto gap-[10px]">
        {loading ? (
          <p>Loading offers...</p>
        ) : (
          offers.map((offer) => (
            <div className={Classes.busOfersBoxes} key={offer.id}>
              <div className="h-[95%] w-[95%] mt-[7px] max-[600px]:flex max-[600px]:flex-col ">
                <div className="h-[70%] max-[600px]:h-[50%] w-[100%] rounded-[10px]">
                  <img
                    className="w-[100%] h-[100%] rounded-[10px]"
                    src={offer.heroUrl}
                    alt={offer.title}
                  />
                </div>

                <div className="text-[13px] font-[600] text-[#172033] w-[100%] mt-[10px]">
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
    )
}
export default Bus;