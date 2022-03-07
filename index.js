import OskInterface from "./js/OskInterface.js";
var oskInterface = new OskInterface;

import KeyboardShortcut from "./js/KeyboardShortcut.js";
const keyboardShortcuts = new Array();

import ModifierKeys from "./js/ModifierKeys.js";
const modifierKeys = new ModifierKeys;

function keyDown(key) {
    allKeysUp();

    console.log(key + " down");

    // Enable key
    oskInterface.activateButton(key, "active");

    // Keep track of modifier states
    if (isKeyModifier) {
        modifierKeys.setModifier(key, true);
    }

    keyboardShortcuts.forEach(shortcut => {
        // Compare shortcut modifierkeys amount to currently pressed modifierkeys
        let breakMatch = false;
        if (shortcut.modifierKeys.length == modifierKeys.getModifiersAmount()) {
            // amounts match - compare keys to currently pressed keys
            shortcut.modifierKeys.forEach(modifierKey => {
                if (!modifierKeys.isModifierSet(modifierKey)) {
                    breakMatch = true;
                }
            });

            if (!breakMatch) {
                // match, show shortcut
                oskInterface.activateButton(shortcut.getKey(), shortcut.getColorData());
                console.info(`Matched, showing key ${shortcut.modifierKeys} + ${shortcut.getKey()}, ${shortcut.getColorData()}`);
            }
        }
    });
}

function keyUp(key) {
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

function allKeysUp() {
    keyboardShortcuts.forEach(shortcut => {
        keyUp(shortcut.getKey());
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
    let key = event.key; // "a", "1", "Shift", etc.
    if (key == "Meta") { key = "Super"; }
    keyDown(key);
});

document.addEventListener('keyup', function(event) {
    let key = event.key; // "a", "1", "Shift", etc.
    if (key == "Meta") { key = "Super"; }
    keyUp(key);
});


// Temp array for testing
keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift"), "o", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Control"), "o", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Alt"), "o", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Super"), "o", "default", "Testing", "active-red"));

keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Shift"), "o", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Alt"), "o", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Super"), "o", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift", "Alt"), "o", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Super", "Alt"), "o", "default", "Testing"));

keyboardShortcuts.push(new KeyboardShortcut(new Array("Super", "Shift"), "o", "default", "Testing"));
// keyboardShortcuts.push(new KeyboardShortcut(new Array("Super", "Alt"), "u", "default", "Testing"));

keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Super", "Shift"), "o", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Alt", "Shift"), "o", "default", "Testing"));
keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Alt", "Super"), "o", "default", "Testing"));

// keyboardShortcuts.push(new KeyboardShortcut(new Array("Alt"), "l", "default", "Testing", "active-green"));
// keyboardShortcuts.push(new KeyboardShortcut(new Array("Alt"), "m", "default", "Testing", "active-green"));

// keyboardShortcuts.push(new KeyboardShortcut(new Array("Super"), "h", "default", "Testing", "active-red"));

// keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift"), "g", "default", "Testing", "active-yellow"));
// keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift"), "o", "default", "Testing", "active-yellow"));
