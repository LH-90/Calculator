import { useState } from "react";
import { calculate } from "../utils/utils";


function useCalculatorLogic() {

  const [value, setValue] = useState("0");
  const [isResult, setIsResult] = useState(false);

  const handleButtonClick = (buttonValue) => {

    if (isResult) {

      if (!isNaN(buttonValue)) {
        setValue(buttonValue); // If result and a number is pressed after, clear the screen and go back to 0
      } else if (buttonValue === ".") {
        setValue("0.");
      } else {
        if (value === "Error") {
          setValue("0"); // Set the value to 0 after an Error result if the button pressed is NaN
        } else {
          setValue(value + buttonValue); // If result and NaN is pressed after, append it to the result
        }
      }

    } else if (value === "0" && (!isNaN(buttonValue) || buttonValue === "-")) {
      setValue(buttonValue); // Replace "0" with the new number

    } else if (buttonValue === "." && /[^\d.]*\d*\.\d*$/.test(value)) {
      setValue(value); // Ignore input . if the current number already has a .

    } else if (buttonValue === "." && /[+\-x÷]/.test(value.slice(-1))) {
      setValue(value + "0."); // Append "0." after an operator

    } else if (isNaN(buttonValue) && isNaN(value.slice(-1))) {
      if (/[+\-x÷]/.test(value.slice(-1))) {
        // Replace the last operator if the new input is also an operator
        setValue(value.slice(0, -1) + buttonValue);
      } else {
        // Ignore replacing an operator with a number
        setValue(value + buttonValue);
      }
      
    } else {
      if (buttonValue === "." && (isNaN(value.slice(-1)) || value === "")) {
        setValue(value + "0."); // Add "0." if "." is pressed after NaN
      } else {
        setValue(value + buttonValue); // Append other characters
      }
    }

    setIsResult(false);

  };


  const handleAC = () => {

    if (isResult) {
      setValue("0"); // Delete the value completely if clicking on AC after =, and go back to 0
      setIsResult(false);

    } else {
      if (value.length === 1) {
        setValue("0"); // Go back to 0 if the last character is deleted
      } else {
        setValue(value.slice(0, -1)); // Delete only the last character if clicking on AC before =
      }
    }
  };


  const handlePositiveNegative = () => {
    
    const regex = /([+\-x÷])?(\(-?\d+(\.\d+)?\)|\d+(\.\d+)?%?)$/; // Match the last operator and the following number
    const match = value.match(regex);
    const operator = match[1] || "";
    const number = match[2];

    if (number.endsWith("%")) {
      const numberWithoutPercentage = parseFloat(number.slice(0, -1)); // Remove %
      if (number.startsWith("(-")) {
        setValue(
          value.replace(regex, `${operator}${numberWithoutPercentage}%`)
        ); // If negative, remove () and - and add %
      } else {
        setValue(
          value.replace(regex, `${operator}(-${numberWithoutPercentage}%)`)
        ); // If positive, add () and - and add %
      }

    } else {
      if (number.startsWith("(-")) {
        const positiveValue = number.slice(2, -1); // If negative, remove () and -
        setValue(value.replace(regex, `${operator}${positiveValue}`));
      } else {
        setValue(value.replace(regex, `${operator}(-${number})`)); // If positive, add () and -
      }
    }
  };


  const handleEqual = () => {
    const result = calculate(value);
    setValue(result);
    setIsResult(true);
  };


  
  return {
    value,
    handleButtonClick,
    handleAC,
    handlePositiveNegative,
    handleEqual,
  };
}

export default useCalculatorLogic;
