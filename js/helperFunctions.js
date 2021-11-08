function pressRadioButton(pressedButtonID, radioButtonIDs) {
    if (pressedButtonID !== "") {
        var pressedButton = 
            document.getElementById(pressedButtonID);
        if ( !isButtonAlreadyPressed(pressedButton) ) {
            changeButtonStateToPressed(pressedButton);
            var depressedButtonIDs = radioButtonIDs
                .filter(id => id !== pressedButtonID);
            depressedButtonIDs.forEach(id =>
                changeButtonStateToDepressed(
                    document.getElementById(id)));
        }
    }
}

function pressToggleButton(pressedButtonID) {
    if (pressedButtonID !== "") {
        var pressedButton = 
            document.getElementById(pressedButtonID);
        if (isButtonAlreadyPressed(pressedButton))
            changeButtonStateToDepressed(pressedButton);
        else 
            changeButtonStateToPressed(pressedButton);
    }
}

function isButtonAlreadyPressed(button) {
    return button.classList.contains("pressed");
}

function changeButtonStateToPressed(button) {
    button.classList.toggle("pressed", true);
    button.style.backgroundImage = 
        "url(../images/" + button.id + "pressed.png)";
}

function changeButtonStateToDepressed(button) {
    button.classList.toggle("pressed", false);
    button.removeAttribute("style");
}