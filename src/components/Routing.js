// Import React library
import React from "react";

// Import routing components from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import various components and pages used in routing
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

// Define the Routing component
function Routing() {
    return (
        // Wrap routes in a BrowserRouter for handling routing
        <BrowserRouter>
            {/* Define all routes within a Routes component */}
            <Routes>
                {/* Define individual route paths and the components they render */}
                <Route path="/App" element={<App />} />
                <Route path="/navbar" element={<Navbar />} />
                <Route path="/" element={<Flights />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/HotelHome" element={<HotelHome />} />
                <Route path="/HotelDetails" element={<HotelDetail />} />
                <Route path="/FlightRecord" element={<FlightsRecords />} />
                <Route path="/train" element={<Train />} />
                <Route path="/TrainDetail" element={<TrainDetail />} />
                <Route path="/bus" element={<Bus />} />
                <Route path="/BusDetail" element={<BusDetail />} />
                <Route path="/MyBooking" element={<MyBooking />} />
                
                {/* Nested routes inside PrivateRoute require authentication */}
                <Route element={<PrivateRoute />}>
                    <Route path="/busBooking" element={<BusBooking />} />
                    <Route path="/trainBooking" element={<TrainBooking />} />
                    <Route path="/FlightPayment" element={<FlightPayMent />} />
                    <Route path="/HotelPayment" element={<HotelPayment />} />
                    <Route path="/TrainPayment" element={<TrainPayment />} />
                    <Route path="/BusPayment" element={<BusPayment />} />
                    <Route path="/FlightBooking" element={<FlightBooking />} />
                    <Route path="/HotelBooking" element={<HotelBooking />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

// Export the Routing component as the default export
export default Routing;
