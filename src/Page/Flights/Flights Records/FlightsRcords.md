# FlightsRecords Component Details

## State Variables and Symbols

- `flightRecordFromOpen` 🔓: Boolean state to manage visibility of FlightFrom dropdown.
- `flightRecordToOpen` 🔓: Boolean state to manage visibility of FlightsTo dropdown.
- `flightTraveller` 🔓: Boolean state to manage visibility of Travellers modal.
- `AirportFrom` 🛫: Array containing details of departure airport (name, code, city).
- `AirportTo` 🛬: Array containing details of destination airport (name, code, city).
- `travellersCount` 👥: Number of travellers selected for the flight.
- `flightdepartureDate` 📅: Date selected for departure.
- `seatCount` 🪑: Total number of seats selected.
- `sliderValue` 🎚️: Value selected on the price range slider.
- `value` 🧾: Value used for price comparison (e.g., "$gte").
- `field` 🔍: Field used for filtering (e.g., "ticketPrice").

## Functionality and Outputs

### Toggle Functions

- `handleFlightFormOpen()` 🛫: Toggles visibility of FlightFrom dropdown.
- `handleFlightToOpen()` 🛬: Toggles visibility of FlightsTo dropdown.
- `handleFlightTraveller()` 👥: Toggles visibility of Travellers modal.

### Seat Count Functions

- `incrementAdultsSeatCount()` ➕: Increments adult seat count.
- `decrementAdultsSeatCount()` ➖: Decrements adult seat count.
- `incrementChildrenSeatCount()` ➕: Increments children seat count.
- `decrementChildrenSeatCount()` ➖: Decrements children seat count.
- `incrementInfantSeatCount()` ➕: Increments infant seat count.
- `decrementInfantSeatCount()` ➖: Decrements infant seat count.

### Search Function

- `handleSearch()` 🔍: Performs flight search based on selected criteria (airport, date, price range).

### Slider and Checkbox Handling

- `handleSliderChange(event)` 🎚️: Updates slider value for price range.
- `handleCheckboxRatingChange(value)` ✅: Updates checkbox value for flight criteria (stops, duration).

### Click Handlers

- `handleClickSet(type, key, data)` 🖱️: Sets field, value, and slider data based on user selection.

## Connections

- **Parent Component**: Manages state and data flow for child components.
- **Child Components**: Interact with parent component through props and state updates.
  - `Navbar`: Provides navigation and possibly user information.
  - `FlightFrom`, `FlightsTo`: Dropdowns for selecting airports.
  - `DatePicker`: Allows selection of departure date.
  - `Travellers Modal`: Modal for selecting number of travellers and seat types.
  - `FlightLists`: Displays list of flights based on search results.

## Additional Notes

- Data fetched from an external API (`handleSearch()` function).
- State management handled using React hooks (`useState`, `useEffect`).
- UI components styled using CSS modules (`FlightRecord.module.css`).

```scss
FlightsRecords Component
├── State Variables and Symbols
│   ├── flightRecordFromOpen 🔓
│   ├── flightRecordToOpen 🔓
│   ├── flightTraveller 🔓
│   ├── AirportFrom 🛫
│   ├── AirportTo 🛬
│   ├── travellersCount 👥
│   ├── flightdepartureDate 📅
│   ├── seatCount 🪑
│   ├── sliderValue 🎚️
│   ├── value 🧾
│   └── field 🔍
├── Functionality and Outputs
│   ├── Toggle Functions
│   │   ├── handleFlightFormOpen()
│   │   ├── handleFlightToOpen()
│   │   └── handleFlightTraveller()
│   ├── Seat Count Functions
│   │   ├── incrementAdultsSeatCount()
│   │   ├── decrementAdultsSeatCount()
│   │   ├── incrementChildrenSeatCount()
│   │   ├── decrementChildrenSeatCount()
│   │   ├── incrementInfantSeatCount()
│   │   └── decrementInfantSeatCount()
│   ├── Search Function
│   │   └── handleSearch()
│   ├── Slider and Checkbox Handling
│   │   ├── handleSliderChange(event)
│   │   └── handleCheckboxRatingChange(value)
│   └── Click Handlers
│       └── handleClickSet(type, key, data)
└── Connections
    ├── Parent Component
    │   ├── Navbar
    │   ├── FlightFrom
    │   ├── FlightTo
    │   ├── DatePicker
    │   ├── Travellers Modal
    │   └── FlightLists
    └── Child Components
```
