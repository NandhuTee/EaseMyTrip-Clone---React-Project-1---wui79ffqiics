# ModalSignUp Component Explanation

## Overview

This Markdown file explains the functionality and implementation details of the `ModalSignUp` component.

### State Management

- `firstName`, `lastName`, `mail`, `password`: State variables to manage user input fields and error messages.
- `errorMessage`, `correctCredential`: States to handle error messages and validation flags.
- `emailPattern`: Regular expression pattern to validate email format.

### Event Handlers

- `mailInput(e)`, `passwordInput(e)`, `firstNameInput(e)`, `lastNameInput(e)`: Functions to update respective state variables as user inputs change.
- `handleCloseSignUp()`: Function to close the sign-up modal.
- `handleBusSignup()`: Async function to handle sign-up process, validate inputs, and interact with the API.

### UI Components

#### Input Fields

```jsx
<div className="w-[100%] flex gap-[2%] mt-[10px]">
    {/* Input field for first name */}
    <input
        type="text"
        className="w-[49%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
        value={firstName}
        onChange={firstNameInput}
        placeholder="First name"
    />
    
    {/* Input field for last name */}
    <input
        type="text"
        className="w-[49%] p-[10px] rounded-[5px] border-[0.5px] border-solid border-gray-200 focus:outline-none"
        value={lastName}
        onChange={lastNameInput}
        placeholder="Last name"
    />
</div>
