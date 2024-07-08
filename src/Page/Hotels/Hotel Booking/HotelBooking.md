# HotelBooking

## State Variables
- **hotelDetailError**: Manages error state if there's an issue fetching hotel data.
  
- **hotelBookingDetailData**: Stores details of a specific hotel booking retrieved from an API.
  
- **firstName and lastName**: Capture guest details entered by the user.
  
- **firstNameError and lastNameError**: Hold error messages for validation purposes.
  
- **Other state variables**: 
Manage authentication details (hotelBookingId, hotelDepartureDate, etc.) using the useAuth context.
## Functionality

- *Fetch Hotel Data:* fetchSingleHotelData function fetches details of a hotel booking using hotelBookingId from an API endpoint.
  
- *Input Handling:* handleFirstNameChange and handleLastNameChange functions update state variables firstName and lastName respectively, ensuring errors are cleared when inputs change.
  
- *Payment Navigation:*-  handlePayment function validates guest names and navigates to the hotel payment page (/hotelpayment) while passing relevant booking details.
  
## Components Connectivity

- **Navbar:** Imported from Navbar.js, providing navigation and possibly authentication context.
  
- **Context API (useAuth):** Manages and provides shared state and functionality related to user authentication and booking details across components.
  
- **CSS Modules (Classes):** Imports styles for consistent UI presentation.
  
## Pictorial Representation
### Component Hierarchy:
- HotelBooking
- Navbar
- PersonalDetailHotel
- Inputs for First Name and Last Name
- Payment Summary
- Details of selected hotel, pricing, and a button to continue to payment.
  
## Output
- Renders a UI that displays details about a selected hotel booking, including images, dates, location, room details, and a form for entering guest names.
- Calculates and displays pricing details based on the selected number of guests and hotel rates.
  
## Concepts of React Utilized
- **State and Props:** Manage and pass down state variables and props through components.
- **Effect Hook (useEffect):** Fetches hotel booking details when hotelBookingId changes.
- **Context API (useAuth):** Centralizes and manages authentication and booking details.
- **Event Handling (onChange, onClick):** Manages user input changes and button clicks.
- **Conditional Rendering:** Displays error messages conditionally based on input validation.
- **Styling with CSS Modules:** Applies scoped styles to ensure consistent UI appearance.
This breakdown provides a comprehensive understanding of how the HotelBooking component operates within a React application, utilizing various React concepts to manage state, handle user interactions, fetch data, and render dynamic content.