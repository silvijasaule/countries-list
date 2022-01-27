import React from "react";
import "./button.scss";

export const Button = (props) => {
  const { label, disabled, onClick} = props;

  return (
    <button
      type="button"
      className="button button--medium"
      disabled={disabled}
      onClick={onClick}
    >
      <span className="button__content">
        {label}
      </span>
    </button>
  );
};