import React, { useState, useEffect } from "react"; // Import React, useState, and useEffect hooks
import Navbar from "./Navbar"; // Import Navbar component
import Classes from "./Navbar.module.css"; // Import CSS module for styling
import { useAuth } from "../Context"; // Import custom authentication context

function MyBooking() {
  const [bookingData, setBookingdata] = useState([]); // State for storing booking data
  const bartoken = localStorage.getItem("token"); // Get token from localStorage
  const { isLoggedIn } = useAuth(); // Destructure authentication context
  
  useEffect(() => {
    const fetchBookingdata = () => {
      const api = "https://academics.newtonschool.co/api/v1/bookingportals/booking"; // API endpoint for booking data
      const productid = "uojmjpx76p25"; // Project ID
      fetch(api, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bartoken}`, // Set authorization header with token
          projectID: productid, // Set project ID header
        },
      })
        .then((response) => {
          if (response.ok) {
            const data = response.json(); // Parse JSON response
            return data;
          }
        })
        .then((data) => {
          setBookingdata(data?.data); // Set booking data state
        });
    };
    fetchBookingdata(); // Fetch booking data on component mount
  }, []);

  return (
    <div>
      <Navbar /> {/* Render Navbar component */}
      {bartoken ? ( // Check if token is available
        <div className={Classes.myBookingSection}>
          <div className={Classes.myBookingDiv}>
            <div className={Classes.boxMyBooking}>
              <div className="h-[27px] w-[27px] overflow-hidden">
                <img
                  className="w-[700px] mt-[-30px] ml-[-4px]"
                  src="https://imgak.mmtcdn.com/mima/images/Desktop/mytripSprite.png"
                  alt="Bookings" // Alt text for image
                />
              </div>
              <h4>Bookings</h4> {/* Heading for bookings section */}
            </div>
            <div className="w-[100%] gap-[30px]">
              {bookingData.length === 0 ? ( // Check if booking data is empty
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    height: "310px",
                    justifyContent: "center",
                  }}
                >
                  <img src="https://mybookings.easemytrip.com/Content/assest/img/booking-data.svg" alt="Empty" /> {/* Empty state image */}
                  <div>
                    <h3>Currently You Have No Bookings.</h3> {/* Message for empty bookings */}
                  </div>
                </div>
              ) : (
                bookingData?.map((bookingdetail, id) => ( // Map through booking data
                  <div key={id} className={Classes.summeryBox}>
                    <div className="w-[500px]">
                      <h4>
                        Booking Type:{" "}
                        <span style={{ fontSize: "14px" }}>{bookingdetail?.booking_type}</span> {/* Booking type */}
                      </h4>
                      <small>{bookingdetail?.user?.name} was Travelling</small> {/* User name */}
                      <h4>{bookingdetail?.hotel?.name}</h4> {/* Hotel name */}
                      <h4 style={{ marginTop: "20px" }}>
                        Booking Status:{" "}
                        <span className="text-[14px] text-[#fff] bg-[green] p-[5px]">{bookingdetail?.status}</span> {/* Booking status */}
                      </h4>
                    </div>
                    <h4>
                      Trip Id:{" "}
                      <span style={{ fontSize: "14px" }}>{bookingdetail?._id}</span> {/* Trip ID */}
                    </h4>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <h3 className="flex justify-center text-[30px] mt-[10px]"> Please Login First ! </h3> // Message for unauthenticated users
      )}
    </div>
  );
}

export default MyBooking; // Export MyBooking component
