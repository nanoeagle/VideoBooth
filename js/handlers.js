function handleEffect(event) {
    pressButton(event, 
        ["normal", "western", "noir", "scifi"]);
}

function handleControl(event) {
    pressButton(event, ["play", "pause"]);
}

function handleVideoSelection(event) {
    pressButton(event, ["video1", "video2"]);
}