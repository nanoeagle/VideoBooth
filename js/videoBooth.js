var demoVideos = {
    video1: "../videos/demovideo1.mp4",
    video2: "../videos/demovideo2.mp4"
};
var effectFunction = applyNothing;

window.onload = () => {
    setDemoVideo();
    setHandlersForButtons();
    setDefaultButtonStates();
}

function setDemoVideo() {
    var video = document.getElementById("video");
    video.src = demoVideos.video1;
    video.load();
    video.onplay = () => applyEffectIfConditionsAreSatisfied(video);
    video.onended = () => changeButtonStateToDepressed(
        document.getElementById("play"));
}

function setHandlersForButtons() {
    var elementInfoArray = [
        {selector: "a.effect", onclickHandler: handleEffect},
        {selector: "a.control", onclickHandler: handleControl},
        {selector: "a.videoSelection", onclickHandler: handleVideoSelection}
    ];
    elementInfoArray.forEach(elementInfo => 
        setOnclickHandlerBy(elementInfo));
}

function setOnclickHandlerBy(elementInfo) {
    document.querySelectorAll(elementInfo.selector)
        .forEach(element => 
            element.onclick = elementInfo.onclickHandler);
}

function setDefaultButtonStates() {
    changeButtonStateToPressed(document.getElementById("video1"));
    changeButtonStateToPressed(document.getElementById("normal"));
}