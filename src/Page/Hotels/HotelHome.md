# HotelHome Component
The HotelHome component is a core part of the hotel booking application, allowing users to search for hotels, select check-in and check-out dates, and specify the number of travelers. The component also fetches and displays special offers for hotels. This document provides an overview of its structure, state management, and functionality.

# Table of Contents
1. Component Structure
2. State Management
3. Functions
4. Custom Inputs
5. Fetching Offers
6. Rendering
   
## Component Structure
The HotelHome component is structured as follows:

**Navbar:** Displays the navigation bar at the top.
Hotel Search Section: Allows users to search for hotels by entering a location, selecting check-in and check-out dates, and specifying the number of travelers.

**Offers Section:** Displays special offers for hotels.
State Management

# The component utilizes both context and local state to manage its data:

**Context State (via useAuth):**

- hotelLocation: Selected hotel location.
- hotelDepartureDate: Selected check-in date.
- isSelectedDayCheckOut: Selected check-out date.
- seatHotelCount: Total number of travelers.
 - seatHotelAdultsCount: Number of adult travelers.
- seatHotelChildrenCount: Number of child travelers.
- Local State (via useState):

- offers: List of special offers fetched from the API.
- isDropdownOpen: Boolean indicating whether the location dropdown is open.
- selectedOfferType: Currently selected offer type (e.g., "HOTELS").
- loading: Boolean indicating whether offers are being loaded.
- HotelTraveller: Boolean indicating whether the traveler dropdown is open.
- filteredLocations: Filtered list of locations based on user input.
## Functions
The component includes several functions to handle various user interactions:

- openDropdown: Opens the location dropdown.
- closeDropdown: Closes the location dropdown.
- handleLocationClick: Sets the selected location and closes the dropdown.
- handleInputChange: Filters the list of locations based on user input.
- handleSearch: Navigates to the /hotels route when the search button is clicked.
- handleHotelTraveller: Toggles the visibility of the traveler dropdown.
- incrementHotelAdultsSeatCount: Increases the number of adult travelers.
- decrementHotelAdultsSeatCount: Decreases the number of adult travelers.
- incrementHotelChildrenSeatCount: Increases the number of child travelers.
- decrementHotelChildrenSeatCount: Decreases the number of child travelers.
## Custom Inputs
The component includes custom input components for the date pickers:

- CustomInput: Renders the check-in date picker input.
- CustomInputReturn: Renders the check-out date picker input.
These components format the selected date using moment.js and trigger the date picker on click.

## Fetching Offers
- The useEffect hook is used to fetch special offers from the API when the component mounts or when the selectedOfferType changes. The offers are fetched from the following endpoint:
*https://academics.newtonschool.co/api/v1/bookingportals/offers?filter={"type":"${selectedOfferType}"}*
The fetchOffers function handles the API request and updates the offers state with the fetched data.

## Rendering
The component renders the following elements:

- Navbar: The navigation bar at the top.
Hotel Search Section:
- Location Input: An input field for entering the hotel location.
- Check-in Date Picker: A date picker for selecting the check-in date.
- Check-out Date Picker: A date picker for selecting the check-out date.
- Traveler Selection: A dropdown for selecting the number of travelers.
- Search Button: A button to trigger the search.
- Offers Section: A list of special offers for hotels.
Below is the JSX structure of the component:
`scss`
HotelHome Component JSX Structure
HotelHome
├── Navbar
├── HotelSearchSection
│   ├── HeadSearchbar
│   │   └── CaptionHotel
│   │       └── h1 (Same hotel, Cheapest price. Guaranteed!)
│   ├── SearchBar
│   │   ├── MainDivSearch
│   │   │   ├── SearchFrom
│   │   │   │   ├── InputHeading
│   │   │   │   │   ├── img (Icon)
│   │   │   │   │   └── p (Enter City name, Location)
│   │   │   │   ├── InputFormSection (onClick: openDropdown)
│   │   │   │   │   ├── input (Hotel Location)
│   │   │   │   │   └── DropMyLocation (conditional)
│   │   │   │   │       └── ListItemButton* (onClick: handleLocationClick)
│   │   ├── Divider (vertical)
│   │   ├── HotelHomesSectionCheckIn
│   │   │   └── HotelHomeCheckIn
│   │   │       ├── CheckInHeading
│   │   │       │   ├── img (Icon)
│   │   │       │   └── p (Check-in)
│   │   │       └── DatePicker (Check-in Date)
│   │   ├── Divider (vertical)
│   │   ├── SearchReturn
│   │   │   └── HotelCheckOut
│   │   │       ├── CheckOutHeading
│   │   │       │   ├── img (Icon)
│   │   │       │   └── p (Check-out)
│   │   │       └── DatePicker (Check-out Date)
│   │   ├── Divider (vertical)
│   │   ├── SearchTraveller
│   │   │   └── HotelChooseRooms (onClick: handleHotelTraveller)
│   │   │       ├── p (Guests)
│   │   │       ├── Span (Travellers)
│   │   │       ├── img (Arrow-down)
│   │   │       └── HotelSeatTraveller (conditional)
│   │   │           ├── HotelTravellerType (Adults)
│   │   │           │   ├── p (Adults)
│   │   │           │   └── HotelTravellerRight
│   │   │           │       ├── button (-)
│   │   │           │       ├── span (Count)
│   │   │           │       └── button (+)
│   │   │           └── HotelTravellerType (Children)
│   │   │               ├── p (Children)
│   │   │               └── HotelTravellerRight
│   │   │                   ├── button (-)
│   │   │                   ├── span (Count)
│   │   │                   └── button (+)
│   │   ├── HotelSearchBtn
│   │   │   └── button (Search) (onClick: handleSearch)
├── OffersSection
│   ├── OffersHeading
│   │   └── h2 (Offers)
│   └── OffersList
│       ├── p (Loading offers...) (conditional)
│       └── OfferItem* (conditional)
│           ├── img (Offer Image)
│           └── p (Offer Title)
## Explanation:
### HotelHome Component: The root component.
### Navbar: Renders the navigation bar.
### HotelSearchSection: Container for the hotel search form.
    - HeadSearchbar: Contains a heading for the search section.
        -   CaptionHotel: Displays a promotional message.
    - SearchBar: Contains the search form elements.
        - MainDivSearch: Main container for search inputs.
            - SearchFrom: Contains the input for the hotel location.
                - InputHeading: Displays an icon and a placeholder text.
                - InputFormSection: Contains the input field and handles dropdown opening.
                    - input: Input field for entering the location.
                    - DropMyLocation: Dropdown for selecting a location (conditionally rendered).
                        - ListItemButton: Individual location options in the dropdown.
### Divider: Vertical divider between input sections.
### HotelHomesSectionCheckIn: Container for the check-in date input.
    - HotelHomeCheckIn: Check-in date input section.
            - CheckInHeading: Displays an icon and a label for the check-in date.
            - DatePicker: Custom input for selecting the check-in date.
### Divider: Vertical divider between input sections.
### SearchReturn: Container for the check-out date input.
    - HotelCheckOut: Check-out date input section.
        - CheckOutHeading: Displays an icon and a label for the check-out date.
        - DatePicker: Custom input for selecting the check-out date.
### Divider: Vertical divider between input sections.
    - SearchTraveller: Container for the traveler selection.
        - HotelChooseRooms: Toggle for the traveler dropdown.
            - p: Label for the traveler count.
            - span: Displays the traveler count and a dropdown arrow.
            - HotelSeatTraveller: Dropdown for selecting the number of travelers (conditionally rendered).
                - HotelTravellerType (Adults): Controls for selecting adult travelers.
                    - p: Label for adults.
                    - HotelTravellerRight: Buttons for increasing/decreasing adult count.
                        - button (-): Decrement button.
                        - span: Displays the count of adults.
                        - button (+): Increment button.
        - HotelTravellerType (Children): Controls for selecting child travelers.
            - p: Label for children.
            - HotelTravellerRight: Buttons for increasing/decreasing child count.
                - button (-): Decrement button.
                - span: Displays the count of children.
                - button (+): Increment button.
    - HotelSearchBtn: Container for the search button.
        -   button: Search button to trigger the search.
    - OffersSection: Container for displaying special offers.
        -   OffersHeading: Heading for the offers section.
            - h2: Title "Offers".
        - OffersList: List of special offers.
            - p (Loading offers...): Displayed when offers are being loaded (conditionally rendered).
            - OfferItem: Individual offer items (conditionally rendered).
                -   img: Image of the offer.
                - p: Title of the offer.