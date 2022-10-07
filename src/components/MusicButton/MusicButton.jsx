import React from "react";

const MusicButton = ({ children, ...props }) => {
  return (
    <button {...props} type="button">
      {children}
    </button>
  );
};

export default MusicButton;
