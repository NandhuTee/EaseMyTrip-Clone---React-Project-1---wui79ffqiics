import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./NavBar/Navbar";
import App from "./App";
import Flights from "../components/Page/Flights/Flights";
import HotelHome from "../components/Page/Hotels/HotelHome";
import HotelDetail from "../components/Page/Hotels/Hotel Detail/HotelDetail";
import Hotels from "../components/Page/Hotels/Hotel Record/Hotels";
import FlightsRecords from "../components/Page/Flights/Flights Records/FlightRecords";
import PrivateRoute from "./PrivateRoute";
import FlightBooking from "../components/Page/Flights/Flight Booking/FlightBooking";
import HotelBooking from "../components/Page/Hotels/Hotel Booking/HotelBooking";
import FlightPayMent from "../components/Page/Flights/Flight Booking/FlightPayMent";
import HotelPayment from "../components/Page/Hotels/Hotel Booking/HotelPayment";
import MyBooking from "./NavBar/MyBooking";
function Routing(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/App" element={<App/>} />
            <Route path="/navbar" element={<Navbar/>}/>
            <Route path="/" element={<Flights/>}/>
            <Route path="/hotels" element={<Hotels/>} />
            <Route path="/HotelHome" element={<HotelHome/>} />
            <Route path="/HotelDetails" element={<HotelDetail/>}/>
            <Route path="/FlightRecord" element={<FlightsRecords/>}/>
            
            <Route path="/MyBooking" element={<MyBooking/>}/>
            
            
            <Route element={<PrivateRoute/>}>
            
            
            <Route path="/FlightPayment" element={<FlightPayMent/>}/>
            <Route path="/HotelPayment" element={<HotelPayment/>}/>
            <Route path="/FlightBooking" element={<FlightBooking/>} />
            <Route path="/HotelBooking" element={<HotelBooking/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}
export default Routing;


