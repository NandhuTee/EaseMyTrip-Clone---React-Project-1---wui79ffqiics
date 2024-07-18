import React, { useState } from "react"; // Importing React and useState hook

function Home() {
    const [isRed, setIsRed] = useState(false); // State to track if the red circle should be displayed
    const [isBlue, setIsBlue] = useState(false); // State to track if the inner circle should be blue

    // Function to toggle the red circle
    const red = () => {
        setIsRed(!isRed); // Toggle the isRed state
    }

    // Function to toggle the blue inner circle
    const blue = () => {
        setIsBlue(!isBlue); // Toggle the isBlue state
    }

    return (
        <div className="w-[100%] h-[100vh] flex justify-center items-center">
            {/* Conditional rendering of the outer circle based on isRed state */}
            {isRed ? (
                <div className="w-[200px] h-[200px] border border-solid border-red-500 rounded-[50%] flex justify-center items-center">
                    {/* Conditional rendering of the inner circle based on isBlue state */}
                    {isBlue ? (
                        <div className="w-[50%] h-[50%] rounded-[50%] border border-solid border-blue-500"></div>
                    ) : (
                        <div className="w-[50%] h-[50%] rounded-[50%] border border-solid border-red-500"></div>
                    )}
                </div>
            ) : (
                <div className="w-[200px] h-[200px] border border-solid border-blue-500 rounded-[50%] flex justify-center items-center">
                    {/* Conditional rendering of the inner circle based on isBlue state */}
                    {isBlue ? (
                        <div className="w-[50%] h-[50%] rounded-[50%] border border-solid border-blue-500"></div>
                    ) : (
                        <div className="w-[50%] h-[50%] rounded-[50%] border border-solid border-red-500"></div>
                    )}
                </div>
            )}
            {/* Buttons to toggle the circles' colors */}
            <button onClick={blue}>Blue</button>
            <button onClick={red}>Red</button>
        </div>
    )
}

export default Home; // Exporting the Home component
