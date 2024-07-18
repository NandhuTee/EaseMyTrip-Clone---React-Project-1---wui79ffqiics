import React from "react";
import { Divider } from "@mui/material";
import Classes from "../Hotels.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../components/Context";

const HotelResult = ({ searchHotelResults }) => {
  // Accessing setHotelId function from authentication context
  const { setHotelId } = useAuth();

  return (
    <div className={Classes.boxSearchdataHotel}>
      {searchHotelResults.length > 0 ? (
        // Mapping through searchHotelResults array to display hotel data
        searchHotelResults.map((hotelApidata) => (
          <div className={Classes.hotelDataBox} key={hotelApidata._id}>
            <div className={Classes.hotelDataSection}>
              {/* Hotel Image Section */}
              <div className={Classes.hotelImageDiv}>
                <img
                  className={Classes.imageHotel}
                  src={hotelApidata.images[1]}
                  alt={hotelApidata.name} // Example: Alt text for accessibility
                />
              </div>
              {/* Hotel Detail Section */}
              <div className={Classes.hotelDetailSection}>
                {/* Hotel Name and Rating */}
                <div className={Classes.hotelDetails}>
                  <div className={Classes.nameRating}>
                    <div className={Classes.dataHotel}>
                      <div className={Classes.nameHotelIcon}></div>
                      <p>{hotelApidata.name}</p>
                    </div>
                    <div className={Classes.hotelDetailHeader}>
                      <p>Rating</p>
                      <div className={Classes.ratingHotel}>
                        {/* Displaying hotel rating */}
                        {/* <StarRating rating={hotelApidata.rating}/> */}
                        <p className={Classes.pHotelRating}>
                          {hotelApidata.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Hotel Location */}
                  <div className={Classes.hotelLocation}>
                    <img src="https://www.easemytrip.com/hotels/images/placeholderloc.svg" />
                    <p>{hotelApidata.location}</p>
                  </div>
                  {/* Hotel Amenities */}
                  <div className={Classes.hotelAmenities}>
                    <div>
                      {hotelApidata.amenities.map((amenity, index) => (
                        <span className={Classes.amenityBox} key={index}>
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Divider */}
                <Divider orientation="vertical" flexItem />
                {/* Hotel Booking Details */}
                <div className={Classes.hotelBooking}>
                  {/* Price and Taxes Section */}
                  <div className={Classes.priceTaxSection}>
                    {/* Price per Night */}
                    <div className={Classes.priceHotelSection}>
                      <img src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_black.svg" />
                      {Math.floor(hotelApidata?.avgCostPerNight)}
                    </div>
                    {/* Taxes and Fees */}
                    <div className={Classes.taxesHotelSection}>
                      <p>+ </p>
                      <img
                        className={Classes.resIconHotel}
                        src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_black.svg"
                      />
                      <p className={Classes.taxParaHotel}>
                        {" "}
                        {hotelApidata.rooms[0].costDetails.taxesAndFees} Taxes &
                        fees
                      </p>
                    </div>
                    {/* Per Night Label */}
                    <p className={Classes.perNightHotel}>Per Night</p>
                  </div>
                  {/* Buttons Section */}
                  <div className={Classes.buttonsSectionHotel}>
                    {/* Link to Hotel Details */}
                    <Link to="/hoteldetails">
                      <div className={Classes.buttonViewRoom}>
                        <button
                          className={Classes.viewHotel}
                          onClick={() => {
                            // Set hotelId in authentication context
                            setHotelId(hotelApidata._id);
                          }}
                        >
                          View Room
                        </button>
                      </div>
                    </Link>
                    {/* Login & Save More Button */}
                    <div className={Classes.buttonLoginHotel}>
                      Login & Save More 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        // No Hotel Available Message
        <p className="font-[600] text-[#000] text-[22px] flex justify-center items-center">
          No Hotel Available For the Selected Day
        </p>
      )}
    </div>
  );
};

export default HotelResult;
