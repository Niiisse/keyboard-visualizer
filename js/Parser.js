export default class Parser {
    /**
      * Load JSON file, return array of keyboardShortcut data
      * @param {string} filePath - Filepath of JSON file
      * @returns {object
      */

    loadFile(filePath) {
        reader = new FileReader();
        file = File(filePath);
        return this.reader.readAsText(this.file);
    }

    loadJSON() {
        return JSON.parse(`

[ {"modifierKeys": [
            "Alt",
            "Control"
        ],

        "key": "l",
        "mode": "default",
        "name": "LSON larse test"
    },
{"modifierKeys": [
            "Super",
            "Control"
        ],

        "key": "t",
        "mode": "default",
        "name": "JSON parse test"
    }]`);
    }
}
