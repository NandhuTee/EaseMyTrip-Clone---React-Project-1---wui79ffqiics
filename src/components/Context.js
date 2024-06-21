import { createContext, useContext, useState } from "react";

// Create a new context instance
const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component to wrap the application and provide context values
export function AuthProvider({ children }) {
  // State variables for various application data
  const [hotelLocation, setHotelLocation] = useState("Mumbai");
  const [hotelDepartureDate, setHotelDepartureDate] = useState("");
  const [flightdepartureDate, setFlightDepartureDate] = useState("");
 
  const [hotelId, setHotelId] = useState("");
  const [flightId, setFlightId] = useState("");
  const [AirportFrom, setAriportFrom] = useState([
    "Delhi",
    "Indira Gandhi International Airport",
    "DEL",
  ]);
  const [AirportTo, setAriportTo] = useState([
    "Goa",
    "Goa International Airport",
    "GOI",
  ]);
  const [searchHotelResults, setSearchHotelResults] = useState([]);
  const [isSelectedDayCheckOut, setSelectedDayCheckOut] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  var [isLoggedIn, setIsLoggedIn] = useState(false);
  const [flightBookingId, setFlightBookingId] = useState("");
 
  const [travelare, setTravelare] = useState("");
  
  const [hotelBookingId, setHotelBookingId] = useState("");
  const [seatCount, setSeatCount] = useState(1);
  const [seatHotelCount, setSeatHotelCount] = useState(1);
  const [seatAdultsCount, setSeatAdultsCount] = useState(1);
  const [seatChildrenCount, setSeatChildrenCount] = useState(0);
  const [seatInfantCount, setSeatInfantCount] = useState(0);
  const [seatHotelAdultsCount, setSeatHotelAdultsCount] = useState(1);
  const [seatHotelChildrenCount, setSeatHotelChildrenCount] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [fare, setFare] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [duration, setDuration] = useState("");

  return (
    <AuthContext.Provider
      value={{
        // Exposing state variables and their corresponding setter functions
        setHotelLocation,
        hotelLocation,
        hotelDepartureDate,
        setHotelDepartureDate,
        AirportFrom,
        setAriportFrom,
        AirportTo,
        setAriportTo,
        hotelId,
        setHotelId,
        searchHotelResults,
        setSearchHotelResults,
        isSelectedDayCheckOut,
        setSelectedDayCheckOut,
        flightdepartureDate,
        setFlightDepartureDate,
        flightId,
        setFlightId,
        selectedSeats,
        setSelectedSeats,
        openLogin,
        setOpenLogin,
        openSignUp,
        setOpenSignUp,
        isLoggedIn,
        setIsLoggedIn,
        flightBookingId,
        setFlightBookingId,
        seatCount,
        setSeatCount,
        guestLastName,
        setGuestLastName,
        guestName,
        setGuestName,
        seatHotelCount,
        setSeatHotelCount,
        seatAdultsCount,
        setSeatAdultsCount,
        seatChildrenCount,
        setSeatChildrenCount,
        seatInfantCount,
        setSeatInfantCount,
        seatHotelAdultsCount,
        setSeatHotelAdultsCount,
        seatHotelChildrenCount,
        setSeatHotelChildrenCount,
        hotelBookingId,
        setHotelBookingId,
        fare,
        setFare,
        bookingId,
        setBookingId,
        bookingType,
        setBookingType,
        travelare,
        setTravelare,
      }}
    >
      {/* Render the children components */}
      {children}
    </AuthContext.Provider>
  );
}
