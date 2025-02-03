import useCalculatorLogic from "./hooks/useCalculatorLogic";
import Screen from "./Components/Screen";
import Keypad from "./Components/Keypad";
import "./App.css";


function App() {
  const { value, handleButtonClick, handleAC, handlePositiveNegative, handleEqual } = useCalculatorLogic();

  return (
    <div className="calculator">
      <Screen value={value} />
      <Keypad 
        handleButtonClick={handleButtonClick} 
        handleAC={handleAC} 
        handlePositiveNegative={handlePositiveNegative} 
        handleEqual={handleEqual} 
      />
    </div>
  );
}


export default App;
