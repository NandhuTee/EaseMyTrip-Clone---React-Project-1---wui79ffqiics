import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navbar from "./NavBar/Navbar";
import App from "./App";
import Flights from "../Page/Flights/Flights";
import HotelHome from "../Page/Hotels/HotelHome";
import Train from "../Page/Train/Train";
import Bus from "../Page/Bus/Bus";
import HotelDetail from "../Page/Hotels/Hotel Detail/HotelDetail";
import Hotels from "../Page/Hotels/Hotels Record/Hotels";
import FlightsRecords from "../Page/Flights/Flights Records/FlightsRecords";
import TrainDetail from "../Page/Train/Train Detail/TrainDetail";
import BusDetail from "../Page/Bus/Bus Detail/BusDetail";
import PrivateRoute from "./PrivateRoute";
import FlightBooking from "../Page/Flights/Flight Booking/FlightBooking";
import HotelBooking from "../Page/Hotels/Hotel Booking/HotelBooking";
import BusBooking from "../Page/Bus/Bus Booking/BusBooking";
import TrainBooking from "../Page/Train/Train Booking/TrainBooking";
import FlightPayMent from "../Page/Flights/Flight Booking/FlightPayMent";
import HotelPayment from "../Page/Hotels/Hotel Booking/HotelPayment";
import TrainPayment from "../Page/Train/Train Booking/TrainPayment";
import BusPayment from "../Page/Bus/Bus Booking/BusPayment";
import MyBooking from "./NavBar/MyBooking";
function Routing(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/App" element={<App/>} />
            <Route path="/navbar" element={<Navbar/>}/>
            <Route path="/" element={<Flights/>}/>
            <Route path="/hotels" element={<Hotels/>} />
            <Route path="/hotelhome" element={<HotelHome/>} />
            <Route path="/hoteldetails" element={<HotelDetail/>}/>
            <Route path="/flightrecord" element={<FlightsRecords/>}/>
            <Route path="/train" element={<Train/>} />
            <Route path="/trainrecord" element={<TrainDetail/>} />
            <Route path="/bus" element={<Bus/>}/>
            <Route path="/busrecord" element={<BusDetail/>}/>
            <Route path="/mybooking" element={<MyBooking/>}/>
            
            
            <Route element={<PrivateRoute/>}>
            
            <Route path="/busBooking" element={<BusBooking/>}/>
            <Route path="/trainBooking" element={<TrainBooking/>}/>
            <Route path="/flightpayment" element={<FlightPayMent/>}/>
            <Route path="/hotelpayment" element={<HotelPayment/>}/>
            <Route path="/trainpayment" element={<TrainPayment/>}/>
            <Route path="/buspayment" element={<BusPayment/>}/>
            <Route path="/flightbooking" element={<FlightBooking/>} />
            <Route path="/hotelbooking" element={<HotelBooking/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}
export default Routing;


