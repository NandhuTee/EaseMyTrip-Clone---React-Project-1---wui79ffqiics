# FlightDetail Component Documentation

## Overview

The `FlightDetail` component is a React functional component that fetches and displays detailed flight information including the source and destination airports, flight ID, departure and arrival times, and flight duration. It also handles error states if the data fetching process encounters any issues.

## Structure and Layout

The layout consists of a main container that includes several key sections:

1. **Flight Information Header**: A header indicating the start of the flight information section.
2. **Flight Route and ID**: Displays the route of the flight (source to destination) and the flight ID.
3. **Departure Information**: Shows the departure time, airport, and date.
4. **Duration Information**: Displays the flight duration with an icon.
5. **Arrival Information**: Provides the arrival time, airport, and date.
6. **Error Message**: Displays an error message if there is an issue fetching flight data.

### Visual Diagram

+-----------------------------------------------+
| |
| +------------------------------+ |
| | Flight Information | |
| +------------------------------+ |
| |
| +--------------------+ |
| | {source} → {destination} |
| | Flight ID: {flightID} |
| +--------------------+ |
| |
| +---------------------------------------+ |
| | Departure: | |
| | {departureTime} | |
| | {AirportFrom[0]} ({AirportFrom[2]}) | |
| | {departureDay} - {departureDate} | |
| +---------------------------------------+ |
| |
| +---------------------------------------+ |
| | Duration: | |
| | [Flight Icon Image] | |
| | {duration}h 10m | |
| +---------------------------------------+ |
| |
| +---------------------------------------+ |
| | Arrival: | |
| | {arrivalTime} | |
| | {AirportTo[0]} ({AirportTo[2]}) | |
| | {departureDay} - {departureDate} | |
| +---------------------------------------+ |
| |
| +---------------------------------------+ |
| | Error (if any): | |
| | {flightError} | |
| +---------------------------------------+ |
+-----------------------------------------------+


### Key Elements

1. **Main Container**: Holds all sections and centers the content on the screen.
2. **Flight Information Header**:
   - **Position**: Top center of the container.
   - **Style**: Blue background, white text, rounded corners.
3. **Flight Route and ID**:
   - **Display**: `{source} → {destination}`
   - **Style**: Text with an arrow between source and destination.
   - **Flight ID**: Displayed next to the route.
4. **Departure Information**:
   - **Time**: `{departureTime}`
   - **Airport**: `{AirportFrom[0]} ({AirportFrom[2]})`
   - **Date**: `{departureDay} - {departureDate}`
   - **Position**: Left section.
5. **Duration Information**:
   - **Details**: Flight icon and duration `{duration}h 10m`
   - **Position**: Center section.
   - **Style**: Icon centered, duration text below.
6. **Arrival Information**:
   - **Time**: `{arrivalTime}`
   - **Airport**: `{AirportTo[0]} ({AirportTo[2]})`
   - **Date**: `{departureDay} - {departureDate}`
   - **Position**: Right section.
7. **Error Message**:
   - **Display**: If an error occurs during data fetching.
   - **Position**: Below the flight details.
   - **Style**: Red text to indicate an error.

## Dynamic Data

The placeholders in the diagram represent dynamic data values fetched from the API:

- `{source}`: Source airport name.
- `{destination}`: Destination airport name.
- `{flightID}`: Unique identifier for the flight.
- `{departureTime}`: Scheduled departure time.
- `{AirportFrom[0]}`: Source city name.
- `{AirportFrom[2]}`: Source IATA code.
- `{departureDay}`: Day of departure.
- `{departureDate}`: Formatted departure date.
- `{duration}`: Flight duration.
- `{arrivalTime}`: Scheduled arrival time.
- `{AirportTo[0]}`: Destination city name.
- `{AirportTo[2]}`: Destination IATA code.
- `{flightError}`: Error message if any.

## Error Handling

If there is an error fetching flight data, the component will display a red error message below the flight details section. This is achieved through the `hotelDetailError` state, which is set when a fetch request fails.

## Conclusion

The `FlightDetail` component provides a detailed view of a flight's itinerary, including the departure and arrival details, flight duration, and handles errors gracefully. This component integrates with a backend API to fetch and display real-time flight information dynamically.