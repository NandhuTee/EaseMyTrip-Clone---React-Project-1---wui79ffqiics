# FlightsTo Component Documentation
## Hooks
- **useState**: Used to manage local component state, such as storing airport search input (airport), fetched airport details (airportDetail), and managing ListItemButton data selection (liData).
- **useEffect** : Utilized to fetch airport details from an API (fetchData function) based on changes to the airport state.
- **useAuth** : Hook imported from "../../../components/Context" for accessing authentication context and setting destination airport (setAriportTo).
## State Variables
- **airport** : Stores the user input for airport city search.
airportDetail: Array that holds the fetched airport details from the API.
- **liData** : Boolean state to manage the state of ListItemButton data selection.
- **setAriportTo** : Function from useAuth context to set the selected airport as the destination.
## Functionality
- **handleChange** : Updates the airport state based on user input in the search input field.
- **fetchData** : Fetches airport details from an API (https://academics.newtonschool.co/api/v1/bookingportals/airport) based on the airport state. Uses the projectId header for authentication.
- **handleLiData** : Sets the selected airport (city, name, iata_code) as the destination using setAriportTo from the useAuth context and closes the component (onclose) after setting liData to true.
  
## Connections with Other Components
- **Context (useAuth)** : Uses useAuth context to set the destination airport (setAriportTo) when a user selects an airport.
- **ListItemButton** : Renders a clickable list item for each airport fetched, allowing users to select their destination.
## Output
- Displays a search input field where users can enter a city name to search for airports.
- Renders a list of airports matching the search criteria as clickable items (ListItemButton) with flight icon, city name, airport name, and country.

# Conceptual Graph Description:
## Modal Component:

- Represents the modal interface with a search input field and a list of airports.
  
## Search Input Field:

- An input field where users can type to search for airports based on city names.

## Airport List:

- Displays a dynamic list of airports based on the user's search query.
  
- Each airport entry includes:
    - City name
    - Airport name
    - Country
## Selection Interaction:

- User interaction involves selecting an airport from the list.
- Upon selection, the chosen airport updates the context (possibly stored in a state management system like React Context or Redux).
- The modal closes automatically after selecting an airport.

## Graph Representation:

- Each step should be labeled clearly, with arrows indicating the flow of actions (e.g., user input → API request → list update).
  
## Example Visualization:
```sql
+------------------------------------+
|           Airport Modal            |
| +-------------------------------+  |
| | Search: [          ]           |  |
| +-------------------------------+  |
|                                    |
| +-------------------------------+  |
| | City: XYZ                      |  |
| | Name: XYZ Airport              |  |
| | Country: XYZ                   |  |
| +-------------------------------+  |
|                                    |
| +-------------------------------+  |
| | City: ABC                      |  |
| | Name: ABC Airport              |  |
| | Country: ABC                   |  |
| +-------------------------------+  |
|                                    |
|        [ Select Airport ]          |
+------------------------------------+
```

- This graphical representation shows the modal interface with the search input field and a list of airports. Each airport entry includes city, name, and country details.
- Upon selecting an airport, the modal updates the context (not shown in the static image but implied by the selection action).
- The modal can be closed after selecting an airport, completing the interaction flow.
- This conceptual graph helps in visualizing the user interface and interaction flow of selecting airports within a modal component.