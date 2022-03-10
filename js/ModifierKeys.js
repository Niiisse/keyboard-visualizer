/**
  * Did not feel like dealing with JS' limited array options
  * Update: array options aren't *as* limited in ECMAscript 6
  * Holds whether modifierkeys are pushed or not
  * TODO: don't write nooby code like this
  * TODO: ^ FIX BY USING ASSOCIATIVE ARRAY!
  * Niisse - 2022/03/06
  * @module ModifierKeys
  */
export default class ModifierKeys {
    constructor() {
        this.control = false;
        this.shift = false;
        this.alt = false;
        this.super = false;
    }

    /**
      * Set value of a modifierKey
      * @param {string} key Which modifier key
      * @param {boolean} value True or false?
      */
    setModifier(key, value) {
        switch (key) {
            case "Control":
                this.control = value;
                break;
            case "Shift":
                this.shift = value;
                break;
            case "Alt":
                this.alt = value;
                break;
            case "Super":
                this.super = value;
                break;
        }
    }

    /**
      * Check if modifier is set
      */
    isModifierSet(key) {
        switch (key) {
            case "Control":
                return this.control;
            case "Shift":
                return this.shift;
            case "Alt":
                return this.alt;
            case "Super":
                return this.super;
        }
    }

    /**
      * Get amount of modifiers pressed
      * @returns int amount
      */
    getModifiersAmount() {
        let amount = 0;
        if (this.control) { amount += 1; }
        if (this.alt) { amount += 1; }
        if (this.super) { amount += 1; }
        if (this.shift) { amount += 1; }

        return amount; 
    }

    debugData() {
        console.info(`control: ${this.control}, shift: ${this.shift}, alt: ${this.alt}, super: ${this.super}`);
    }
}
