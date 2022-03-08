import ModifierKeys from "./ModifierKeys.js";
import OskInterface from "./OskInterface.js";
import KeyboardShortcut from "./KeyboardShortcut.js";

/**
  * Keyboard Controller
  * Handles keyboard events
  * TODO: re-scan pressed mofifiers when a key is let go
  */
export default class KeyboardController {
    constructor() {
        this.modifierKeys = new ModifierKeys();
        this.oskInterface = new OskInterface();
        this.keyboardShortcuts = new Array();
        this.generateTestArray();
    }

    keyDown(key) {
        this.allKeysUp();

        this.oskInterface.activateButton(key, "active");

        if (this.isKeyModifier(key)) {
            this.modifierKeys.setModifier(key, true);
        }

        this.keyboardShortcuts.forEach(shortcut => {
            // Compare shortcut modifierkeys amoutn to currently pressed modifierkeys
            let breakMatch = false;
            if (shortcut.modifierKeys.length == this.modifierKeys.getModifiersAmount()) {
                // Amounts match -- compare keys to currently pressed keys
                shortcut.modifierKeys.forEach(modifierKey => {
                    if (!this.modifierKeys.isModifierSet(modifierKey)) {
                        breakMatch = true;
                    }
                });

                if (!breakMatch) {
                    // Match! Show shortcut
                    this.oskInterface.activateButton(shortcut.getKey(), shortcut.getColorData());
                    console.info(`Matched, showing key ${shortcut.modifierKeys} + ${shortcut.getKey()}, ${shortcut.getColorData()}`);
                }
            }
        });
    }

    keyUp(key) {
        // Keep track of modifier states
        if (this.isKeyModifier(key)) {
            this.modifierKeys.setModifier(key, false);
        }

        // Disable key
        this.oskInterface.deactivateButton(key, "active");

        // Disable any shortcuts associated with the keyUp
        this.keyboardShortcuts.forEach(shortcut => {
            if (shortcut.getModifiers().includes(key)) {
                this.oskInterface.deactivateButton(shortcut.getKey());
            }
        });
    }

    allKeysUp() {
        this.keyboardShortcuts.forEach(shortcut => {
            this.keyUp(shortcut.getKey());
        });
    }

    isKeyModifier(key) {
        if (key == 'Control' || key == 'Super' || key == 'Alt' || key == 'Shift') {
            return true;
        } else {
            return false;
        }
    }

    generateTestArray() {
        // Temp array for testing
        this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift"), "o", "default", "Testing"));
        this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Control"), "o", "default", "Testing"));
        this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Alt"), "o", "default", "Testing"));
        this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Super"), "o", "default", "Testing", "active-red"));

        this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Shift"), "o", "default", "Testing"));
        this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Alt"), "o", "default", "Testing"));
        this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Super"), "o", "default", "Testing"));
        this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift", "Alt"), "o", "default", "Testing"));
        this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Super", "Alt"), "o", "default", "Testing"));

        this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Super", "Shift"), "o", "default", "Testing"));
        // this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Super", "Alt"), "u", "default", "Testing"));

        this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Super", "Shift"), "o", "default", "Testing"));
        this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Alt", "Shift"), "o", "default", "Testing"));
        this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Alt", "Super"), "o", "default", "Testing"));

        this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Control", "Super", "Shift", "Alt"), "o", "default", "Testing"));

        // this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Alt"), "l", "default", "Testing", "active-green"));
        // this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Alt"), "m", "default", "Testing", "active-green"));

        // this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Super"), "h", "default", "Testing", "active-red"));

        // this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift"), "g", "default", "Testing", "active-yellow"));
        // this.keyboardShortcuts.push(new KeyboardShortcut(new Array("Shift"), "o", "default", "Testing", "active-yellow"));
    }
}
