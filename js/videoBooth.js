window.onload = function() {
    var elementInfoArray = [
        {selector: "a.effect", onclickHandler: setEffect},
        {selector: "a.control", onclickHandler: handleControl},
        {selector: "a.videoSelection", onclickHandler: setVideo},
    ];
    elementInfoArray.forEach(elementInfo => setOnclickHandlerBy(elementInfo));
    
    pushUnpushButtons("video1", []);
    pushUnpushButtons("normal", []);
}

function setOnclickHandlerBy(elementInfo) {
    document.querySelectorAll(elementInfo.selector).forEach(element => 
        element.onclick = elementInfo.onclickHandler);
}

function handleControl(event) {
    var id = event.target.getAttribute("id");
    switch (id) {
        case "play":
            pushUnpushButtons("play", ["pause"]);
            break;
        case "pause":
            pushUnpushButtons("pause", ["play"]);
            break;
        case "loop":
            if (isButtonPushed("loop")) {
                pushUnpushButtons("", ["loop"]);
            } else {
                pushUnpushButtons("loop", []);
            }
            break;
        case "mute":
            if (isButtonPushed("mute")) {
                pushUnpushButtons("", ["mute"]);
            } else {
                pushUnpushButtons("mute", []);
            }
    }
}