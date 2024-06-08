import React, { useState } from "react";
import { useAuth } from "../../../components/Context";
const TrainToDetail = ({ onClose }) => {
  const trainToCity = [
    "Salem Junction",
    "Hubli Junction",
    "Udaipur City",
    "Vadodara Junction",
    "Dhanbad Junction",
    "Manmad Junction",
    "Vijayawada Junction",
    "Gorakhpur Junction",
    "Ghaziabad Junction",
    "Allahabad Junction",
    "Warangal",
    "Ambala Cantonment",
    "Howrah Junction",
    "Yesvantpur Junction",
    "Asansol Junction",
    "Nagpur Junction",
    "Visakhapatnam Junction",
    "Coimbatore Junction",
    "Thrissur",
    "Varanasi Junction",
    "Barddhaman Junction",
    "Chandigarh",
    "Bengaluru City Junction",
    "Kiul Junction",
    "Kharagpur Junction",
    "Erode Junction",
    "Jodhpur Junction",
    "Pune Junction",
    "Anand Junction",
    "Katpadi Junction",
    "Raipur Junction",
    "Agra Cantonment",
    "Itarsi Junction",
    "Ahmedabad Junction",
    "Hazrat Nizamuddin",
    "Chennai Central",
    "Guwahati",
    "Kanpur Central",
    "New Delhi",
    "Kota Junction",
  ];

  const [inputValue, setInputValue] = useState("");
  const [filteredCities, setFilteredCities] = useState(trainToCity); // Initialize with all cities
  const { setTrainToCity } = useAuth();

  const [isHotelInputOpen, setIsHotelInputOpen] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value;
    setInputValue(input);
    // Filter cities based on input
    const filtered = trainToCity.filter((city) =>
      city.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCities(filtered.length > 0 ? filtered : trainToCity);
  };

  const handleInputChange = (selectedCity) => {
    setInputValue(selectedCity);
    setFilteredCities(trainToCity); // Reset filteredCities to all cities

    // Find the index of the selected city in the original list
    const index = trainToCity.findIndex((city) => city === selectedCity);

    // Set the hotel city based on the selected city from the original list
    setTrainToCity(trainToCity[index]);

    setIsHotelInputOpen(true);
    onClose(isHotelInputOpen);
  };

  return (
    <div className="w-[20em]  h-55 lg:ml-[26.6em] ml-[0] absolute bg-slate-50 lg:mt-10 mt-[10.5em] p-2 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-10">
      <input
        className="mb-3 w-full p-2"
        value={inputValue}
        onChange={handleChange}
      />
      <div className="w-80 h-40 overflow-auto scrollbar">
        <ul className="cursor-pointer">
          {filteredCities?.map((data, index) => (
            <li
              onClick={() => {
                handleInputChange(data);
              }}
              className="mt-2"
              key={index}
            >
              {data}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrainToDetail;
