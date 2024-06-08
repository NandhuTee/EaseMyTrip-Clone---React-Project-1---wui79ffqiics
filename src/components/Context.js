import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
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
  var [isLoggedIn, setIsLoggedIn] = useState(false);
  const [flightBookingId, setFlightBookingId] = useState("");
  const [busBookingId, setBusBookingId] = useState("");
  const [travelare, setTravelare] = useState("");
  const [trainBookingId, setTrainBookingId] = useState("");
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
        flightId, setFlightId,
        traindepartureDate, setTrainDepartureDate,
        trainCity, setTrainCity,
        trainToCity, setTrainToCity,
        busCity, setBusCity,
        busToCity, setBusToCity,
        busdepartureDate, setBusDepartureDate,
        selectedSeats, setSelectedSeats,
        openLogin, setOpenLogin,
        openSignUp, setOpenSignUp,
        isLoggedIn, setIsLoggedIn,
        flightBookingId, setFlightBookingId,
        seatCount, setSeatCount,
        guestLastName, setGuestLastName,
        guestName, setGuestName,
        seatHotelCount, setSeatHotelCount,
        seatAdultsCount, setSeatAdultsCount,seatChildrenCount, setSeatChildrenCount,
        seatInfantCount, setSeatInfantCount,
        seatHotelAdultsCount, setSeatHotelAdultsCount,
        seatHotelChildrenCount, setSeatHotelChildrenCount,
        hotelBookingId, setHotelBookingId,
        busBookingId, setBusBookingId,
        trainBookingId, setTrainBookingId,
        fare, setFare,
        bookingId, setBookingId,
        bookingType, setBookingType,
        travelare, setTravelare,


      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
