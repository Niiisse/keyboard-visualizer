import ModifierKeys from "./ModifierKeys.js";
import OskInterface from "./OskInterface.js";
import KeyboardShortcut from "./KeyboardShortcut.js";

/**
  * Keyboard Controller
  * Handles keyboard events
  * TODO: re-scan pressed mofifiers when a key is let go
  * TODO: methods for adding (or potentially removing) KeyboardShortcuts
  * Niisse - 2022-03-08
  * @module KeyboardController
  */
export default class KeyboardController {
   /**
     * @constructor
     * Sets up necessary classes
     */
    constructor() {
        this.modifierKeys = new ModifierKeys();
        this.oskInterface = new OskInterface();
        this.keyboardShortcuts = new Array();
        this.generateTestArray();
    }
    /**
      * Handles key down logic
      * Set active class for pressed button
      * For each keyboardShortcut, see if the associated keys
      * match the currently pressed modifier keys
      * If all match, activate up key on OskInterface
      *
      * @param {KeyboardShortcut} keyObject the currently pressed key
      */
    keyDown(keyObject) {
        this.allKeysUp();

        // this.oskInterface.activateButton(key, "active");

        if (this.isKeyModifier(keyObject.key)) {
            this.modifierKeys.setModifier(keyObject.key, true);
        }

        this.keyboardShortcuts.forEach(shortcut => {
            // Compare shortcut modifierkeys amoutn to currently pressed modifierkeys
            let breakMatch = false;
            // Amounts match -- compare keys to currently pressed keys
            shortcut.modifierKeys.forEach(modifierKey => {
                if (!this.modifierKeys.isModifierSet(modifierKey)) {
                    breakMatch = true;
                }
            });

            if (!breakMatch) {
                // Match! Show shortcut
                this.oskInterface.activateButton(shortcut);
                console.info(`Matched, showing key ${shortcut.modifierKeys} + ${shortcut.getKey()}, ${shortcut.getColorData()}`);
            }
        });
    }
    /**
      * Handles key up event
      * Keeps track of modifier state, if relevant
      * Removes active class from key, scans all keyboardShortcuts and removes
      * active class from relevant keys as well
      * Removes pressed key's active state, just in case
      *
      * @param {string} key - the currently pressed key
      */
    keyUp(keyObject) {
        if (this.isKeyModifier(keyObject.key)) {
            this.modifierKeys.setModifier(keyObject.key, false);
            this.keyboardShortcuts.forEach(shortcut => {
                if (shortcut.getModifiers().includes(keyObject.key)) {
                    this.oskInterface.deactivateButton(shortcut);
                }
            });
        }
        this.oskInterface.deactivateButton(keyObject);
    }

    /**
      * Disables each key. Used to make sure there's no ghost keys remaning when
      * pressing additional modifiers
      */
    allKeysUp() {
        this.keyboardShortcuts.forEach(shortcut => {
            this.keyUp(shortcut);
        });
    }

    /**
      * Checks whether key is a modifier
      *
      * @param {KeyboardShortcut} keyObject the currently pressed key
      * @returns {bool} true or false
      */
    isKeyModifier(key) {
        if (key == 'Control' || key == 'Super' || key == 'Alt' || key == 'Shift') {
            return true;
        } else {
            return false;
        }
    }

    generateTestArray() {
        // Temp array for testing
        this.keyboardShortcuts.push(new KeyboardShortcut(["Shift"], "o", "default", "Testing"));
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

        this.keyboardShortcuts.push(new KeyboardShortcut(["Control", "Super", "Shift", "Alt"], "o", "default", "Testing"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Control", "Alt"], "i", "default", "Testing"));

    }
}
