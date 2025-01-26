import React from "react";
import "../App.css";

function Keys({ handleButtonClick, handleAC, handlePositiveNegative, handleEqual, value }){
    return (
        <div>
            <div>
            <input type="button" value="AC" onClick={handleAC} />
            <input
              type="button"
              value="+/-"
              onClick={(e) => handlePositiveNegative(e.target.value)}
            />
            <input
              type="button"
              value="%"
              onClick={(e) => handleButtonClick(e.target.value)}
            />
            <input
              className="orange"
              type="button"
              value="÷"
              onClick={(e) => handleButtonClick(e.target.value)}
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
      </div>
    )
}


export default Keys;