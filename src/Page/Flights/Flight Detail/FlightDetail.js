import React, { useEffect,useState } from "react";
import { useAuth } from "../../../components/Context";
import moment from "moment";
function FlightDetail(){
    const [hotelDetailError, setHotelDetailError] = useState(null);
    const [flightDetailData, setFlightDetailData] = useState([]);
    const {flightId,AirportFrom,AirportTo,flightdepartureDate,} = useAuth();
    const departureDay= moment(flightdepartureDate).format("ddd");
    const departureDate= moment(flightdepartureDate).format("DD MMM YYYY");

    const fetchSingleFlightData = async () => {
        try {
          const projectID = "uojmjpx76p25";
          const response = await fetch(
            `https://academics.newtonschool.co/api/v1/bookingportals/flight/${flightId}`,
            {
              method: "GET",
              headers: {
                projectID,
              },
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            setFlightDetailData(data?.data);
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
        <div className="h-[100%] w-[100%] flex flex-col items-center">
              <div className="h-[5vh] w-[98%] mt-[10px] bg-[#f6f4f4] rounded-[20px]">
                <div className="h-[100%] w-[23%] max-[600px]:w-[50%] text-[13px]  font-[500] bg-[#2196f3] rounded-[20px] text-[#fff] flex justify-center items-center">
                  <p>Flight Information</p>
                </div>
                
              </div>
              <div className=" w-[98%] h-[18vh] max-[600px]:h-auto flex justify-center items-center">
              <div className="w-[100%] h-[90%] flex flex-col">
                <div className=" w-[100%] h-[25%] max-[600px]:mt-[10px] max-[600px]:mb-[10px]">
                    <div className="text-[15px] text-[#000]">
                    <span >{flightDetailData?.source}</span> → <span>{flightDetailData?.destination}</span>
                    </div>
                </div>
                <div className=" w-[100%] h-[75%] flex">
                    <div className=" w-[25%] h-[100%] flex ">
                            <span className="text-[16px] text-[#1e1f1f]">{flightDetailData?.flightID}</span>
                    </div>
                    <div className=" w-[75%] h-[100%] flex gap-[10px]">
                        <div className="w-[32%] h-[100%] flex flex-col items-center">
                            <div className="w-[80%]">
                            <div className="text-[20px] text-[#333] font-[600] ">{flightDetailData?.departureTime}</div>
                            <div className="text-[13px]  text-[#525252] font-[600]">
                             <span>{AirportFrom[0]}</span> <span>({AirportFrom[2]})</span>
                            </div>
                            <div className="text-[12px]  text-[#333]">
                                <span>{departureDay}</span>-<span>{departureDate}</span>
                            </div>
                            </div>
                        </div>
                        <div className=" w-[32%] h-[100%] flex flex-col items-center">
                            <div className="w-[10%] max-[600px]:w-[25%] h-[4vh] overflow-hidden">
                                <img className="mt-[-53em] h-[70em] ml-[-30px]" src="https://flight.easemytrip.com/Content/img/split-img.png"/>
                            </div>
                            <div className="text-[12px] text-[#333]">
                                <span>{flightDetailData?.duration}h 10m</span>
                            </div>
                        </div>
                        <div className="w-[32%] h-[100%] flex flex-col items-center">
                        <div className="w-[60%]">
                            <div className="w-[90%]  text-[20px] text-[#333] font-[600] ">{flightDetailData?.arrivalTime}</div>
                            <div className="text-[13px]  text-[#525252] font-[600]">
                             <span>{AirportTo[0]}</span> <span>({AirportTo[2]})</span>
                            </div>
                            <div className="text-[12px] text-[#333]">
                                <span>{departureDay}</span>-<span>{departureDate}</span>
                            </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
              </div>
              </div>
              </div>
    )
}
export default FlightDetail;