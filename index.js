import OskInterface from "./js/OskInterface.js";
var oskInterface = new OskInterface;

import KeyboardShortcut from "./js/KeyboardShortcut.js";
const keyboardShortcuts = new Array();

// Temp array for testing
keyboardShortcuts.push(new KeyboardShortcut(new Array("Control"), "o", "default", "Testing", "active-blue"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Control"), "r", "default", "Testing", "active-blue"));

keyboardShortcuts.push(new KeyboardShortcut(new Array("Alt"), "l", "default", "Testing", "active-green"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Alt"), "m", "default", "Testing", "active-green"));

keyboardShortcuts.push(new KeyboardShortcut(new Array("Super"), "h", "default", "Testing", "active-red"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Super"), "y", "default", "Testing", "active-red"));

keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift"), "g", "default", "Testing", "active-yellow"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift"), "o", "default", "Testing", "active-yellow"));

// Keyboard Event Listeners
document.addEventListener('keydown', function(event) {
    const key = event.key; // "a", "1", "Shift", etc.
    console.log(key + " down");

    oskInterface.activateButton(key, "active-blue");

    keyboardShortcuts.forEach(shortcut => {
        if (shortcut.getModifiers().includes(key)) {
            oskInterface.activateButton(shortcut.getKey(), shortcut.getColor());
        }
    });
});

document.addEventListener('keyup', function(event) {
    const key = event.key; // "a", "1", "Shift", etc.
    console.log(key + " up");

    oskInterface.deactivateButton(key, "active-blue");

    keyboardShortcuts.forEach(shortcut => {
        if (shortcut.getModifiers().includes(key)) {
            oskInterface.deactivateButton(shortcut.getKey(), shortcut.getColor());
        }
    });
});

var xKey = document.getElementById("x");
xKey.style.background = "linear-gradient(135deg, #00ff00 75%, #ff0000 76%)";
