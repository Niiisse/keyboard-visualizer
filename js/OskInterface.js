/**
 * On-screen Keyboard Interface
 * Handles interfacing app logic with keyboard
 * Niisse - 2022/03/05
 * TODO: List all keys bound to a specific key if pressed (call from kbdController with string data)
 * @module OskInterface
 */

export default class OskInterface {
    constructor() {
        this.redLight = "#eb4034";
        this.redDark = "#550000";

        this.yellowLight = "#fce932";
        this.yellowDark = "#786d04";

        this.greenLight = "#6bda2b";
        this.greenDark = "#0c4208";

        this.blueLight = "#2b8eda";
        this.blueDark = "#09204f";

        this.defaultBackground = "#fefefe";
        this.defaultBorder = "#777";
        this.alpha = "#ffffff00";
    }

    /** Apply style changes for activating button on OSK
     * @param {string} keyName Name of pressed key
     * @param {string[]} colorData [0]: highlight color light [1]: highlight color dark
     */
    activateButton(keyName, modifierKeys) {
        let colorData = this.setColorData(modifierKeys);
        try {
            let key = document.getElementById(keyName);

            switch (keyName) {
                case "Alt":
                    key.classList.add("active", "active-green");
                    key.classList.remove("inactive-alt");
                    break;
                case "Control":
                    key.classList.add("active", "active-blue");
                    key.classList.remove("inactive-control");
                    break;
                case "Shift":
                    key.classList.add("active", "active-yellow");
                    key.classList.remove("inactive-shift");
                    break;
                case "Super":
                    key.classList.add("active", "active-red");
                    key.classList.remove("inactive-super");
                    break;
                default:
                    key.classList.remove("key-inactive");
                    key.classList.add("active");

                    key.style.background = `${colorData[0]}`;
                    key.style.borderColor = `${colorData[1]}`;
                    break;
            }
        } catch (error) {
            console.warn("Couldn't activate key '" + keyName + "'");
        }
    }

    /**
     * Apply style changes for deactivating button on OSK
     * @param {string} keyName Name of pressed key
     * @param {string} color Classname for applicable color (active-color)
     */
    deactivateButton(keyName) {
        try {
            let key = document.getElementById(keyName);

            switch (keyName) {
                case "Alt":
                    key.classList.remove("active", "active-green");
                    key.classList.add("inactive-alt");
                    break;
                case "Control":
                    key.classList.remove("active", "active-blue");
                    key.classList.add("inactive-control");
                    break;
                case "Shift":
                    key.classList.remove("active", "active-yellow");
                    key.classList.add("inactive-shift");
                    break;
                case "Super":
                    key.classList.remove("active", "active-red");
                    key.classList.add("inactive-super");
                    break;
                default:
                    key.classList.remove("active");
                    key.classList.add("key-inactive");
                    key.style.removeProperty("background");
                    key.style.removeProperty("border-color");
                    break;
            }
        } catch {
            console.warn("Couldn't deactivate key, either");
        }
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

        switch (modifierKeys.length) {
            case 0:
                colorString = "#FFFFFF";
                break;
            case 1:
                colorString = `${this.modifierToColor(modifierKeys[0])[0]}`;
                borderString = `${this.modifierToColor(modifierKeys[0])[1]}`;
                break;
            case 2:
                colorString = `linear-gradient(${colorAngle}, ${this.modifierToColor(modifierKeys[0])[0]} 50%, ${this.modifierToColor(modifierKeys[1])[0]} 51%)`;
                borderString = this.defaultBorder;
                break;
            case 3:
                colorString = `linear-gradient(${colorAngle}, ${this.modifierToColor(modifierKeys[0])[0]} 33%, ${this.modifierToColor(modifierKeys[1])[0]} 34% 65%, ${this.modifierToColor(modifierKeys[2])[0]} 66%)`;
                borderString = this.defaultBorder;
                break;
            case 4:
                colorString = `linear-gradient(${colorAngle},${this.modifierToColor(modifierKeys[0])[0]} 25%, ${this.modifierToColor(modifierKeys[1])[0]} 26% 50%, ${this.modifierToColor(modifierKeys[2])[0]} 51% 75%,${this.modifierToColor(modifierKeys[3])[0]} 76%`;
                borderString = this.defaultBorder;
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
                return new Array(this.redLight, this.redDark);
            case "Shift":
                return new Array(this.yellowLight, this.yellowDark);
            case "Alt":
                return new Array(this.greenLight, this.greenDark);
            case "Control":
                return new Array(this.blueLight, this.blueDark);
            default:
                return new Array("#ffffff", "#000000");
        }
    }

    /**
      * Set inner HTML of shortcuts name list
      */
    setShortcutNameList(html) {
        let domElement = document.getElementById("shortcuts-name-list");
        domElement.innerHTML = html;
    }
}
