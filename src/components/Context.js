import { createContext, useContext, useState } from "react";

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component to provide authentication context
export function AuthProvider({ children }) {
  // Define state variables for various travel-related data
  const [hotelLocation, setHotelLocation] = useState("Mumbai");
  const [hotelDepartureDate, setHotelDepartureDate] = useState("");
  const [flightdepartureDate, setFlightDepartureDate] = useState("");
  const [traindepartureDate, setTrainDepartureDate] = useState("");
  const [busdepartureDate, setBusDepartureDate] = useState("");
  const [hotelId, setHotelId] = useState("");
  const [flightId, setFlightId] = useState("");

  const [trainCity, setTrainCity] = useState(["New Delhi"]);
  const [trainToCity, setTrainToCity] = useState(["Pune Junction"]);
  const [busCity, setBusCity] = useState(["Mumbai, Maharashtra"]);
  const [busToCity, setBusToCity] = useState(["Pune, Maharashtra"]);
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [flightBookingId, setFlightBookingId] = useState("");
  const [busBookingId, setBusBookingId] = useState("");
  const [travelare, setTravelare] = useState(""); // Define travelare state variable
  const [trainBookingId, setTrainBookingId] = useState("");
  const [hotelBookingId, setHotelBookingId] = useState("");
  const [seatCount, setSeatCount] = useState(1);
  const [seatHotelCount, setSeatHotelCount] = useState(1);
  const [seatAdultsCount, setSeatAdultsCount] = useState(1);
  const [seatChildrenCount, setSeatChildrenCount] = useState(0);
  const [seatInfantCount, setSeatInfantCount] = useState(0);
  const [seatHotelAdultsCount, setSeatHotelAdultsCount] = useState(1);
  const [seatHotelChildrenCount, setSeatHotelChildrenCount] = useState(0);
  const [firstName, setGuestName] = useState("");
  const [lastName, setGuestLastName] = useState("");
  const [fare, setFare] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [duration, setDuration] = useState("");

  return (
    // Provide the state variables and setters to children components
    <AuthContext.Provider
      value={{
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
        traindepartureDate,
        setTrainDepartureDate,
        trainCity,
        setTrainCity,
        trainToCity,
        setTrainToCity,
        busCity,
        setBusCity,
        busToCity,
        setBusToCity,
        busdepartureDate,
        setBusDepartureDate,
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
        lastName,
        setGuestLastName,
        firstName,
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
        busBookingId,
        setBusBookingId,
        trainBookingId,
        setTrainBookingId,
        fare,
        setFare,
        bookingId,
        setBookingId,
        bookingType,
        setBookingType,
        travelare, // Add travelare to the value object
        setTravelare, // Add setTravelare to the value object
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
