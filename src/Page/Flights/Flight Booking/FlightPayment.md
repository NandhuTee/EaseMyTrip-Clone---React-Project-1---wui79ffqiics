# Overview
- The component is part of a flight booking application and integrates with the application's authentication system to retrieve booking details. Users can select their preferred payment method, enter necessary details (like UPI ID or card information), and initiate the payment process.

# Features
- Selection between UPI and Debit/Credit Card payment options.
- Validation of input fields based on the selected payment method.
- Display of total fare based on the number of seats and fare per seat.
- Integration with a backend API to finalize the booking transaction.
# Implementation Details
## State Management
**selectedOption:** State variable to track the currently selected payment method (UPI or DebitCreditCard).

**showSuccessfull:** State to control the visibility of the payment success message.
**allFieldsFilled:** State indicating whether all required input fields are filled before enabling the payment button.
## Event Handling
*handleOptionClick:* Function to update the selected payment option.
*handleInputChange:* Function to handle changes in input fields (e.g., UPI ID or card details) and validate them accordingly.

*fetchPaymentData:* Function triggered when the user clicks on "Make Payment," which sends a POST request to the backend API with booking details upon successful validation.
## Components Used
- Navbar: Component for navigation within the application.
- PaymentSuccessfull: Component that displays a success message upon successful completion of the payment transaction.
## Dependencies
- React: Used for building the user interface and managing component state.
  
- Material-UI: Provides components like Divider for visual separation and Snackbar for displaying feedback messages.
  
- CSS Modules: Used for styling components with scoped CSS classes.