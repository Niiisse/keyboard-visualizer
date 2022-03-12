/**
 * Keyboard Shortcut Object
 * @module KeyboardShortcut
 */
export default class KeyboardShortcut {
    /**
     * Keyboard Shortcut object
     * @param  {string[]} modifierKeys stringArray of relevant modifier keys
     * @param {string} key - key name
     * @param {string} mode - mode name
     * @param {string} name - shortcut name
     */
    constructor(modifierKeys, key, mode, name) {
        this.modifierKeys = modifierKeys;
        this.key = key;
        this.mode = mode;
        this.name = name ;
    }
}
