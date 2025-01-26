import React from "react";
import "../App.css";

function Screen({ value }){
    return (
        <div className="screen">
            <input type="text" value={value} readOnly 
              ref={(input) => {
                if (input) {
                  input.scrollLeft = input.scrollWidth; // Scroll to right
                }
              }}/>
          </div>
    )
}


export default Screen;