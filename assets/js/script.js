
// const buttons = document.querySelector(".buttons");
// const display = document.querySelector(".display");
// let buttonsarray = [
//     7, 8, 9, "/", 
//     4, 5, 6, "*", 
//     1, 2, 3, "+", 
//     0, ".", "-", "=",
//     "C",
// ];

// let values = [];
// let cleanvalues;

// for (let i = 0; i < buttonsarray.length; i++) {
//     let button = document.createElement("button");
//     button.textContent = buttonsarray[i];
//     buttons.appendChild(button);
// }

// let calcbuttons = document.querySelectorAll(".buttons button");

// calcbuttons.forEach(item => {
//     item.addEventListener("click", (e) => {
//         calculateArray(e.target.textContent);
//     });
// });

// let calculateArray = (value) => {
//     let cleanvalues; 

//     if (value === "C") {
//         values = [];
//         display.textContent = "0";
//         return;
//     }

//     if (value !== "=") {
//         values.push(value);
//         cleanvalues = values.join("");
//         display.textContent = cleanvalues;
//     } else {
//         let result = eval(cleanvalues);
//         display.textContent = result;
//         values = [];
//     }
// };

// script.js

const buttons = document.getElementById("buttons");
const display = document.getElementById("display");

const calculatorButtons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '+',
    '0', '.', '-', '=',
    'C',
];

let currentInput = '';
let resultDisplayed = false;


calculatorButtons.forEach(value => {
    let button = document.createElement("button");
    button.textContent = value;
    button.addEventListener("click", () => handleButtonClick(value));
    buttons.appendChild(button);
});


const handleButtonClick = (value) => {
    if (resultDisplayed && !isOperator(value)) {
   
        currentInput = value;
        resultDisplayed = false;
    } else {
        currentInput += value;
    }

    if (value === "=") {
        calculateResult();
    } else if (value === "C") {
        clearDisplay();
    } else {
        updateDisplay();
    }
};

const clearDisplay = () => {
    currentInput = '';
    updateDisplay();
};


const updateDisplay = () => {
    display.textContent = currentInput;
};


const calculateResult = () => {
    try {
        let result = evaluateExpression(currentInput);
        display.textContent = result;
        currentInput = result.toString();
        resultDisplayed = true;
    } catch (error) {
        display.textContent = 'Error';
        currentInput = '';
    }
};


const evaluateExpression = (expression) => {
    const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');

   
    if (/[^-()\d/*+.]/.test(sanitizedExpression)) {
        throw new Error('Invalid input');
    }

    return eval(sanitizedExpression);
};


const isOperator = (value) => {
    return ['+', '-', '*', '/'].includes(value);
};
