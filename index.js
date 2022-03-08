import KeyboardController from "./js/KeyboardController.js";
const keyboardController = new KeyboardController();

// Keyboard Event Listeners
document.addEventListener('keydown', function(event) {
    let key = event.key; // "a", "1", "Shift", etc.
    if (key == "Meta") { key = "Super"; }
    keyboardController.keyDown(key);
});

document.addEventListener('keyup', function(event) {
    let key = event.key; // "a", "1", "Shift", etc.
    if (key == "Meta") { key = "Super"; }
    keyboardController.keyUp(key);
});
