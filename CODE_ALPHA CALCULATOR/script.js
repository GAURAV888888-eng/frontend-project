const displayResult = document.getElementById('result');
const displayHistory = document.getElementById('history');

let currentInput = '0';
let historyInput = '';
let evaluated = false;

// Append digits and operators
function appendInput(value) {
  if (evaluated && !isOperator(value)) {
    currentInput = value;
    evaluated = false;
  } else {
    if (currentInput === '0' && value !== '.') {
      currentInput = value;
    } else {
      currentInput += value;
    }
    evaluated = false;
  }
  updateDisplay();
}

function isOperator(char) {
  return ['+', '-', '*', '/', '%'].includes(char);
}

// Clear all inputs
function clearAll() {
  currentInput = '0';
  historyInput = '';
  evaluated = false;
  updateDisplay();
}

// Delete last character
function deleteLast() {
  if (evaluated) {
    clearAll();
    return;
  }
  if (currentInput.length === 1) {
    currentInput = '0';
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

// Perform calculation
function calculate() {
  try {
    let expression = currentInput.replace(/÷/g, '/').replace(/×/g, '*');
    historyInput = currentInput;
    
    // Evaluate math safely
    let result = Function(`'use strict'; return (${expression})`)();
    
    if (isNaN(result) || !isFinite(result)) {
      currentInput = 'Error';
    } else {
      currentInput = String(result);
    }
    
    evaluated = true;
  } catch (error) {
    currentInput = 'Error';
  }
  updateDisplay();
}

// Refresh UI screen
function updateDisplay() {
  displayResult.innerText = currentInput;
  displayHistory.innerText = historyInput;
}

// Keyboard Support (Bonus Feature)
document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (!isNaN(key) || key === '.') {
    appendInput(key);
  } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    appendInput(key);
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key === 'Escape') {
    clearAll();
  } else if (key === '%') {
    appendInput('%');
  }
});