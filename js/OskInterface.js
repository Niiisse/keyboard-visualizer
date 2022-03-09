/**
 * On-screen Keyboard Interface
 * Handles interfacing app logic with keyboard
 * Niisse - 2022/03/05
 * @module OskInterface
 */

import KeyboardShortcut from "./KeyboardShortcut.js";

export default class OskInterface {

    /** Apply style changes for activating button on OSK
     * @param {KeyboardShortcut} KeyboardShortcut keyboardShortcut object reference
     * @param {string[]} colorData [0]: highlight color light [1]: highlight color dark
     */
    activateButton(keyObject) {
        try {
            switch (keyObject.key) {
                case "Alt":
                    keyObject.domElement.classList.add("active", "active-green");
                    keyObject.domElement.classList.remove("inactive-alt");
                    break;
                case "Control":
                    keyObject.domElement.classList.add("active", "active-blue");
                    keyObject.domElement.classList.remove("inactive-control");
                    break;
                case "Shift":
                    keyObject.domElement.classList.add("active", "active-yellow");
                    keyObject.domElement.classList.remove("inactive-shift");
                    break;
                case "Super":
                    keyObject.domElement.classList.add("active", "active-red");
                    keyObject.domElement.classList.remove("inactive-super");
                    break;
                default:
                    keyObject.domElement.classList.remove("key-inactive");
                    keyObject.domElement.classList.add("active");

                    keyObject.domElement.style.background = `${keyObject.colorData[0]}`;
                    keyObject.domElement.style.borderColor = `${keyObject.colorData[1]}`;
                    break;
            }
        } catch (error) {
            console.warn("Couldn't activate key '" + keyObject.key + "'");
        }
    }

    /** Apply style changes for deactivating button on OSK
     * @param {KeyboardShortcut} keyObject KeyboardShortcut object reference
     * @param {string} color Classname for applicable color (active-color)
     */
    deactivateButton(keyObject) {
        try {
            switch (keyObject.key) {
                case "Alt":
                    keyObject.domElement.classList.remove("active", "active-green");
                    keyObject.domElement.classList.add("inactive-alt");
                    break;
                case "Control":
                    keyObject.domElement.classList.remove("active", "active-blue");
                    keyObject.domElement.classList.add("inactive-control");
                    break;
                case "Shift":
                    keyObject.domElement.classList.remove("active", "active-yellow");
                    keyObject.domElement.classList.add("inactive-shift");
                    break;
                case "Super":
                    keyObject.domElement.classList.remove("active", "active-red");
                    keyObject.domElement.classList.add("inactive-super");
                    break;
                default:
                    keyObject.domElement.classList.remove("active");
                    keyObject.domElement.classList.add("key-inactive");

                    keyObject.domElement.style.removeProperty("background");
                    keyObject.domElement.style.removeProperty("border-color");
                    break;
            }
        } catch {
            console.warn("Couldn't deactivate key, either");
        }
    }
}
