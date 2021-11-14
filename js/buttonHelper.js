function pressButton(pressedButtonEvent, radioButtonIDs) {
    var pressedButtonID = 
        pressedButtonEvent.target.getAttribute("id");
    if (radioButtonIDs.includes(pressedButtonID)) {
        pressRadioButton(pressedButtonID, radioButtonIDs);
    } else {
        pressToggleButton(pressedButtonID);
    }
}

function pressRadioButton(pressedButtonID, radioButtonIDs) {
    if (pressedButtonID !== "") {
        var pressedButton = 
            document.getElementById(pressedButtonID);
        if ( !isButtonAlreadyPressed(pressedButton) ) {
            changeButtonStateToPressed(pressedButton);
            depressTheOtherRadioButtons(pressedButtonID, radioButtonIDs);
            doActualWorkOfTheButton(pressedButtonID);
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
        doActualWorkOfTheButton(pressedButtonID);
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

function depressTheOtherRadioButtons(pressedButtonID, radioButtonIDs) {
    var depressedButtonIDs = radioButtonIDs.filter(id => 
        id !== pressedButtonID);
    depressedButtonIDs.forEach(id => 
        changeButtonStateToDepressed(document.getElementById(id)));
}

function doActualWorkOfTheButton(pressedButtonID) {
    var video = document.getElementById("video");
    switch (pressedButtonID) {
        case "normal":
            effectFunction = null; break;
        case "western":
            effectFunction = applyWesternEffect; break;
        case "noir":
            effectFunction = applyNoirEffect; break;
        case "scifi":
            effectFunction = applyScifiEffect; break;
        case "play":
            play(video); break;
        case "pause":
            video.pause(); break;
        case "loop":
            video.loop = !video.loop; break;
        case "mute":
            video.muted = !video.muted; break;
        case "video1": case "video2":
            switchVideoTo(pressedButtonID, video); break;
    }
}