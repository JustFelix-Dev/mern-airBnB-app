import React from "react";

const PlacesImage = ({ place, index = 0, className = null }) => {
  if (!place?.photos?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return (
    <>
      <img className={className} src={place.photos[index]} alt="displayIcon" />
    </>
  );
};

export default PlacesImage;
