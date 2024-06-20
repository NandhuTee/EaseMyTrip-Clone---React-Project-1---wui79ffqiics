import React, { useState } from "react";

// Functional component representing the Home page
function Home() {
    // State variables for managing color and toggles
    const [isRed, setIsRed] = useState(false);
    const [isBlue, setIsBlue] = useState(false);

    // Function to toggle red color
    const red = () => {
        setIsRed(!isRed);
    }

    // Function to toggle blue color
    const blue = () => {
        setIsBlue(!isBlue);
    }

    return (
        <div className="container">
            <div className={`circle ${isRed ? 'red' : 'blue'}`}>
                {isBlue ? (
                    <div className="inner-circle blue"></div>
                ) : (
                    <div className="inner-circle red"></div>
                )}
            </div>
            <button onClick={blue}>Blue</button>
            <button onClick={red}>Red</button>
        </div>
    );
}

export default Home;
