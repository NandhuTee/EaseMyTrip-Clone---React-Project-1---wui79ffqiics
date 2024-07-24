import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import necessary components from react-router-dom

import Navbar from "./NavBar/Navbar"; // Importing Navbar component
import App from "./App"; // Importing App component
import Flights from "../Page/Flights/Flights"; // Importing Flights component
import HotelHome from "../Page/Hotels/HotelHome"; // Importing HotelHome component

import HotelDetail from "../Page/Hotels/Hotel Detail/HotelDetail"; // Importing HotelDetail component
import Hotels from "../Page/Hotels/Hotels Record/Hotels"; // Importing Hotels component
import FlightsRecords from "../Page/Flights/Flights Records/FlightsRecords"; // Importing FlightsRecords component

import PrivateRoute from "./PrivateRoute"; // Importing PrivateRoute component
import FlightBooking from "../Page/Flights/Flight Booking/FlightBooking"; // Importing FlightBooking component
import HotelBooking from "../Page/Hotels/Hotel Booking/HotelBooking"; // Importing HotelBooking component
import FlightPayment from "../Page/Flights/Flight Booking/FlightPayment";

import HotelPayment from "../Page/Hotels/Hotel Booking/HotelPayment"; // Importing HotelPayment component

import MyBooking from "./NavBar/MyBooking"; // Importing MyBooking component

// Define the Routing component
function Routing() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route path="/App" element={<App />} />
                <Route path="/navbar" element={<Navbar />} />
                <Route path="/" element={<Flights />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/hotelhome" element={<HotelHome />} />
                <Route path="/hoteldetails" element={<HotelDetail />} />
                <Route path="/flightrecord" element={<FlightsRecords />} />
                <Route path="/mybooking" element={<MyBooking />} />

                {/* Protected routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/flightpayment" element={<FlightPayment />} />
                    <Route path="/hotelpayment" element={<HotelPayment />} />
                    <Route path="/flightbooking" element={<FlightBooking />} />
                    <Route path="/hotelbooking" element={<HotelBooking />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Routing; // Export the Routing component
