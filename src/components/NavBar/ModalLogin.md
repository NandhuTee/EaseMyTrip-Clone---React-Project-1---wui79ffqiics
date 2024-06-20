# ModalLogin Component Explanation

## Overview

This Markdown file provides an explanation of the `ModalLogin` component's functionality and implementation details.

### Purpose

The `ModalLogin` component is responsible for rendering a modal login form within the application. It allows users to log in using their email and password, handles authentication via an API request, and manages related states and user interactions.

### State Management

- `errorMessage`: State variable to hold error messages during login attempts.
- `mail`, `password`: State variables to manage email and password input fields.
- `correctCredential`: State variable to track whether credentials entered are correct.

### Hooks and Context

- `useAuth`: Custom hook imported from `../Context` to access authentication state and methods (`openLogin`, `setOpenLogin`, `openSignUp`, `setOpenSignUp`, `setIsLoggedIn`).

### Event Handlers

- `handleCloseLogin()`: Function to close the login modal.
- `mailInput(e)`, `passwordInput(e)`: Functions to update `mail` and `password` states based on user input.
- `handleLoginClick()`: Async function to handle login button click:
  - Sends a POST request to an authentication API (`https://academics.newtonschool.co/api/v1/bookingportals/login`).
  - Sets local storage items (`token`, `userId`, `userName`) upon successful login.
  - Updates authentication state (`setIsLoggedIn(true)`) and closes the modal (`handleCloseLogin()`) on success.
  - Displays error message (`errorMessage`) and sets `correctCredential` to `true` on failure.

### UI Components

#### Modal Structure

- Renders a Material-UI `Modal` component with:
  - Title (`Login or Create an account`).
  - Close button (`Classes.closeBtn`).
  - Error message display (`errorMessage`).
  - Input fields for email and password.
  - "Continue" button for login (`handleLoginClick`).
  - "Create New Account" link to open sign-up modal (`handleOpenSignUp`).
  - Terms of use and privacy policy statement.

### Styling

- Uses CSS modules (`Classes.modalLoginSection`, etc.) and Tailwind CSS utility classes for styling elements within the modal.

## Conclusion

The `ModalLogin` component enhances user experience by providing a secure and intuitive login interface, integrating seamlessly with the application's authentication flow using React and Material-UI.

