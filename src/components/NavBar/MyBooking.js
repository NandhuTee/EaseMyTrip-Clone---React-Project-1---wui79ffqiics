import React,{useState,useEffect} from "react";
import Navbar from "./Navbar";
import Classes from "./Navbar.module.css";
import { useAuth } from "../Context";
function MyBooking(){
    const [bookingData, setBookingdata] = useState([]);
    const bartoken = localStorage.getItem("token");
    const {isLoggedIn,}=useAuth();
    
    useEffect(() => {
        const fetchBookingdata = () => {
          const api = "https://academics.newtonschool.co/api/v1/bookingportals/booking";
          const productid = "uojmjpx76p25";
          fetch(api, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${bartoken}`,
              projectID: productid,
            },
          })
            .then((response) => {
              if (response.ok) {
                const data = response.json();
                return data;
              }
            })
            .then((data) => {
              setBookingdata(data?.data);
            });
        };
        fetchBookingdata();
      }, []);
    return(
        <div>
            <Navbar/>
            {bartoken?(
            <div className={Classes.myBookingSection}>
        <div className={Classes.myBookingDiv}>
          <div className={Classes.boxMyBooking}>
            <div className="h-[27px] w-[27px] overflow-hidden">
              <img
                className="w-[700px] mt-[-30px] ml-[-4px]"
                src="https://imgak.mmtcdn.com/mima/images/Desktop/mytripSprite.png"
                alt="Bookings"
              />
            </div>
            <h4>Bookings</h4>
          </div>
          <div className="w-[100%] gap-[30px]">
            {bookingData.length===0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection:"column",
                  alignItems: "center",
                  width: "100%",
                  height: "310px",
                  justifyContent: "center",
                }}
              >
                <img src="https://mybookings.easemytrip.com/Content/assest/img/booking-data.svg" alt="Empty" />
                <div>
                  <h3>Currently You Have No Bookings.</h3>
                </div>
              </div>
            ):(
              bookingData?.map((bookingdetail, id) => (
                <div key={id} className={Classes.summeryBox}>
                  <div className="w-[500px]">
                    <h4>
                      Booking Type :{" "}
                      <span style={{ fontSize: "14px" }}>{bookingdetail?.booking_type}</span>
                    </h4>
                    <small>{bookingdetail?.user?.name} was Travelling</small>
                    <h4>{bookingdetail?.hotel?.name}</h4>
                    <h4 style={{ marginTop: "20px" }}>
                      Booking Status :{" "}
                      <span  className="text-[14px] text-[#fff] bg-[green] p-[5px]">{bookingdetail?.status}</span>
                    </h4>
                  </div>
                  <h4>
                    Trip Id :{" "}
                    <span style={{ fontSize: "14px" }}>{bookingdetail?._id}</span>
                  </h4>
                </div>
              ))
            )}
          </div>
        </div>
      </div>):(<h3 className="flex justify-center text-[30px] mt-[10px]"> Please Login First ! </h3>)}
        </div>
    )
}
export default MyBooking;