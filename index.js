function add (numA, numB) {
    return (numA + numB);
}

function subtract (numA, numB) {
    return (numA - numB);
}

function multiply (numA, numB) {
    return (numA * numB);
}

function divide (numA, numB) {
    return (numA / numB);
}

function operate(operation, numA, numB) {
    switch(operation) {
        case(add):
            add(numA, numB);
            break;
        case(subtract):
            subtract(numA, numB);
            break;
        case(multiply):
            multiply(numA, numB);
            break;
        case(divide):
            divide(numA, numB);
            break;
    }
}

function evalButton(e){
    const buttonValue = e.path[0].value;
    display.textContent += buttonValue;
    lastInput = buttonValue;
}

function validationRules(value) {
}

function setupButtonListeners() {
    let numberButtons = Array.from(document.querySelectorAll("#numbers input"));
    numberButtons.forEach(button => button.addEventListener("click", evalButton));
    let modifierButtons = Array.from(document.querySelectorAll("#modifiers input"));
    modifierButtons.forEach(button => button.addEventListener("click", evalButton));
    let operationButtons = Array.from(document.querySelectorAll("#operations input"));
    operationButtons.forEach(button => button.addEventListener("click", evalButton));
}

function logSubmit(e) {
    let input = document.getElementById("display");
    console.log(input);
}

let lastInput = "";
setupButtonListeners()
let display = document.getElementById("display");
let form = document.getElementById("calculator");
form.addEventListener("submit", logSubmit);

