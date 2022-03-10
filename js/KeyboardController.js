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
      * @param {string} key the currently pressed key
      */
    keyDown(key) {
        this.allKeysUp();

        this.oskInterface.activateButton(key, ["#eee", "#333"]);

        if (this.isKeyModifier(key)) {
            this.modifierKeys.setModifier(key, true);
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
                this.oskInterface.activateButton(shortcut.getKey(), shortcut.getColorData());
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
      * @param {string} key the currently pressed key
      */
    keyUp(key) {
        if (this.isKeyModifier(key)) {
            this.modifierKeys.setModifier(key, false);
            this.keyboardShortcuts.forEach(shortcut => {
                if (shortcut.getModifiers().includes(key)) {
                    this.oskInterface.deactivateButton(shortcut.getKey());
                }
            });
        }

        this.oskInterface.deactivateButton(key, "active");
    }

    /**
      * Disables each key. Used to make sure there's no ghost keys remaning when
      * pressing additional modifiers
      */
    allKeysUp() {
        this.keyboardShortcuts.forEach(shortcut => {
            this.keyUp(shortcut.getKey());
        });
    }

    /**
      * Checks whether key is a modifier
      *
      * @param {string} key Pressed key
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

        this.keyboardShortcuts.push(new KeyboardShortcut(["Control"], "q", "default", "Close window"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Alt"], "q", "default", "Close window"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Alt"], "a", "default", "Close window"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Control", "Alt"], "q", "default", "Close window"));

        // super
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "q", "default", "Close window"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "Enter", "default", "Launch terminal"));

        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "h", "default", "Focus left"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "j", "default", "Focus down"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "k", "default", "Focus up"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "l", "default", "Focus right"));

        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "b", "default", "Split h"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "v", "default", "Split v"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "m", "default", "Toggle fullscreen"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "s", "default", "Layout: stacked"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "w", "default", "Layout: tabbed"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "e", "default", "Layout: toggle split"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], " ", "default", "Focus mode_toggle"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "a", "default", "Focus parent"));

        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "1", "default", "Switch To Workspace 1"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "2", "default", "Switch To Workspace 2"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "3", "default", "Switch To Workspace 3"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "4", "default", "Switch To Workspace 4"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "5", "default", "Switch To Workspace 5"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "6", "default", "Switch To Workspace 6"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "7", "default", "Switch To Workspace 7"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "8", "default", "Switch To Workspace 8"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "9", "default", "Switch To Workspace 9"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "0", "default", "Switch To Workspace 0"));

        // super + shift
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "1", "default", "Move Window to Workspace 1"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "2", "default", "Move Window to Workspace 2"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "3", "default", "Move Window to Workspace 3"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "4", "default", "Move Window to Workspace 4"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "5", "default", "Move Window to Workspace 5"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "6", "default", "Move Window to Workspace 6"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "7", "default", "Move Window to Workspace 7"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "8", "default", "Move Window to Workspace 8"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "9", "default", "Move Window to Workspace 9"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "0", "default", "Move Window to Workspace 0"));


        this.keyboardShortcuts.push(new KeyboardShortcut(["Control", "Alt"], "t", "default", "Layout: tabbed"));
    }
}
