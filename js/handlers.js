function setEffect(event) {
    pressButton(event, 
        ["normal", "western", "noir", "scifi"]);
}

function handleControl(event) {
    pressButton(event, ["play", "pause"]);
}

function setVideo(event) {
    pressButton(event, ["video1", "video2"]);
}

function pressButton(pressedButtonEvent, radioButtonIDs) {
    var pressedButtonID = 
        pressedButtonEvent.target.getAttribute("id");
    if (radioButtonIDs.includes(pressedButtonID)) {
        pressRadioButton(pressedButtonID, radioButtonIDs);
    } else {
        pressToggleButton(pressedButtonID);
    }
}