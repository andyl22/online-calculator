
function setupButtonListeners() {
    let numberButtons = Array.from(document.querySelectorAll("#numbers input"));
    numberButtons.forEach(button => button.addEventListener("click", evalButton));
    let modifierButtons = Array.from(document.querySelectorAll("#modifiers input"));
    modifierButtons.forEach(button => button.addEventListener("click", evalButton));
    let operationButtons = Array.from(document.querySelectorAll("#operations input"));
    operationButtons.forEach(button => button.addEventListener("click", evalButton));
    let submitForm = document.getElementById("calculator");
    submitForm.addEventListener("submit", initiateCalculation);
    let resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", clearAllData);
    let deleteButton = document.getElementById("delete");
    deleteButton.addEventListener("click", deleteLastInput);
    document.addEventListener("keydown", keypress);
}

function keypress(e) {
    let keyInput = e.key;
    if (parseInt(keyInput)+1 || keyInput.match(/[+|\-|*|/|.]/)) {
        processEquationValues(keyInput);
    } else if (keyInput == "Backspace") {
        deleteLastInput();
    } else if (keyInput == "Enter") {
        initiateCalculation(e);
    } else if (keyInput == "Escape") {
        clearAllData();
    }
}

function clearAllData() {
    display.textContent = "";
    equation.textContent = "";
    input = "";
    console.log("test");
}

// delete last input... if input string is completely removed, pop values from the calculation array
function deleteLastInput() {
    if (input.length>0) {
        removeInput();
    } else if (array.length>0) {
        removeArrayAndInitializeInput();
    } else if (array.length==0) {
        input = "";
    }
    let displayText = display.textContent;
    display.textContent = displayText.substring(0, displayText.length -1);
}

function removeInput() {
    lastInput = "";
    input = input.substring(0, input.length -1);
}

function removeArrayAndInitializeInput() {
    lastInput = "";
    let arrayElement = array.pop();
    let arrayElementLength = arrayElement.length;
    arrayElement = arrayElement.substring(0, arrayElementLength -1);
    input = arrayElement;
}

//evaulating the input values by executing multiple if statements, broken apart into separate functions.
// It's then stored into the global string (input) and pushed to an array for later calculation
function evalButton(e) {
    const buttonValue = e.path[0].value;
    processEquationValues(buttonValue);
}

function processEquationValues(inputValue) {
    parseFloat(inputValue) ? lastInput = inputValue : false; // early assignment to bypass repeated opereand check
    if (validationRules(inputValue)) {
        display.textContent += inputValue;
        if (storeInput(inputValue)) {
            input += inputValue;
        }
    }
    lastInput = inputValue;
}

function validationRules(inputValue) {
    if (
        preventDuplicateOperationsandModifiers(inputValue)
        && checkForExistingDecimal(inputValue)
    ) {
        return true;
    }
}

function preventDuplicateOperationsandModifiers(inputValue) {
    if (lastInput.match(operatorsRegex)) {
        return false;
    } else if (inputValue == "." && decimalCheck == true) {
        return false;
    } else if (inputValue == "." && decimalCheck == false) {
        decimalCheck = true;
    }
    return true;
}

function checkForExistingDecimal(inputValue) {
    if (inputValue.match(operatorsRegex)) {
        decimalCheck = false;
    }
    return true;
}

function storeInput(inputValue) {
    if (inputValue.match(operatorsRegex)) {
        if (input) { // this check is needed due to the fact that deleting an operand would set the input to ""
            array.push(input);
        }
        array.push(inputValue);
        input = "";
        console.log(array);
        return false;
    }
    return true;
}

// Input and calculation cleaning, controlled by the "Calculate" button listener. 
// Loops through the array of data stored by the above code and 
// calculates using order of sequence, rather than operations 2 numbers at a time,
// writing to the the calculator with the output and equation

function initiateCalculation(e) {
    e.preventDefault();
    array.push(input);
    let calculatedNumber = calculateResult();
    postCalculationCleanUp(calculatedNumber);
}

function calculateResult() {
    let rollingCalculation = parseFloat(array[0]);
    for (let i = 1; i < array.length; i += 2) {
        let [numA, operator, numB] = [rollingCalculation, array[i], array[i + 1]];
        numA = parseFloat(numA);
        numB = parseFloat(numB);
        operator = operatorConversion(operator);
        rollingCalculation = operate(operator, numA, numB);
    }
    return rollingCalculation;
}

function operatorConversion(operator) {
    return (operator == "+") ? "add"
        : operator == "-" ? "subtract"
            : operator == "*" ? "multiply"
                : "divide";
}

function operate(operation, numA, numB) {
    switch (operation) {
        case ("add"):
            return add(numA, numB);
        case ("subtract"):
            return subtract(numA, numB);
        case ("multiply"):
            return multiply(numA, numB);
        case ("divide"):
            return divide(numA, numB);
    }
}

function add(numA, numB) {
    return Math.round((numA + numB)*1000)/1000;
}

function subtract(numA, numB) {
    return Math.round((numA - numB)*1000)/1000;
}

function multiply(numA, numB) {
    console.log(numA, numB);
    return Math.round((numA * numB)*1000)/1000;
}

function divide(numA, numB) {
    return Math.round((numA / numB)*1000)/1000;
}

function postCalculationCleanUp(calculation) {
    display.textContent = calculation;
    equation.textContent = array.join("");
    array = [];
    input = calculation;
}

// global variables set up for validations and input storage
let display = document.getElementById("display");
let equation = document.getElementById("equation");
let operatorsRegex = (/[+|\-|*|/]/);
let lastInput = "";
let decimalCheck = false;
let input = "";
let array = [];

// Sets up listeners for all equation building buttons
setupButtonListeners()







