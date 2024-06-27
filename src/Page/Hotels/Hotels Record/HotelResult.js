import React from "react";
import { Divider } from "@mui/material";
import Classes from "../Hotels.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../components/Context";

const HotelResult = ({ searchHotelResults }) => {
  const { setHotelId } = useAuth();

  return (
    <div className={Classes.boxSearchdataHotel}>
      {searchHotelResults.length > 0 ? (
        searchHotelResults.map((hotelApidata) => (
          <div className={Classes.hotelDataBox} key={hotelApidata._id}>
            <div className={Classes.hotelDataSection}>
              <div className={Classes.hotelImageDiv}>
                <img
                  className={Classes.imageHotel}
                  src={hotelApidata.images[1]}
                />
              </div>
              <div className={Classes.hotelDetailSection}>
                <div className={Classes.hotelDetails}>
                  <div className={Classes.nameRating}>
                    <div className={Classes.dataHotel}>
                      <div className={Classes.nameHotelIcon}></div>
                      <p>{hotelApidata.name}</p>
                    </div>
                    <div className={Classes.hotelDetailHeader}>
                      <p>Rating</p>
                      <div className={Classes.ratingHotel}>
                        {/* <StarRating rating={hotelApidata.rating}/> */}
                        <p className={Classes.pHotelRating}>
                          {hotelApidata.rating}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={Classes.hotelLocation}>
                    <img src="https://www.easemytrip.com/hotels/images/placeholderloc.svg" />
                    <p>{hotelApidata.location}</p>
                  </div>
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
                <Divider orientation="vertical" flexItem />
                <div className={Classes.hotelBooking}>
                  <div className={Classes.priceTaxSection}>
                    <div className={Classes.priceHotelSection}>
                      <img src="https://hotels.easemytrip.com/newhotel/Content/img/rupee_new_black.svg" />
                      {Math.floor(hotelApidata?.avgCostPerNight)}
                    </div>
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
                    <p className={Classes.perNightHotel}>Per Night</p>
                  </div>
                  <div className={Classes.buttonsSectionHotel}>
                    <Link to="/hoteldetails">
                      <div className={Classes.buttonViewRoom}>
                        <button
                          className={Classes.viewHotel}
                          onClick={() => {
                            setHotelId(hotelApidata._id);
                          }}
                        >
                          View Room
                        </button>
                      </div>
                    </Link>
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
        <p className="font-[600] text-[#000] text-[22px] flex justify-center items-center">
          No Hotel Available For the Selected Day
        </p>
      )}
    </div>
  );
};
export default HotelResult;
