function switchVideoTo(videoBtnID, video) {
    video.src = demoVideos[videoBtnID];
    video.load();
    changeButtonStateToDepressed(document.getElementById("play"));
    changeButtonStateToDepressed(document.getElementById("pause"));
}