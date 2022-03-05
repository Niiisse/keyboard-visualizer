/**
 * Keyboard Shortcut Object
 * @module KeyboardShortcut
 */
export default class KeyboardShortcut {
    /**
     * Keyboard Shortcut object
     * @param  {string[]} modifierKeys stringArray of relevant modifier keys
     * @param {string} key key name
     * @param {string} mode mode name
     * @param {string} category category name
     * @param {string} color temp color input
     */
    constructor(modifierKeys, key, mode, category, color) {
        this.modifierKeys = modifierKeys;
        this.key = key;
        this.mode = mode;
        this.category = category;

        // TODO: write logic for color depending on modifiers
        this.color = color;
    }

    /** Get modifier keys
     * @return {Array} modifierKeys
     */
    getModifiers() {
        return this.modifierKeys;
    }

    /** Get key
     * @return {string} key
     */
    getKey() {
        return this.key;
    }

    /** Get color
      * @return {string} key
      */
    getColor() {
        return this.color;
    }
}
