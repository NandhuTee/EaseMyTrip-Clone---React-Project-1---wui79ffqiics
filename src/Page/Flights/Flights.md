# Flights Component
- The Flights component in React is responsible for handling flight booking functionalities and displaying flight search results. It integrates various UI elements such as dropdowns for selecting departure and destination airports, a date picker for selecting departure date, and modal for selecting the number of travelers.

# Components and Hooks Used
## Components
*Navbar:* Renders the navigation bar for easy navigation across the application.

*FlightFrom:* Dropdown component for selecting the departure airport.
*FlightsTo:* Dropdown component for selecting the destination airport.
## Hooks
- useState: Manages local component state variables for controlling dropdown and modal visibility, selected offer type, loading state, and error handling.
- useEffect: Fetches flight offers based on the selected offer type.
- useAuth: Custom hook for accessing authentication context values like selected airports, travelers count, and departure date.
## Functionality
### Flight Search
- Airport Selection: Users can select departure and destination airports using dropdowns (FlightFrom and FlightsTo).
- Date Selection: A date picker allows users to select the departure date. It uses moment.js for date formatting.
- Traveler Selection: Modal popup for selecting the number of adults, children, and infants traveling.
### Offer Display
- Exclusive Offers: Displays exclusive flight offers based on the selected offer type (ALL or FLIGHTS). Offers are fetched asynchronously from an API endpoint.
## Styling
- CSS Modules: Utilizes CSS modules (Flights.module.css) for scoped styling, ensuring component-specific styles without global scope conflicts.
- Material-UI: Integrates Material-UI components like Divider for visual separation between UI elements.
# Error Handling
- Error Display: Displays an error message if fetching flight offers fails, ensuring robust user feedback.
# Navigation
- Routing: Uses useNavigate from react-router-dom for navigating to the flight record page (/flightrecord) upon search button click.
# Future Improvements
- Enhance accessibility features like keyboard navigation and screen reader support.
- Implement caching strategies to optimize API requests for flight offers.
- Improve responsive design for better usability across devices.
