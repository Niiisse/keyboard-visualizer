import Colors from "./Colors.js";
const colors = new Colors();
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
     * @param {string[]} colorData [0] = background color, [1] = border-color (when active)
     */
    constructor(modifierKeys, key, mode, category)  {
        this.modifierKeys = modifierKeys;
        this.key = key;
        this.mode = mode;
        this.category = category;
        this.colorData = this.setColorData(this.modifierKeys);
    }

    /**
      * Set key's background color as solid color or linear-gradient
      * @param {string[]} modifierKeys array of modifier keys for this shortcut
      * @returns {string[]} css background & border color string
      */
    setColorData(modifierKeys) {
        let colorString = "";
        let borderString = "";
        console.info(this.modifierKeys.length);

        switch (this.modifierKeys.length) {
        case 0:
            colorString = "#FFFFFF";
            break;
        case 1:
            colorString = `${this.modifierToColor(modifierKeys[0])[0]}`;
            borderString = `${this.modifierToColor(modifierKeys[0])[1]}`;
            break;
        case 2:
            colorString = `linear-gradient(135deg, ${this.modifierToColor(modifierKeys[0])[0]} 50%, ${this.modifierToColor(modifierKeys[1])[0]} 51%)`;
            borderString = colors.defaultBorder; 
            break;
        case 3:
            colorString = `linear-gradient(135deg, ${this.modifierToColor(modifierKeys[0])[0]} 33%, ${this.modifierToColor(modifierKeys[1])[0]} 34%, ${this.modifierToColor[2][0]} 66%)`;
                borderString = colors.defaultBorder; 
            break;
        case 4:
            break;
        }

        return new Array(colorString, borderString);
    }

    /**
      * Converts modifier string to array of light / dark color
      * @param {string} modifier modifier key
      * @returns string[] light & dark color
      */
    modifierToColor(modifier) {
        switch (modifier) {
        case "Control":
            return new Array(colors.blueLight, colors.blueDark);
        case "Alt":
            return new Array(colors.greenLight, colors.greenDark);
        case "Super":
                return new Array(colors.redLight, colors.redDark);
        case "Shift":
            return new Array(colors.yellowLight, colors.yellowDark);
        default:
            return new Array("#ffffff", "#000000");
        }
    }

    /**
     * Get modifier keys
     * @returns {Array} modifierKeys
     */
    getModifiers() {
        return this.modifierKeys;
    }

    /**
     * Get key
     * @returns {string} key
     */
    getKey() {
        return this.key;
    }

    /**
     * Get color
      * @returns {string} color
      */
    getColor() {
        return this.color;
    }

    /**
     * Get colorData
      * @returns {string[]} colorData
      */
    getColorData() {
        return this.colorData;
    }

}
