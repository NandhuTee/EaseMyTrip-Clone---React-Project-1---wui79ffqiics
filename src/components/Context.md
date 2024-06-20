# Context.js Explanation

## Overview
The `Context.js` file defines a React context (`AuthContext`) and provides a custom hook (`useAuth`) along with an `AuthProvider` component to manage and share application-wide state.

## Imports
- **createContext, useContext, useState**: Imported from React to create context, use context, and manage state respectively.

## AuthProvider Component
- **Purpose**: Wraps the entire application and provides access to shared state and functions.
- **State Variables**:
  - Various state variables are defined using `useState` to manage different aspects of application data such as hotel details, flight details, booking information, etc.

## useAuth Custom Hook
- **Purpose**: Provides a convenient way to access the `AuthContext` and its state variables throughout the application.

## Usage
- **Setting State**: Each state variable has a corresponding setter function exposed through the `AuthContext.Provider`.
- **Consuming Context**: Use the `useAuth` hook within any functional component to access and update the shared state.

## Example
```jsx
// Example of using useAuth hook in a functional component
import React from 'react';
import { useAuth } from './context';

const ExampleComponent = () => {
  const { hotelLocation, setHotelLocation } = useAuth();

  return (
    <div>
      <p>Current Hotel Location: {hotelLocation}</p>
      <button onClick={() => setHotelLocation('New York')}>Set Location to New York</button>
    </div>
  );
};
