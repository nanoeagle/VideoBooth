window.onload = function() {
    var elementInfoArray = [
        {selector: "a.effect", onclickHandler: setEffect},
        {selector: "a.control", onclickHandler: handleControl},
        {selector: "a.videoSelection", onclickHandler: setVideo},
    ];
    elementInfoArray.forEach(elementInfo => 
        setOnclickHandlerBy(elementInfo));
    
    changeButtonStateToPressed(
        document.getElementById("video1"));
    changeButtonStateToPressed(
        document.getElementById("normal"));
}

function setOnclickHandlerBy(elementInfo) {
    document.querySelectorAll(elementInfo.selector)
        .forEach(element => 
            element.onclick = elementInfo.onclickHandler);
}