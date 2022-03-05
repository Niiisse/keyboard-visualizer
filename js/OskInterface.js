/**
 * On-screen Keyboard Interface
 * Handles interfacing app logic with keyboard
 * Niisse - 2022/03/05
 * @module OskInterface
 */

export default class OskInterface {

    /** Apply style changes for activating button on OSK
     * @param {string} keyName Name of pressed key
     * @param {string} color Classname for applicable color (active-color)
     */
    activateButton(keyName, color) {
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
                if (!key.classList.contains("active", color)) {
                    key.classList.add("active", color);
                }
                break;
        }
    }

    /** Apply style changes for deactivating button on OSK
     * @param {string} keyName Name of pressed key
     * @param {string} color Classname for applicable color (active-color)
     */
    deactivateButton(keyName, color) {
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
                if (key.classList.contains("active", color)) {
                    key.classList.remove("active", color);
                }
                break;
        }
    }
}
