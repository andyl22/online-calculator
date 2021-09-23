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
    numA = parseInt(numA);
    numB = parseInt(numB);
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

function evalButton(e){
    const buttonValue = e.path[0].value;
    parseInt(buttonValue) ? lastInput = buttonValue : false; // handle assignment early if int
    if (validationRules(buttonValue)) {
        display.textContent += buttonValue;
        if (parseEquation(buttonValue)) {
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

function parseEquation(buttonValue) {
    if (buttonValue.match(/[+|\-|*|/]/)) {
        array.push(input);
        array.push(buttonValue);
        input = "";
        return false;
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

function setupButtonListeners() {
    let numberButtons = Array.from(document.querySelectorAll("#numbers input"));
    numberButtons.forEach(button => button.addEventListener("click", evalButton));
    let modifierButtons = Array.from(document.querySelectorAll("#modifiers input"));
    modifierButtons.forEach(button => button.addEventListener("click", evalButton));
    let operationButtons = Array.from(document.querySelectorAll("#operations input"));
    operationButtons.forEach(button => button.addEventListener("click", evalButton));
    let submitForm = document.getElementById("calculator");
    submitForm.addEventListener("submit", logSubmit);
}

function logSubmit() {
    let equation = document.getElementById("display").textContent;
    array.push(input);
    sum = parseInt(array[0]);
    for(let i = 1; i<array.length; i+=2) {
        let [numA, operator, numB] = [sum, array[i], array[i+1]];
        operator = operatorConversion(operator);
        sum = operate(operator, numA, numB);
        console.log(sum);
    }
}

function operatorConversion(operator) {
    return (operator === "+") ? "add"
    : operator === "-" ? "subtract"
    : operator === "*" ? "multiply"
    : "divide";
}

// used for input validation checks
let parenthesisCount = 0;
let lastInput = "";
let decimalCheck = false;

// Sets up listeners for all equation building buttons
setupButtonListeners()
let input = "";
let array = [];






