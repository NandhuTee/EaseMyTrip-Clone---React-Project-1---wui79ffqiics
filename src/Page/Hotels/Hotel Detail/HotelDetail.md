# HotelDetail Component

The `HotelDetail` component is part of a hotel booking application. It displays detailed information about a specific hotel, including its name, location, images, room types, amenities, and pricing details. Users can select rooms and proceed with booking if logged in, or they are prompted to log in if not already authenticated.

## Features

### 1. Hotel Information Section

- Displays the hotel's name and location.
- Shows the hotel's rating.
- Provides images of the hotel, including the main image and additional samples.

### 2. Pricing and Booking Section

- Lists available rooms with details such as room type, benefits, and per-night pricing.
- Allows users to select rooms and proceed to book.
- Shows price breakdown including taxes and fees.

### 3. Check-in and Check-out Details

- Displays check-in and check-out times.

### 4. Amenities Section

- Lists amenities provided by the hotel.

### 5. Interaction Section

- Allows logged-in users to book rooms directly.
- Prompts users to log in if attempting to book without authentication.

## Usage

To use the `HotelDetail` component, integrate it into a React application where hotel booking functionality is required. Ensure proper routing and authentication handling to manage user interactions effectively.

```jsx
import React from 'react';
import HotelDetail from './HotelDetail';

function App() {
  return (
    <div className="App">
      <HotelDetail />
    </div>
  );
}

export default App;
