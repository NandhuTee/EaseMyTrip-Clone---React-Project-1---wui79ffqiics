# Flight Booking Component

## Overview

The `FlightBooking` component handles the booking process for flights. It integrates with user authentication (`useAuth`), fetches flight details, and manages user input for booking.

## Components Used

- **Navbar**: Imported from `../../../components/NavBar/Navbar`.
- **Divider**: Imported from `@mui/material/Divider`.

## State Variables

- **hotelDetailError**: Stores any error message related to fetching flight details.
- **flightBookingDetailData**: Holds the details of the selected flight for booking.
- **firstName**: Stores the first name of the traveler.
- **lastName**: Stores the last name of the traveler.
- **firstNameError**: Error message for validation of the first name input.
- **lastNameError**: Error message for validation of the last name input.

## Hooks Used

- **useAuth**: Provides authentication-related context such as `flightBookingId`, `AirportFrom`, `AirportTo`, `flightdepartureDate`, `seatCount`, `setFare`, `setBookingId`, and `setBookingType`.
- **useNavigate**: Enables programmatic navigation within the application.

## Functions

- **fetchSingleFlightData**: Asynchronously fetches flight details based on `flightBookingId`.
- **handlePayment**: Validates user input (first name, last name) and navigates to the flight payment page upon successful validation.

## External API Integration

- Uses an external API endpoint (`https://academics.newtonschool.co/api/v1/bookingportals/flight/{flightBookingId}`) to fetch flight details.

## Styling

- CSS classes from `Flights.module.css` are used for styling various components and elements within the booking interface.

## Dependencies

- **moment**: Used for date formatting (`departureDay` and `departureDate`).

## Usage

The `FlightBooking` component is rendered when a user proceeds with booking a flight. It displays flight details, allows the user to enter their contact details, and calculates the booking amount dynamically based on the selected flight and number of travelers.

## Example

```jsx
import React from 'react';
import FlightBooking from './FlightBooking';

function App() {
  return (
    <div className="App">
      <FlightBooking />
    </div>
  );
}

export default App;
