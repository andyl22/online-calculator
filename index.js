
function setupButtonListeners() {
    let numberButtons = Array.from(document.querySelectorAll("#numbers input"));
    numberButtons.forEach(button => button.addEventListener("click", evalButton));
    let modifierButtons = Array.from(document.querySelectorAll("#modifiers input"));
    modifierButtons.forEach(button => button.addEventListener("click", evalButton));
    let operationButtons = Array.from(document.querySelectorAll("#operations input"));
    operationButtons.forEach(button => button.addEventListener("click", evalButton));
    let submitForm = document.getElementById("calculator");
    displaySum = submitForm.addEventListener("submit", logSubmit);
}

//evaulating the input values by executing multiple if statements, broken apart into separate functions.
// It's then stored into the global string (input) and pushed to an array for later calculation
function evalButton(e){
    const buttonValue = e.path[0].value;
    parseInt(buttonValue) ? lastInput = buttonValue : false; // handle assignment early if int
    if (validationRules(buttonValue)) {
        display.textContent += buttonValue;
        if (storeInput(buttonValue)) {
            input += buttonValue;
        }
    }
    lastInput = buttonValue;
}

function validationRules(buttonValue) {
    if (
    preventDuplicateOperationsandModifiers(buttonValue)
    && checkForExistingDecimal(buttonValue)
    && parenthesisCountLogic(buttonValue)
    ) {
        return true;
    }
}

function preventDuplicateOperationsandModifiers(buttonValue) {
    if (lastInput.match(/[+|\-|*|/]/)) {
        return false;
    } else if (buttonValue == "." && decimalCheck == true) {
        return false;
    } else if (buttonValue == "." && decimalCheck == false) {
        decimalCheck = true;
    }
    return true;
}

function checkForExistingDecimal(buttonValue) {
    if (buttonValue.match(/[+|\-|*|/|(|)]/)) {
        decimalCheck = false;
    }
    return true;
}

function parenthesisCountLogic(buttonValue) {
    if (buttonValue == "(") {
        parenthesisCount++;
    }

    if (buttonValue == ")") {
        if(parenthesisCount>0) {
            parenthesisCount--;
        } else {
            return false;
        }
    }

    return true;
}

function storeInput(buttonValue) {
    if (buttonValue.match(/[+|\-|*|/]/) && lastInput != "") {
        array.push(input);
        array.push(buttonValue);
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

function add (numA, numB) {
    return numA + numB;
}

function subtract (numA, numB) {
    return numA - numB;
}

function multiply (numA, numB) {
    return numA * numB;
}

function divide (numA, numB) {
    return numA / numB;
}

function operate(operation, numA, numB) {
    switch(operation) {
        case("add"):
            console.log(operation, numA, numB);
            return add(numA, numB);
        case("subtract"):
            console.log(operation, numA, numB);
            return subtract(numA, numB);
        case("multiply"):
            console.log(operation, numA, numB);
            return multiply(numA, numB);
        case("divide"):
            console.log(operation, numA, numB);
            return divide(numA, numB);
    }
}

function operatorConversion(operator) {
    return (operator === "+") ? "add"
    : operator === "-" ? "subtract"
    : operator === "*" ? "multiply"
    : "divide";
}

function calculateSum() {
    let rollingCalculation = parseInt(array[0]);
    for(let i = 1; i<array.length; i+=2) {
        let [numA, operator, numB] = [rollingCalculation, array[i], array[i+1]];
        numA = parseInt(numA);
        numB = parseInt(numB);
        operator = operatorConversion(operator);
        rollingCalculation = operate(operator, numA, numB);
    }
    return rollingCalculation;
}

function postCalculationCleanUp(calculation) {
    let display = document.getElementById("display");
    let equation = document.getElementById("equation");
    display.textContent = calculation;
    equation.textContent = array.join("");
    array = [];
    input = calculation;
}

function logSubmit(e) {
    e.preventDefault();
    array.push(input);
    let calculatedNumber = calculateSum();
    postCalculationCleanUp(calculatedNumber);
}


// global variables set up for validations and input storage
let parenthesisCount = 0;
let lastInput = "";
let decimalCheck = false;
let input = "";
let array = [];

// Sets up listeners for all equation building buttons
setupButtonListeners()







