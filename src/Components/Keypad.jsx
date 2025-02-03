import React from "react";
import Button from "./Button";
import "../App.css";


function Keypad({ handleButtonClick, handleAC, handlePositiveNegative, handleEqual }) {
  const rows = [
    [
      { value: "AC", onClick: handleAC, className: "grey" },
      { value: "+/-", onClick: handlePositiveNegative, className: "grey" },
      { value: "%", onClick: handleButtonClick, className: "grey" },
      { value: "÷", onClick: handleButtonClick, className: "orange" },
    ],
    [
      { value: "7", onClick: handleButtonClick, className: "" },
      { value: "8", onClick: handleButtonClick, className: "" },
      { value: "9", onClick: handleButtonClick, className: "" },
      { value: "x", onClick: handleButtonClick, className: "orange" },
    ],
    [
      { value: "4", onClick: handleButtonClick, className: "" },
      { value: "5", onClick: handleButtonClick, className: "" },
      { value: "6", onClick: handleButtonClick, className: "" },
      { value: "-", onClick: handleButtonClick, className: "orange" },
    ],
    [
      { value: "1", onClick: handleButtonClick, className: "" },
      { value: "2", onClick: handleButtonClick, className: "" },
      { value: "3", onClick: handleButtonClick, className: "" },
      { value: "+", onClick: handleButtonClick, className: "orange" },
    ],
    [
      { value: ".", onClick: handleButtonClick, className: "" },
      { value: "0", onClick: handleButtonClick, className: "" },
      { value: "=", onClick: handleEqual, className: "equal" },
    ],
  ];

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((button, buttonIndex) => (
            <Button
              key={buttonIndex}
              value={button.value}
              onClick={button.onClick}
              className={button.className}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keypad;
