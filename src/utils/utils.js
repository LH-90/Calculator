import { evaluate } from "mathjs";

function calculate(expression) {

    const newExpression = expression
    .replace(/x/g, "*") // Replace x by * for the calculation
    .replace(/÷/g, "/"); // Replace ÷ by / for the calculation

  if (/\d+[\/%]0+(?:\.0+)?(?:[^.\d]|$)/.test(newExpression)) {  // Match 0, 00, 0.0, 0.000...
    return "Error";  // Display error for division by zero and stop further execution
  }

  try {
    const result = evaluate(newExpression);
    return parseFloat(result.toFixed(10)).toString();  // Fix floating-point issues
  } catch {
    return "Error"; // Handle invalid expressions
  }
}


export default calculate;
