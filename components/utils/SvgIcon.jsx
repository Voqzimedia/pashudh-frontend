import React from "react";

const SvgIcon = ({ icon, className }) => {
  return (
    <img
      className={`svgIcon ${className ? className : ""}`}
      src={icon}
      alt="Icon"
    />
  );
};

export default SvgIcon;
