import React, { useEffect, useState } from "react";
import { useAuth } from "../../../components/Context";
import ListItemButton from "@mui/material/ListItemButton";
import Classes from "../Flights.module.css";
const FlightsTo = ({ onclose }) => {
  const [airport, setAirport] = useState("");
  const [airportDetail, setAirportDetail] = useState([]);
  const [liData, setLiData] = useState(false);
  const {setAriportTo} = useAuth();

  const handleLiData = (city,name,iata_code) => {
    setAriportTo([city,name,iata_code]);
    setLiData(true);
    onclose(liData);
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setAirport(input);
  };

  useEffect(() => {
    const api = `https://academics.newtonschool.co/api/v1/bookingportals/airport?search={"city":"${airport}"}`;
    const projectId = "uojmjpx76p25";

    const fetchData = () => {
      fetch(api, {
        method: "GET",
        headers: {
          projectID: projectId,
        },
      })
        .then((response) => {
          const data = response.json();
          return data;
        })
        .then((flightdata) => {
          const data = flightdata.data.airports;
          setAirportDetail(data);
        });
    };

    fetchData();
  }, [airport]);

  return (
    <div className="w-80 h-55 absolute bg-slate-50 lg:mt-10 mt-[11em] p-2 rounded lg:ml-[23em] ml-[0] z-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="flex flex-row gap-4 items-center">
      <img src="https://www.easemytrip.com/Content/img/icon-search.svg" className="items-center"/>
      <input className="w-11/12 p-2 border-none outline-none bg-slate-50" onChange={handleChange} />
      </div>
      <div className="w-full h-44 overflow-auto scrollbar">
        <ul className=" cursor-pointer ">
          {airportDetail.map((data, index) => (
            <ListItemButton onClick={()=>{handleLiData(data.city,data.name,data.iata_code)}} className="mt-2" key={index}>
              <div className={Classes.listFlightTo}>
              <span className="text-base font-semibold cursor-pointer">
              {data.city}
              </span>
              <div className={Classes.spanFlightTo}>
              <p className="text-sm cursor-pointer" >{data.name}</p>
              <p className="text-sm cursor-pointer">{data.country}</p> 
              </div>
              </div>
            </ListItemButton>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FlightsTo;