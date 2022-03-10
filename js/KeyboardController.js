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
      * Sets up necessary classes.
      * keys{} holds keyboardShortcuts sorted per key
      */
    constructor() {
        this.modifierKeys = new ModifierKeys();
        this.oskInterface = new OskInterface();
        this.keyboardShortcuts = new Array();
        this.keys = {};

        this.generateTestArray();
        console.table(this.keys);
    }
    /**
      * Receives pressed key
      *
      * @param {string} key the currently pressed key
      */
    keyDown(key) {

        this.allKeysUp();

        this.oskInterface.activateButton(key, ["#eee", "#333"]);
        this.activateRelatedShortcuts(key);
    }

    /**
      * Actually handles key down logic
      * Set active class for pressed button
      * Is key a modifier?
      * - For each keyboardShortcut, see if the associated keys
      * - match the currently pressed modifier keys
      * - If all match, activate up key on OskInterface
      * Else
      * - Get all KeyboardShortcuts associated with pressed key and show them in list
      *
      * @param {string} key the currently pressed key
      */
    activateRelatedShortcuts(key) {
        let nameList = "";
        if (this.isKeyModifier(key)) {
            this.modifierKeys.setModifier(key, true);

            this.keyboardShortcuts.forEach(shortcut => {
                // Compare shortcut modifierkeys amoutn to currently pressed modifierkeys
                if (shortcut.modifierKeys.length == this.modifierKeys.getModifiersAmount()) {
                    // Amounts match -- compare keys to currently pressed keys
                    let breakMatch = false;
                    shortcut.modifierKeys.forEach(modifierKey => {
                        if (!this.modifierKeys.isModifierSet(modifierKey)) {
                            breakMatch = true;
                        }
                    });

                    if (!breakMatch) {
                        this.oskInterface.activateButton(shortcut.getKey(), shortcut.getColorData());

                        // TODO: move to proper place, hacky naming list
                        nameList += `${shortcut.modifierKeys} + ${shortcut.getKey()}: ${shortcut.name} <br> `;
                    }
                }
            });
        } else {
            // Key isn't a modifier
            if (key in this.keys) {
                this.keys[key].forEach(shortcut => {
                    nameList += `${shortcut.modifierKeys} + ${shortcut.getKey()}: ${shortcut.name} <br> `;
                });
            }
        }

        this.oskInterface.setShortcutNameList(nameList);
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
        this.oskInterface.setShortcutNameList(nameList);
    }

    /**
      * Add KeyboardShortcut to keys{}
      *
      * @param {KeyboardShortcut} shortcut - KeyboardShortcut to be added
      */
    addShortcutToKeys(shortcut) {
        if (shortcut.key in this.keys) {
            this.keys[shortcut.key].push(shortcut);
        } else {
            this.keys[shortcut.key] = [shortcut];
        }
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

    /**
      * Generate temp test array of keyboard shortcuts
      */
    generateTestArray() {
        // Temp array for testing

        this.keyboardShortcuts.push(new KeyboardShortcut(["Control"], "q", "default", "Close window"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Alt"], "q", "default", "Close window"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Alt"], "a", "default", "Close window"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Control", "Alt"], "q", "default", "Close window"));

        // super
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "q", "default", "Close window"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "Enter", "default", "Launch terminal"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "r", "default", "Mode: Resize"));

        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "h", "default", "Focus left"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "j", "default", "Focus down"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "k", "default", "Focus up"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "l", "default", "Focus right"));

        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "ArrowLeft", "default", "Focus left"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "ArrowDown", "default", "Focus down"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "ArrowUp", "default", "Focus up"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super"], "ArrowRight", "default", "Focus right"));

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

        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "h", "default", "Move Window Left"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "j", "default", "Move Window Down"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "k", "default", "Move Window Up"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "l", "default", "Move Window Right"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "ArrowLeft", "default", "Move Window Left"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "ArrowDown", "default", "Move Window Down"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "ArrowUp", "default", "Move Window Up"));
        this.keyboardShortcuts.push(new KeyboardShortcut(["Super", "Shift"], "ArrowRight", "default", "Move Window Right"));

        // Add every shortcut to keymap
        this.keyboardShortcuts.forEach(shortcut => {
            this.addShortcutToKeys(shortcut);
        });
    }
}
