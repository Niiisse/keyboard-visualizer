console.log("initialized");

document.addEventListener('keydown', function(event) {
    const key = event.key; // "a", "1", "Shift", etc.
    console.log(key + " down");

    activateButton(key, "blue");
});

document.addEventListener('keyup', function(event) {
    const key = event.key; // "a", "1", "Shift", etc.
    console.log(key + " up");

    deactivateButton(key, "blue");
});

function activateButton(keyName, color) {
    let key = document.getElementById(keyName);

    if (!key.classList.contains("active-blue")) {
        key.classList.add("active-blue");
    }
}

function deactivateButton(keyName, color) {
    let key = document.getElementById(keyName);

    if (key.classList.contains("active-blue")) {
        key.classList.remove("active-blue");
    }
}


// Exceptions:
// ' ' = space
// rCtrl, rAlt, rSuper
