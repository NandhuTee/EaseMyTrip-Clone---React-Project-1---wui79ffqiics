import React, { useState } from "react";
import { useAuth } from "../../../components/Context";
import ListItemButton from "@mui/material/ListItemButton";
const BusDetailFrom = ({ onClose }) => {
  const busCity = [
    "Mumbai, Maharashtra",
    "Delhi, National Capital Territory of Delhi",
    "Bangalore, Karnataka",
    "Chennai, Tamil Nadu",
    "Hyderabad, Telangana",
    "Pune, Maharashtra",
    "Ahmedabad, Gujarat",
    "Jaipur, Rajasthan",
    "Lucknow, Uttar Pradesh",
    "Kanpur, Uttar Pradesh",
    "Thane, Maharashtra",
    "Bhopal, Madhya Pradesh",
    "Visakhapatnam, Andhra Pradesh",
    "Pimpri-Chinchwad, Maharashtra",
    "Patna, Bihar",
    "Vadodara, Gujarat",
    "Ludhiana, Punjab",
    "Agra, Uttar Pradesh",
    "Nashik, Maharashtra",
    "Faridabad, Haryana",
    "Meerut, Uttar Pradesh",
    "Rajkot, Gujarat",
    "Kalyan-Dombivali, Maharashtra",
    "Vasai-Virar, Maharashtra",
    "Kolkata, West Bengal",
    "Surat, Gujarat",
    "Ghaziabad, Uttar Pradesh",
    "Srinagar, Jammu and Kashmir",
    "Dhanbad, Jharkhand",
    "Jodhpur, Rajasthan",
    "Coimbatore, Tamil Nadu",
    "Jabalpur, Madhya Pradesh",
    "Gwalior, Madhya Pradesh",
    "Vijayawada, Andhra Pradesh",
    "Allahabad, Uttar Pradesh",
    "Raipur, Chhattisgarh",
    "Amritsar, Punjab",
    "Varanasi, Uttar Pradesh",
  ];
  
  const [inputValue, setInputValue] = useState("");
  const [filteredCities, setFilteredCities] = useState(busCity); // Initialize with all cities
  const {setBusCity } = useAuth();

  const [isHotelInputOpen, setIsHotelInputOpen] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value;
    setInputValue(input);
    // Filter cities based on input
    const filtered = busCity.filter((city) =>
      city.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCities(filtered.length > 0 ? filtered : busCity);
  };

  const handleInputChange = (selectedCity) => {
    setInputValue(selectedCity);
    setFilteredCities(busCity); // Reset filteredCities to all cities
   
    // Find the index of the selected city in the original list
    const index = busCity.findIndex((city) => city === selectedCity);
   
    // Set the hotel city based on the selected city from the original list
    setBusCity(busCity[index]);
   
    setIsHotelInputOpen(true);
    onClose(isHotelInputOpen);
  };

  return (
    <div className="w-[20em] h-55 absolute bg-slate-50 mt-10 p-2 rounded shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-10">
      <input
        className="mb-3 w-full p-2"
        value={inputValue}
        onChange={handleChange}
      />
      <div className="w-80 h-40 overflow-auto scrollbar">
        <ul className="cursor-pointer">
          {filteredCities?.map((data, index) => (
            <ListItemButton
              onClick={() => {
                handleInputChange(data);
              }}
              className="mt-2"
              key={index}
            >
              {data}
            </ListItemButton>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BusDetailFrom;