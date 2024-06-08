import React from "react";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import Classes from "./StarRating.module.css";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} className={Classes.star} />);
    }
    if (hasHalfStar) {
      stars.push(<StarHalfIcon key={fullStars} className={Classes.star} />);
    }
    const remainingStars = totalStars - stars.length;

    for (let i = 0; i < remainingStars; i++) {
      stars.push(<StarOutlineIcon key={fullStars + i + 1} className={Classes.star} />);
    }

    return stars;
  };

  return <div className={Classes.starRating}>{renderStars()}</div>;
};

export default StarRating;