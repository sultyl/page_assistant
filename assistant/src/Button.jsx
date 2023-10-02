import PropTypes from "prop-types"; // Import PropTypes

const Button = ({ label, onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white p-2 rounded"
    >
      {label}
    </button>
  );
};

// Define PropTypes for the Button component
Button.propTypes = {
  label: PropTypes.string.isRequired, // label should be a required string
  onClick: PropTypes.func.isRequired, // onClick should be a required function
};

export default Button;
