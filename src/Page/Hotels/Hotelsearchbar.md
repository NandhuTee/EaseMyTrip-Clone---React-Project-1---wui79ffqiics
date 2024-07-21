# HotelSearchbar Component

The `HotelSearchbar` component is a React component that provides a search bar for hotel bookings. It includes functionality for selecting the location, check-in and check-out dates, and the number of guests (adults and children). 

## Imports and Dependencies

- `react`: Core React library for building user interfaces.
- `useState`: React hook for managing state.
- `DatePicker`: A date picker component from `react-datepicker`.
- `moment`: A library for date manipulation.
- `Divider`: A component from `@mui/material` for creating vertical dividers.
- `Classes`: Imported CSS module for styling.
- `useAuth`: Custom hook for accessing authentication context.
- `react-datepicker/dist/react-datepicker.css`: CSS for the date picker.

## State Management

The component uses the following state variables:

- `HotelTraveller`: A boolean state for toggling the visibility of the traveller dropdown.
- Context values from `useAuth` for managing various hotel search parameters:
  - `hotelLocation`: State for the hotel location.
  - `hotelDepartureDate`: State for the check-in date.
  - `searchHotelResults`: State for storing search results.
  - `isSelectedDayCheckOut`: State for the check-out date.
  - `seatHotelCount`: State for the total number of guests.
  - `seatHotelAdultsCount`: State for the number of adult guests.
  - `seatHotelChildrenCount`: State for the number of child guests.

## Custom Input Components

Custom input components are created for the date picker to format the selected dates:

- `CustomInput`: Formats the check-in date.
- `CustomInputCheckout`: Formats the check-out date.

## Event Handlers

- `handleSetLocation`: Updates the hotel location state based on user input.
- `handleSearch`: Clears the search results.
- `handleHotelTraveller`: Toggles the visibility of the traveller dropdown.
- `incrementHotelAdultsSeatCount`: Increases the number of adult guests.
- `decrementHotelAdultsSeatCount`: Decreases the number of adult guests.
- `incrementHotelChildrenSeatCount`: Increases the number of child guests.
- `decrementHotelChildrenSeatCount`: Decreases the number of child guests.

## JSX Structure

The component renders the following elements:

1. **Search Bar Header**
   - Container for the entire search bar.

2. **Location Input**
   - Input field for entering the city name, location, or specific hotel.

3. **Date Picker Section**
   - Contains the check-in and check-out date pickers.

4. **Guests Section**
   - Displays the number of guests and toggles the traveller dropdown.

5. **Traveller Dropdown**
   - Dropdown for selecting the number of adults and children.

6. **Search Button**
   - Button to initiate the search.

## Component Code
`less`

Root
└── div.searchBarHotelHeaders
    └── div.searchBarHotel
        ├── div.searchBHedersHotel
        │   └── div.searchFromHotel
        │       ├── p.headingInputHotel
        │       └── div.inputFormSectionHotel
        │           └── input.formSearchBoxHotel
        ├── div.hotelDatesSection
        │   ├── div.searchCheckIn
        │   │   └── div.searchCheckInClick
        │   │       ├── p.headingCheckIn
        │   │       └── div.searchDateInput
        │   │           └── DatePicker (CustomInput)
        │   ├── Divider
        │   └── div.searchCheckOut
        │       └── div.searchCheckOutClick
        │           ├── p.headingCheckOut
        │           └── DatePicker (CustomInputCheckout)
        ├── div.searchRooms
        │   └── div.searchRoomsClick
        │       ├── p.headingCheckOut
        │       ├── div.guestCountDisplay
        │       │   ├── span (Seat count)
        │       │   ├── span (Guests(s))
        │       │   └── i.dropDownArrow
        ├── div.hotelTravellerDropdown (conditional)
        │   ├── div.travellerItem
        │   │   ├── div.travellerDetails
        │   │   │   ├── p.travellerLabel (Adults)
        │   │   │   └── p.travellerAge (12+ Years)
        │   │   └── div.travellerCounter
        │   │       ├── button.counterButton (Decrement adults count)
        │   │       ├── input.travellerInput (Adult count)
        │   │       └── button.counterButton (Increment adults count)
        │   ├── div.travellerItem
        │   │   ├── div.travellerDetails
        │   │   │   ├── p.travellerLabel (Children)
        │   │   │   └── p.travellerAge (2-12 Years)
        │   │   └── div.travellerCounter
        │   │       ├── button.counterButton (Decrement children count)
        │   │       ├── input.travellerInput (Children count)
        │   │       └── button.counterButton (Increment children count)
        │   └── div.doneButton
        └── div.searchButtonHotel
            └── h3 (Modify Search)
