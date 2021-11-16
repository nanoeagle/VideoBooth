function applyEffectIfConditionsAreSatisfied(video) {
    if (effectFunction.name !== "applyNothing" 
        && !video.paused && !video.ended) 
        applyEffectTo(video);
    setTimeout(applyEffectIfConditionsAreSatisfied, 0, video);   
}

function applyEffectTo(video) {
    var currentFrame = extractCurrentFrameFrom(video);
    applyChosenEffectToEachPixelOf(currentFrame);
    display(currentFrame);
}

function extractCurrentFrameFrom(video) {
    var bufferCanvas = document.getElementById("buffer");
    var bufferContext = bufferCanvas.getContext("2d");
    bufferContext.drawImage(
        video, 0, 0, bufferCanvas.width, bufferCanvas.height);
    var frame = bufferContext.getImageData(
        0, 0, bufferCanvas.width, bufferCanvas.height);
    return frame;
}

function applyChosenEffectToEachPixelOf(frame) {
    // each pixel has four values: RGBA.
    var numberOfPixels = frame.data.length / 4;
    for (var i = 0; i < numberOfPixels; i++) {
        var pixelInfo = {
            pos: i,
            red: frame.data[i * 4 + 0],
            green: frame.data[i * 4 + 1],
            blue: frame.data[i * 4 + 2],
            enclosingFrameData: frame.data
        };
        effectFunction(pixelInfo);
    }
}

function display(frame) {
    document.getElementById("display")
        .getContext("2d").putImageData(frame, 0, 0);
}

function applyNothing() {
    ["buffer", "display"].forEach(canvasName => {
        var canvas = document.getElementById(canvasName);
        canvas.getContext("2d")
            .clearRect(0, 0, canvas.width, canvas.height);
    });
}

function applyWesternEffect(pixelInfo) {}

function applyNoirEffect(pixelInfo) {
    var brightness = 
        determineBrightnessForNoirEffectBasedOn(pixelInfo);
    setBrightness(pixelInfo, brightness);
}

function determineBrightnessForNoirEffectBasedOn(pixelInfo) {
    var brightness = (3 * pixelInfo.red 
        + 4 * pixelInfo.green + pixelInfo.blue) >>> 3;
    if (brightness < 0) brightness = 0;
    return brightness;
}

function setBrightness(pixelInfo, brightness) {
    for (var i = 0; i < 3; i++) 
        pixelInfo.enclosingFrameData[pixelInfo.pos * 4 + i] 
            = brightness;
}

function applyScifiEffect(pixelInfo) {}