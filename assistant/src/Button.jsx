import React, { useRef } from "react";

const Button = ({ onClick, x, y, verticalOffset }) => {
  const buttonRef = useRef(null);

  const handleButtonClick = () => {
    const buttonRect = buttonRef.current.getBoundingClientRect();
    onClick({ x: buttonRect.left, y: buttonRect.top, verticalOffset });
  };

  return (
    <button
      ref={buttonRef}
      className="bg-[#FB00FA] hover:bg-[#B703B6] button text-white font-bold py-2 px-4 rounded"
      onClick={handleButtonClick}
      style={{ position: "absolute", left: x, top: y }}
    >
      Click Me
    </button>
  );
};

export default Button;
