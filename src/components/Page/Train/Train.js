import React,{useState,useEffect} from "react";
import Navbar from "../../components/NavBar/Navbar";
import Classes from "./Train.module.css";
import Divider from "@mui/material/Divider";
import DatePicker from "react-datepicker";
import moment from "moment";
import { useAuth } from "../../components/Context";
import TrainFrom from "./DropDown/TrainFrom";
import TrainTo from "./DropDown/TrainTo";
import {useNavigate } from "react-router-dom";
function Train(){
    const {traindepartureDate, setTrainDepartureDate,trainCity,trainToCity} = useAuth();
    const [trainFromOpen, setTrainFromOpen] = useState(false);
    const [trainToOpen, setTrainToOpen] = useState(false);
    const [offers, setOffers] = useState([]);
    const navigate = useNavigate();
    const [selectedOfferType, setSelectedOfferType] = useState("RAILS");
    const [loading, setLoading] = useState(true);
    const CustomInput = ({ value, onClick }) => (
        <input
          type="text"
          className={Classes.inputTrain}
          value={moment(value).format("DD MMM YYYY")}
          onClick={onClick}
          readOnly
        />
      );
    const handleSearchTrain = () => {
      navigate("/trainrecord");
      };
      const handleTrainCityInput = () => {
        setTrainFromOpen(!trainFromOpen);
      };
    const handleTrainCityToInput = () => {
        setTrainToOpen(!trainToOpen);
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
            <div className={Classes.trainBooking}>
        <div className={Classes.headtrainSearchbar}>
          <div className={Classes.captionTrain}>
            <img src="https://www.easemytrip.com/images/train-img/train-icon.svg"/>
            <p> Book Train Tickets</p>
          </div>
        </div>
        <div className={Classes.searchBarTrain}>
          <div className={Classes.mainDivTrainSearch}>
            <div
              onClick={handleTrainCityInput}
              className={Classes.searchFromTrain}
            >
              <div className={Classes.inputHeadingT}>
                <p className={Classes.pInputTrain}>From</p>
              </div>
              <div>
                <span className="text-[16px] font-[600] text-[#000] cursor-pointer flex items-center">
                  {trainCity}
                </span>
              </div>
            </div>
          </div>
          {trainFromOpen && <TrainFrom onClose={handleTrainCityInput} />}
          <div className={Classes.swapDiv}>
          <div className="w-[100%] h-[30%] max-[600px]:block  flex justify-center">
              <Divider orientation="vertical" className={Classes.dividerTrain}/>
            </div>
          <img
            className={Classes.swapTIcon}
            src="https://www.easemytrip.com/Content/img/swipe_icon.svg"
          />
          <div className="w-[100%] h-[30%] max-[600px]:block flex justify-center">
              <Divider orientation="vertical" className={Classes.dividerTrain}/>
            </div>
          </div>
          <div className={Classes.mainDivTrainSearch}>
            <div
              onClick={handleTrainCityToInput}
              className={Classes.searchToTrain}
            >
              <div className={Classes.inputHeading}>
                <p className={Classes.pInputTrain}>To</p>
              </div>
              <div>
              <span className="text-[16px] font-[600] text-[#000] cursor-pointer flex items-center">
                  {trainToCity}
                </span>
              </div>
            </div>
          </div>
          {trainToOpen && <TrainTo onClose={handleTrainCityToInput} />}

          <Divider orientation="vertical" className={Classes.dividerTrain}/>
          <div className={Classes.searchDepartureTrain}>
            
            <div className={Classes.trainhomeDeparture}>
              <div className={Classes.departureHeading}>
                <img src="https://www.easemytrip.com/images/hotel-img/hp_icon_2.png" />
                <p className={Classes.pInputFlight}>DEPARTURE DATE</p>
              </div>
              <DatePicker
                selected={traindepartureDate}
                onChange={(date) => setTrainDepartureDate(date)}
                minDate={new Date()}
                customInput={<CustomInput />}
              />
            </div>
          </div>
          <div className={Classes.searchButtonTrain} onClick={handleSearchTrain}>
            <h3 className={Classes.h3SearchBtnTrain}>SEARCH</h3>
          </div>
        </div>
        <div className="text-[15px] text-[#fff] flex items-center justify-center w-[100%] lg:mt-[30px] mt-[20px] max-[600px]:mb-[10px]">
            <img src="https://www.easemytrip.com/images/train-img/irctc-icon-wt.png"/>
            <p>IRCTC Authorized Partner</p>
        </div>
      </div>
      <div className="text-[20px] font-[600] text-[#000] w-[100%] h-[5vh] flex items-center justify-center mt-[20px]">
        <p>Why Book Train Tickets from EaseMyTrip</p>
      </div>
      <div className="mt-[20px] w-[100%] h-[35vh] max-[600px]:h-auto flex items-center justify-center">
        <div className="w-[80%] h-[100%] flex flex-col gap-[2%]">
            <div className="w-[100%] h-[49%] max-[600px]:h-auto  max-[600px]:flex-col flex items-center gap-[10px] justify-center">
                <div className={Classes.boxTrain}>
                    <div className="w-[15%]">
                        <img className="w-[100%]" src="https://www.easemytrip.com/images/train-img/IRCTC-logo-nw2.png"/>
                    </div>
                    <div className="w-[70%] flex flex-col ">
                        <p className="text-[15px] h-[25px] font-[600]">IRCTC Authorized Partner </p>
                        <p className="text-[12px]">EaseMytrip is authorized partner of IRCTC, booking train tickets since 2018.</p>
                    </div>
                </div>
                <div className={Classes.boxTrain}>
                    <div className="w-[15%]">
                        <img className="w-[100%]" src="https://www.easemytrip.com/images/train-img/LiveStation.svg"/>
                    </div>
                    <div className="w-[70%] flex flex-col ">
                        <p className="text-[15px] h-[25px] font-[600]">Live Station Status</p>
                        <p className="text-[12px]">Get a complete list of trains that shall be arriving at the railway station of your choice at the time selected by you.</p>
                    </div>
                </div>
                <div className={Classes.boxTrain}>
                    <div className="w-[15%]">
                        <img className="w-[100%]" src="https://www.easemytrip.com/images/train-img/LiveStatus.svg"/>
                    </div>
                    <div className="w-[70%] flex flex-col ">
                        <p className="text-[15px] h-[25px] font-[600]">Live Train Status</p>
                        <p className="text-[12px]">Get to know the Live Status of railway trains and delays, if any.</p>
                    </div>
                </div>
            </div>
            <div className="w-[100%] h-[49%] max-[600px]:h-auto max-[600px]:flex-col max-[600px]:mt-[10px] flex items-center gap-[10px] justify-center">
                <div className={Classes.boxTrain}>
                    <div className="w-[15%]">
                        <img className="w-[100%]" src="https://www.easemytrip.com/images/train-img/FoodonTrackLogo.png"/>
                    </div>
                    <div className="w-[70%] flex flex-col ">
                        <p className="text-[15px] h-[25px] font-[600]">IRCTC Train Food Booking</p>
                        <p className="text-[12px]">Enjoy booking IRCTC Food & Get Food Delivered on the Train </p>
                    </div>
                </div>
                <div className={Classes.boxTrain}>
                    <div className="w-[15%]">
                        <img className="w-[100%]" src="https://www.easemytrip.com/images/train-img/instrcb.svg"/>
                    </div>
                    <div className="w-[70%] flex flex-col ">
                        <p className="text-[15px] h-[25px] font-[600]">Instant Refunds and Cancellations</p>
                        <p className="text-[12px]">Get an instant refund and book your next train ticket without any hassle.</p>
                    </div>
                </div>
                <div className={Classes.boxTrain}>
                    <div className="w-[15%]">
                        <img className="w-[100%]" src="https://www.easemytrip.com/images/train-img/CustomerService.svg"/>
                    </div>
                    <div className="w-[70%] flex flex-col ">
                        <p className="text-[15px] h-[25px] font-[600]">24*7 Customer Service</p>
                        <p className="text-[12px]">We work 24 hours a day to make sure our availability whenever our customers need us.</p>
                    </div>
                </div>
            </div>
        </div>

      </div>
      <div className={Classes.offerHeadingT}>
        <div className={Classes.headingDivT}>
          <h3 className={Classes.headingOffersT}>Exclusive Offers</h3>
        </div>
      </div>
      <div className={Classes.hotelOffersSectionT}>
        {loading ? (
          <p>Loading offers...</p>
        ) : (
          offers.map((offer) => (
            <div className={Classes.trainOfersBoxes} key={offer.id}>
              <div className={Classes.offersImagedivT}>
                <div className={Classes.trainOffersImage}>
                  <img
                    className={Classes.imageOffersTrain}
                    src={offer.heroUrl}
                    alt={offer.title}
                  />
                </div>

                <div className={Classes.descriptionTrainoffer}>
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
export default Train;