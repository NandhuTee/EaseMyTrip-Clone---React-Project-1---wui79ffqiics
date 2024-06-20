# Navbar Component Explanation
Feature 01: Navbar
## Overview
This Markdown file provides an explanation of the Navbar component in the application.

## Purpose
The Navbar component serves as a navigation bar that includes links to various sections such as flights, hotels, trains, and buses. It also manages user authentication and displays user-specific information and actions.

## Dependencies
- React: Utilizes React framework for building UI components.
- Material-UI: Uses Material-UI components for enhanced UI design.
- React Router: Integrates React Router for client-side routing.

## Detailed Explanation
The Navbar component is structured to provide a user-friendly navigation experience and includes features such as:

### Navigation Section
![Navbar Logo]("C:\Users\nandhu\EaseMyTrip-Clone---React-Project-1---wui79ffqiics\src\Design\easyMyTrip-navbar.jpg")
- Displays the logo of the application which serves as a link back to the homepage (`/`).

### Route Links
- Provides links to different sections:
  - Flights
  - Hotels
  - Trains
  - Bus

Each link is styled and organized within the navigation bar to facilitate easy access to different parts of the application.

### User Account Section
![User Icon](path/to/user_icon.png)
- Shows a user icon indicating the current logged-in status.
- If logged in (`isToken` present), displays the user's name retrieved from `localStorage`.
- Provides a dropdown menu with options:
  - My Bookings: Directs the user to their booking history (`/mybooking`).
  - Log Out: Logs the user out by removing the authentication token from `localStorage`.

### Modal for Login
- Includes a modal component (`ModalLogin`) triggered by clicking the "LOGIN OR SIGNUP" button when not logged in (`isToken` not present).

### Styling
- Uses CSS modules (`Navbar.module.css`) for styling components and ensuring a consistent look across the application.

## Example Usage
```jsx
import React from 'react';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* Other components and content */}
    </div>
  );
}

export default App;
