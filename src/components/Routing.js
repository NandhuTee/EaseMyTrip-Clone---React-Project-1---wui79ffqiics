import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./NavBar/Navbar";
import App from "./App";
import Flights from "../Page/Flights/Flights";
import HotelHome from "../Page/Hotels/HotelHome";
import HotelDetail from "../Page/Hotels/Hotel Detail/HotelDetail";
import Hotels from "../Page/Hotels/Hotels Record/Hotels";
import FlightsRecords from "../Page/Flights/Flights Records/FlightsRecords";

import PrivateRoute from "./PrivateRoute";
import FlightBooking from "../Page/Flights/Flight Booking/FlightBooking";
import HotelBooking from "../Page/Hotels/Hotel Booking/HotelBooking";
import FlightPayMent from "../Page/Flights/Flight Booking/FlightPayment";
import HotelPayment from "../Page/Hotels/Hotel Booking/HotelPayment";

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


