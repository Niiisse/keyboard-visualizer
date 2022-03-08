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
    constructor(modifierKeys, key, mode, category) {
        this.modifierKeys = modifierKeys;
        this.key = key;
        this.mode = mode;
        this.category = category;
        this.colorData = this.setColorData(this.modifierKeys);
        this.cornerStyling = this.setCornerStyling(this.modifierKeys);
        this.domElement = document.getElementById(this.key);
        this.applyStyling();
    }

    applyStyling() {
        this.domElement.style.background = this.cornerStyling;
    }

    /**
      * TODO: code is good start but mustn't be executed from inside object (multiple shortcuts to each key)
      * TODO: write more detailed descr
      * Set this shortcut's styling based on modifier keys
      * @param {string[]} modifierKeys shortcut's associated modifier keys
      */
    setCornerStyling(modifierKeys) {
        let count = 0;
        let output = "";
        const size = 10;

        modifierKeys.forEach(modifier => {
            switch (modifier) {
                case "Shift":
                    output += `linear-gradient(225deg, ${colors.yellowLight} ${size}%, ${colors.alpha} ${size + 1}%)`;
                    break;
                case "Control":
                output += `linear-gradient(45deg, ${colors.blueLight} ${size}%, ${colors.alpha} ${size + 1}%)`;
                    break;
                case "Super":
                    output += `linear-gradient(135deg, ${colors.redLight} ${size}%, ${colors.alpha} ${size + 1}%)`;
                    break;
                case "Alt":
                    output += `linear-gradient(315deg, ${colors.greenLight} ${size}%, ${colors.alpha} ${size + 1}%)`;
                    break;
                default:
                    break;
            }
            count++;

            if (count != modifierKeys.length) {
                output += ', ';
            } else {
                output += ' ${colors.defaultBackground};';
            }
        });

        console.log(output);
        return output;
    }

    /**
      * Set key's background color as solid color or linear-gradient
      * @param {string[]} modifierKeys array of modifier keys for this shortcut
      * @returns {string[]} css background & border color string
      */
    setColorData(modifierKeys) {
        let colorString = "";
        let borderString = "";
        const colorAngle = `135deg`;

        switch (this.modifierKeys.length) {
            case 0:
                colorString = "#FFFFFF";
                break;
            case 1:
                colorString = `${this.modifierToColor(modifierKeys[0])[0]}`;
                borderString = `${this.modifierToColor(modifierKeys[0])[1]}`;
                break;
            case 2:
                colorString = `linear-gradient(${colorAngle}, ${this.modifierToColor(modifierKeys[0])[0]} 50%, ${this.modifierToColor(modifierKeys[1])[0]} 51%)`;
                borderString = colors.defaultBorder;
                break;
            case 3:
                colorString = `linear-gradient(${colorAngle}, ${this.modifierToColor(modifierKeys[0])[0]} 33%, ${this.modifierToColor(modifierKeys[1])[0]} 34% 65%, ${this.modifierToColor(modifierKeys[2])[0]} 66%)`;
                borderString = colors.defaultBorder;
                break;
            case 4:
                colorString = `linear-gradient(${colorAngle},${this.modifierToColor(modifierKeys[0])[0]} 25%, ${this.modifierToColor(modifierKeys[1])[0]} 26% 50%, ${this.modifierToColor(modifierKeys[2])[0]} 51% 75%,${this.modifierToColor(modifierKeys[3])[0]} 76%`;
                borderString = colors.defaultBorder;
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
            case "Super":
                return new Array(colors.redLight, colors.redDark);
            case "Shift":
                return new Array(colors.yellowLight, colors.yellowDark);
            case "Alt":
                return new Array(colors.greenLight, colors.greenDark);
            case "Control":
                return new Array(colors.blueLight, colors.blueDark);
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
