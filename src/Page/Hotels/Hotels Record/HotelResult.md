# HotelResult Component
- The HotelResult component is designed to display a list of hotel search results with detailed information for each hotel. 
# Here's an overview of its structure and functionality:
 - **Component Props:** Receives searchHotelResults as props, an array of hotel data fetched from an API.
  
- **Rendering Hotels:** Maps through searchHotelResults to display each hotel's information.
  
- **Hotel Details:** Displays hotel name, rating, location, amenities, price details, and booking options
  
- **Navigation:** Uses Link from React Router for navigating to detailed hotel view (/hoteldetails).
  
- **Authentication:** Utilizes useAuth context to set hotel ID (setHotelId) when viewing details or logging in for discounts.
  
- **Conditional Rendering:** Shows a message if no hotels are available for the selected day.