import React,{useState,useEffect} from "react";
import Navbar from "../../../components/NavBar/Navbar";
import { useAuth } from "../../../components/Context";
import moment from "moment";
import Classes from "../Bus.module.css";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

function BusBooking(){
    const [hotelDetailError, setHotelDetailError] = useState(null);
    const [busBookingDetailData, setBusBookingDetailData] = useState([]);
    const {busdepartureDate,
        busCity,
        busToCity,
        selectedSeats,
        busBookingId,setFare,
        setBookingId,
        setTravelare,
        setBookingType,} = useAuth();
        const navigate = useNavigate();
    const departureDay= moment(busdepartureDate).format("ddd");
    const departureDate= moment(busdepartureDate).format("DD MMM YYYY");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const handlePayment = (busfare, bookingType, busId ,travelare) => {
      if (!firstName.trim()) {
        setFirstNameError("First Name is required");
        return;
      }
      if (!lastName.trim()) {
        setLastNameError("Last Name is required");
        return;
      }
      setFare(busfare);
      setBookingType(bookingType);
      setBookingId(busId);
      setTravelare(travelare);
      navigate("/buspayment");
    };
    const fetchSingleFlightData = async () => {
        try {
          const projectID = "wui79ffqiics";
          const response = await fetch(
            `https://academics.newtonschool.co/api/v1/bookingportals/bus/${busBookingId}`,
            {
              method: "GET",
              headers: {
                projectID,
              },
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            setBusBookingDetailData(data?.data);
          } else {
            const errorData = await response.json();
            setHotelDetailError(errorData.message);
          }
        } catch (error) {
          console.error("Error fetching hotel data:", error);
          setHotelDetailError("Failed to fetch hotel data");
        }
      };
      useEffect(() => {
        fetchSingleFlightData();
      }, []);
    return(
        <div>
            <Navbar/>
            <div className="w-[100%] h-[100vh] max-[600px]:h-[100%] bg-[#e8f2fa] flex justify-center">
            <div className=" w-[90%] h-[100%] flex max-[600px]:flex-col flex-row gap-[20px] justify-between">
               <div className="w-[70.5%] max-[600px]:w-[100%] mt-[20px]">
                <div className={Classes.bookingBusData}>
                    <div className={Classes.bookingHeader}>
                        <div className={Classes.flightbookingImg}></div>
                        <span>Bus Details</span>
                    </div>
                    <div className="w-[96%]">
                        <div className={Classes.BusBookingDetails}>
                            <div className=" w-[98%] mt-[20px] mb-[30px] flex flex-col gap-[5px]">
                                {/* <div className="text-[15px] text-[#1a1a1a] flex gap-[10px]">
                                    <div className={Classes.flightbookDetailImg}></div>
                                    <div className="flex gap-[7px] items-center ">
                                    <span className="text-[20px] text-[#1a1a1a] ">{hotelBookingDetailData?.source} - {hotelBookingDetailData?.destination} </span> |<span className="text-[12px] text-[#6a6868]">{departureDay} - {departureDate}</span>
                                    </div>
                                </div> */}
                                <div className="w-[100%] flex max-[600px]:flex-col max-[600px]:items-center  gap-[5px] ">
                                    <div className="w-[36%] max-[600px]:w-[100%] flex ">
                                        <div className="w-[17%]">
                                            <img src="https://bus.easemytrip.com/NewTravellerCss/img/bus-i.png"/>
                                        </div>
                                        <div className="w-[83%]">
                                            <div className="w-[100%] text-[15px] text-[#000] font-[500] flex items-center gap-[20px]">
                                                <span>{busBookingDetailData?.source}</span><span> → </span> <span>{busBookingDetailData?.destination}</span>
                                            </div>
                                            <div className=" w-[50%] text-[15px] text-[#000] bg-[#fcf8e3] pt-[2px] font-[500] rounded-[4px] flex items-center justify-center">{departureDate}</div>
                                        </div>
                                    </div>
                                    <div className="w-[12%] mt-[3px] flex flex-col max-[600px]:items-center">
                                        <div className="w-[100%] text-[12px] text-[#000]">Departure Time</div>
                                        <div className="w-[100%] pb-[5px] text-[#222121] text-[16px] font-bold max-[600px]:justify-center">{busBookingDetailData?.departureTime}</div>
                                    </div>
                                    <div className="w-[13%] mr-[1px] mt-[7px] flex justify-center">
                                        <div className="w-[100%] items-center justify-center">
                                            <img src="https://bus.easemytrip.com/NewTravellerCss/img/bus-rou-map.png"/>
                                        </div>
                                    </div>
                                    <div className="w-[12%] mt-[3px] flex flex-col max-[600px]:items-center">
                                        <div className="w-[100%] text-[12px] text-[#000]">Arrival Time</div>
                                        <div className="w-[100%] pb-[5px] text-[#222121] text-[16px] font-bold">{busBookingDetailData?.arrivalTime}</div>
                                    </div>
                                    <div className="w-[15%] max-[600px]:w-[100%] text-[15px]  mt-[3px] flex flex-col max-[600px]:flex-row">
                                        <div className="w-[100%] pb-[5px] text-[#000] text-[12px]">Seat no(s)</div>
                                    <div className="w-[100%] text-[15px] max-[600px]:justify-center  text-[#000] mt-[3px] flex flex-wrap gap-[10px]">
                              {selectedSeats?.map((seat, indexseat) => (
                                <p
                                  key={indexseat}
                                  className="w-[22%] h-[4vh] text-[13px] text-[#000] bg-[#fcf8e3] border border-solid border-[#dcd9c9] rounded-[4px] font-[600] flex justify-center items-center"
                                >
                                  {seat}{" "}
                                </p>
                              ))}
                            </div>
                            </div>
                            <div className=" w-[9%] mt-[3px] max-[600px]:hidden ">
                                <div className="w-[100%] pb-[5px] text-[#000] text-[12px] items-center">Passengers(s)</div>
                                <div className="w-[100%] text-[15px] text-[#222121] items-center pb-[5px] flex justify-center">{selectedSeats.length}</div>
                            </div>
                                </div>
                                <div className="w-[100%] flex mt-[15px] gap-[5px]">
                                    <div className={Classes.busDetailBoxDestination}>
                                        <div className={Classes.busDestinationLImg}>
                                            <span className={Classes.lTopImgSection}></span>
                                            <span className={Classes.dotedLineLImg}></span>
                                            <span className={Classes.lEndImgSection}></span>
                                        </div>
                                        <div className={Classes.busDestinationSection}>
                                            <div className="mb-[15px]">
                                                <span className="bg-[#e3edf5] p-[3px] text-[12px] text-[#666] rounded-[3px] mb-[5px] ">Boarding Time & Address</span>
                                                <div className="flex">
                                                    <span className="font-[700] text-[13px] mr-[6px]">{busBookingDetailData?.departureTime}</span>
                                                    <span className="font-[500] text-[13px] w-[82%]">{busBookingDetailData?.source}</span>
                                                </div>
                                            </div>
                                            <div className="mt-[35px]">
                                                <span className="bg-[#e3edf5] text-[12px] text-[#666] p-[3px] rounded-[3px] mb-[5px] ">Dropping Time & Address</span>
                                                <div className="flex">
                                                    <span className="font-[700] text-[13px] mr-[6px]">{busBookingDetailData?.arrivalTime}</span>
                                                    <span className="font-[500] text-[13px] w-[82%]">{busBookingDetailData?.destination}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={Classes.busDetailBox}>
                                    <span className="bg-[#e3edf5] w-[35%] max-[600px]:w-[70%] text-[12px] text-[#666] p-[3px] rounded-[3px] mb-[5px] flex justify-center items-center">Bus Operator</span>
                                    <div className="text-[13px] font-[600] w-[100%] mb-[3px] mt-[7px]">{busBookingDetailData?.name}</div>
                                    <div className="text-[13px] text-[#737373] font-[500]">{busBookingDetailData?.type}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={Classes.personalDetailBus}>
                <div className={Classes.bookingHeader}>
                        <div className={Classes.PersbookingImg}></div>
                        <span>Travellers Details</span>
                    </div>
                <div className={Classes.personalDetail}>
                
              <h3>Add Contact Details</h3>
              <div className="w-[100%] h-[100%] mt-[20px] flex max-[600px]:flex-col flex-row gap-[30px]">
                <div style={{ display: "flex", flexDirection: "column" }} className="w-[30%] max-[600px]:w-[98%] gap-[5px]">
                  <label className="text-[11px] font-bold">(First Name & (Middle name, if any)</label>
                  <input type="text" className={Classes.persnolDataBusFName} value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        setFirstNameError("");
                      }}/>
                       {firstNameError && (
                      <p className="text-red-500 text-xs">{firstNameError}</p>
                    )}
                </div>
                <div style={{ display: "flex", flexDirection: "column" }} className="w-[35%] max-[600px]:w-[98%]  gap-[5px] mb-[10px]">
                  <label className="text-[11px] font-bold">Last Name</label>
                  <input type="text" className={Classes.persnolDataBusLName}  value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        setLastNameError("");
                      }}/>
                      {lastNameError && (
                      <p className="text-red-500 text-xs">{lastNameError}</p>
                    )}
                </div>
              </div>
            </div>
                </div>
               

               </div>
               <div className="w-[26%] max-[600px]:w-[100%] mt-[20px] flex flex-col">
                <div className={Classes.busBookingAmont}>
                    <div className={Classes.busBokkingAmountHeader}>
                        <div className="text-[18px] text-[#1a1a1a] h-[50px] flex items-center ml-[10px]">
                            <p>Price Summary</p>
                        </div>
                    </div>
                    <div className=" w-[100%]">
                        <div className="w-[100%] border-b-2  border-b-[#e5e3e3] flex justify-between">
                            <div className="w-[66%] pl-[4%] text-[13px] text-[#1a1a1a] h-[35px] flex items-center">Passenger x 1</div>
                            <div className="w-[30%] text-[#1a1a1a] text-[12px] h-[35px] font-[600] flex items-center gap-[5px]"><i>₹</i>{" "}{busBookingDetailData?.fare}</div>
                        </div>
                        <Divider flexItem />
                        <div className="w-[100%] border-b-2  border-b-[#e5e3e3] flex justify-between">
                            <div className="w-[66%] pl-[4%] text-[13px] text-[#1a1a1a] h-[35px] flex items-center">Travelare</div>
                            <div className="w-[30%] text-[#1a1a1a] text-[12px] h-[35px] font-[600] flex items-center gap-[5px]">{selectedSeats.length} Traveller(s)</div>
                        </div>
                        <Divider flexItem />
                        <div className="w-[100%] flex justify-between">
                                  <div className="w-[66%] pl-[4%] text-[18px] text-[#d63b05] h-[35px] font-bold flex items-center">Grand Total</div>
                                  <div className="w-[30%] text-[18px] text-[#d63b05] font-bold h-[35px] flex items-center gap-[5px]">
                                    <i>₹</i>{" "}
                                    {busBookingDetailData?.fare * selectedSeats.length}
                                    
                                  </div>
                                </div>
                    </div>
                    
                </div>
                <div className="w-[100%] mt-[7px] max-[600px]:mb-[10px]">
                      <p className="bg-[#ef6614] text-[#fff] text-[19px] h-[45px] cursor-pointer rounded-[40px] flex justify-center items-center" onClick={() =>
                  handlePayment(busBookingDetailData?.fare,"bus",busBookingDetailData?._id,selectedSeats.length)}>Continue Booking</p>
                    </div> 
               </div>
            </div>
            

            </div>
        </div>
    )
}
export default BusBooking;