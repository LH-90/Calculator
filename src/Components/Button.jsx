import React from "react";

function Button({ value, onClick, className = "" }) {
  return (
    <input
      type="button"
      value={value}
      onClick={() => onClick(value)}
      className={className}
    />
  );
}

export default Button;
