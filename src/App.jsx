import { useState } from "react";
import { evaluate } from "mathjs";
import "./App.css";
import Screen from "./Components/Screen";
import Keys from "./Components/Keys";

function App() {

  const [value, setValue] = useState("0");
  const [isResult, setIsResult] = useState(false);


  const handleButtonClick = (buttonValue) => {

    if (isResult) {

      if (!isNaN(buttonValue)) {
        setValue(buttonValue);  // If result and a number is pressed after, clear the screen and go back to 0
      } else if (buttonValue === ".") {
        setValue("0."); 
      } else {
          if (value==="Error"){
            setValue("0");  // Set the value to 0 after an Error result if the button pressed is NaN
          } else {
            setValue(value + buttonValue);  // If result and NaN is pressed after, append it to the result
          }
      }
      setIsResult(false);
    } 
    
    else if (value === "0" && (!isNaN(buttonValue)|| buttonValue==="-")) {
      setValue(buttonValue);  // Replace "0" with the new number
      setIsResult(false);
    } 
    
    else if (buttonValue === "." && /[^\d.]*\d*\.\d*$/.test(value)) { 
      setValue(value);  // Ignore input . if the current number already has a .
      setIsResult(false);
    } 

    else if (isNaN(buttonValue) && isNaN(value.slice(-1))) {
      setValue(value.slice(0, -1) + buttonValue); // Replace the last operator
    }
    
    else {
      if (buttonValue === "." && (isNaN(value.slice(-1)) || value === "")) {
        setValue(value + "0.");  // Add "0." if "." is pressed after NaN
      } else {
        setValue(value + buttonValue); // Append other characters
      }
    }

  };


  const handleAC = () => {

    if (isResult) {
      setValue("0"); // Delete the value completely if clicking on AC after =, and go back to 0
      setIsResult(false);

    } else {

      if (value.length===1){
        setValue("0");  // Go back to 0 if the last character is deleted

      } else {
        setValue(value.slice(0, -1)); // Delete only the last character if clicking on AC before =
      }
    }

  };


  const handlePositiveNegative = () => {
    if ((value<0) || (value>0)) {
      setValue(`${-value}`)
    }
    else {
      setValue("0")
    }
  }


  const handleEqual = (expression) => {

    if (expression.includes("x")) { 
      expression = expression.replace(/x/g, "*") // Replace x by * for the calculation
    }

    if (expression.includes("÷")) {
      expression = expression.replace(/÷/g, "/") // Replace ÷ by / for the calculation
    }

    if (/[\/%]0(?!\.)/.test(expression)) { // Match /0 or %0 not followed by a decimal
      setValue("Error") // Display error for division by zero
      setIsResult(true);
    }

    else {
      try {
        const result = evaluate(expression); 
        const fixedResult = parseFloat(result.toFixed(10)); // Fix floating-point issues
        setValue(fixedResult.toString()); 
        setIsResult(true); 
  
      } catch (error) {
        console.error("Invalid expression:", error);  // Display the error in the console
        setValue("Error"); // Display "Error" for invalid expressions
        setIsResult(true);
      }

    }

  };


  return (
      <div className="calculator">
          <Screen value={value} />
          <Keys
            handleButtonClick={handleButtonClick}
            handleAC={handleAC}
            handlePositiveNegative={handlePositiveNegative}
            handleEqual={() => handleEqual(value)}
            value={value}
          />
      </div>
  );


}


export default App;
