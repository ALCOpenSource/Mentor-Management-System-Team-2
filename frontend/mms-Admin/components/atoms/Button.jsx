import PropTypes from "prop-types";

const generateButtonStyle = (variant, size, bordered) => ({
  ...pickBtnTheme(variant),
  ...generateBtnPadding(size),
  border: bordered ? "1px solid ##058B94" : "none",
  cursor: "pointer",
});

const pickBtnTheme = (variant) => {
  switch (variant) {
    case "light":
      return { backgroundColor: "#E6FDFE" };
    case "dark":
      return { backgroundColor: "#035D63", color: "#ffffff" };
    case "normal":
      return { backgroundColor: "#058B94", color: "#ffffff" };
    case "white":
      return { backgroundColor: "#ffffff" };
    default:
      return { backgroundColor: "transparent" };
  }
};

const generateBtnPadding = (size) => {
  switch (size) {
    case "small":
      return { padding: "8px 16px", borderRadius: "5px", fontSize: "10px" };
    case "large":
      return { padding: "16px 40px", borderRadius: "10px" };
    default:
      return { padding: "1rem", borderRadius: "10px" };
  }
};

export const Button = (props) => {
  return (
    <button {...props} style={generateButtonStyle(props.variant, props.size)}>
      {props.children}
    </button>
  );
};

Button.propTypes = {
  size: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.any,
  onClick: PropTypes.func,
};
