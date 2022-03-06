import OskInterface from "./js/OskInterface.js";
var oskInterface = new OskInterface;

import KeyboardShortcut from "./js/KeyboardShortcut.js";
const keyboardShortcuts = new Array();

import ModifierKeys from "./js/ModifierKeys.js";
const modifierKeys = new ModifierKeys;

function keyDown(key) {
    if (key == "Meta") { key = "Super"; }
    console.log(key + " down");

    // Enable key
    oskInterface.activateButton(key, "active");

    // Keep track of modifier states
    if (isKeyModifier) {
        modifierKeys.setModifier(key, true);
    }

    let notSet = false;
    keyboardShortcuts.forEach(shortcut => {
        // Compare shortcut modifierkeys amount to currently pressed modifierkeys
        if (shortcut.modifierKeys.length == modifierKeys.getModifiersAmount()) {

            // amounts match - compare keys to currently pressed keys
            shortcut.modifierKeys.forEach(modifierKey => {
                if (!modifierKeys.isModifierSet(modifierKey)) {
                    notSet = true;
                }
            });

            if (!notSet) {
                // match!!
                oskInterface.activateButton(shortcut.getKey(), shortcut.getColorData());
            } else {
                if (shortcut.getModifiers().includes(key)) {
                    oskInterface.activateButton(shortcut.getKey(), shortcut.getColorData());
                }
            }
        }
    });

    // Enable shortcuts associated with key
    keyboardShortcuts.forEach(shortcut => {
    });
}

function keyUp(key) {
    if (key == "Meta") { key = "Super"; }
    // console.log(key + " up");

    // Keep track of modifier states
    if (isKeyModifier) {
        modifierKeys.setModifier(key, false);
    }

    // Disable key
    oskInterface.deactivateButton(key, "active");

    // Disable any shortcuts associated with the keyUp
    keyboardShortcuts.forEach(shortcut => {
        if (shortcut.getModifiers().includes(key)) {
            oskInterface.deactivateButton(shortcut.getKey());
        }
    });
}

function isKeyModifier(key) {
    if (key == 'Control' || key == 'Super' || key == 'Alt' || key == 'Shift') {
        return true;
    } else {
        return false;
    }
}

// Keyboard Event Listeners
document.addEventListener('keydown', function(event) {
    const key = event.key; // "a", "1", "Shift", etc.
    keyDown(key);
});

document.addEventListener('keyup', function(event) {
    const key = event.key; // "a", "1", "Shift", etc.
    keyUp(key);
});


// Temp array for testing
keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift"), "o", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift"), "a", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift"), "p", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift"), "n", "default", "Testing"));

keyboardShortcuts.push(new KeyboardShortcut(new Array("Control"), "o", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Control"), "r", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Control"), "h", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Control"), "b", "default", "Testing"));

keyboardShortcuts.push(new KeyboardShortcut(new Array("Alt"), "o", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Alt"), "b", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Alt"), "p", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Alt"), "e", "default", "Testing"));

keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Alt"), "o", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Shift"),"o", "default", "Testing"));

keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift"), "o", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Super", "Shift"), "o", "default", "Testing"));

// keyboardShortcuts.push(new KeyboardShortcut(new Array("Alt"), "l", "default", "Testing", "active-green"));
// keyboardShortcuts.push(new KeyboardShortcut(new Array("Alt"), "m", "default", "Testing", "active-green"));

// keyboardShortcuts.push(new KeyboardShortcut(new Array("Super"), "h", "default", "Testing", "active-red"));
// keyboardShortcuts.push(new KeyboardShortcut(new Array("Super"), "y", "default", "Testing", "active-red"));

// keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift"), "g", "default", "Testing", "active-yellow"));
// keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift"), "o", "default", "Testing", "active-yellow"));
