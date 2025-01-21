import { useState } from "react";
import { evaluate } from "mathjs";
import "./App.css";

function App() {

  const [value, setValue] = useState("0");

  const [isResult, setIsResult] = useState(false);

  const handleButtonClick = (buttonValue) => {

    if (isResult) {

      if (!isNaN(buttonValue)) {
        setValue(buttonValue);  // If result and a number is pressed after, clear the screen and go back to 0

      } else {
        setValue(value + buttonValue);  // If result and NaN is pressed after, append it to the result
      }
      setIsResult(false);

    } else if (value === "0" && !isNaN(buttonValue)) {
      setValue(buttonValue);  // Replace "0" with the new number
      setIsResult(false);

    } else if (buttonValue === "." && /[^\d.]*\d*\.\d*$/.test(value)) { 
      setValue(value);  // Ignore input . if the current number already has a .
      

    } else {

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



  const handleEqual = (expression) => {

    if (expression.includes("x")) { 
      expression = expression.replace(/x/g, "*") // Replace x by * for the calculation
    }

    if (expression.includes("÷")) {
      expression = expression.replace(/÷/g, "/") // Replace ÷ by / for the calculation
    }

    try {
      const result = evaluate(expression); 
      const fixedResult = parseFloat(result.toFixed(10)); // Fix floating-point issues
      setValue(fixedResult.toString()); 
      setIsResult(true); 

    } catch (error) {
      console.error("Invalid expression:", error);
      setValue("Error"); // Display "Error" for invalid expressions
      setIsResult(true);
    }

  };

  return (
    <div className="container">
      <div className="calculator">
        <form action="">
          <div className="screen">
            <input type="text" value={value} readOnly 
              ref={(input) => {
                if (input) {
                  input.scrollLeft = input.scrollWidth; // Scroll to right
                }
              }}/>
          </div>
          <div>
            <input type="button" value="AC" onClick={handleAC} />
            <input
              type="button"
              value="+/-"
              onClick={(e) => setValue(`(-${value})`)}
            />
            <input
              type="button"
              value="%"
              onClick={(e) => setValue(value + e.target.value)}
            />
            <input
              className="orange"
              type="button"
              value="÷"
              onClick={(e) => setValue(value + e.target.value)}
            />
          </div>
          <div>
            <input
              type="button" 
              value="7"
              onClick={(e) => handleButtonClick(e.target.value)}
            />
            <input
              type="button"
              value="8"
              onClick={(e) => handleButtonClick(e.target.value)}
            />
            <input
              type="button"
              value="9"
              onClick={(e) => handleButtonClick(e.target.value)}
            />
            <input
              className="orange"
              type="button"
              value="x"
              onClick={(e) => handleButtonClick(e.target.value)}
            />
          </div>
          <div>
            <input
              type="button"
              value="4"
              onClick={(e) => handleButtonClick(e.target.value)}
            />
            <input
              type="button"
              value="5"
              onClick={(e) => handleButtonClick(e.target.value)}
            />
            <input
              type="button"
              value="6"
              onClick={(e) => handleButtonClick(e.target.value)}
            />
            <input
              className="orange"
              type="button"
              value="-"
              onClick={(e) => handleButtonClick(e.target.value)}
            />
          </div>
          <div>
            <input
              type="button"
              value="1"
              onClick={(e) => handleButtonClick(e.target.value)}
            />
            <input
              type="button"
              value="2"
              onClick={(e) => handleButtonClick(e.target.value)}
            />
            <input
              type="button"
              value="3"
              onClick={(e) => handleButtonClick(e.target.value)}
            />
            <input
              className="orange"
              type="button"
              value="+"
              onClick={(e) => handleButtonClick(e.target.value)}
            />
          </div>
          <div>
            <input
              type="button"
              value="."
              onClick={(e) => handleButtonClick(e.target.value)}
            />
            <input
              type="button"
              value="0"
              onClick={(e) => handleButtonClick(e.target.value)}
            />
            <input
              className="equal"
              type="button"
              value="="
              onClick={() => handleEqual(value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
}



export default App;
