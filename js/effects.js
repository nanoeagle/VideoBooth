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
            offset: i * 4,
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

function applyWesternEffect(pixelInfo) {
    var baseColor = 
        determineColorForWesternEffectBasedOn(pixelInfo);
    setColorForWesternEffect(pixelInfo, baseColor);
}

function determineColorForWesternEffectBasedOn(pixelInfo) {
    return (3 * pixelInfo.red + 4 * pixelInfo.green 
        + pixelInfo.blue) >>> 3;
}

function setColorForWesternEffect(pixelInfo, baseColor) {
    pixelInfo.enclosingFrameData[pixelInfo.offset] = baseColor + 40;
    pixelInfo.enclosingFrameData[pixelInfo.offset + 1] = baseColor + 20;
    pixelInfo.enclosingFrameData[pixelInfo.offset + 2] = baseColor - 20;
}

function applyNoirEffect(pixelInfo) {
    var color = determineColorForNoirEffectBasedOn(pixelInfo);
    setColorForNoirEffect(pixelInfo, color);
}

function determineColorForNoirEffectBasedOn(pixelInfo) {
    var color = (3 * pixelInfo.red + 4 * pixelInfo.green 
        + pixelInfo.blue) >>> 3;
    return color < 0 ? 0 : color;
}

function setColorForNoirEffect(pixelInfo, color) {
    for (var i = 0; i < 3; i++) 
        pixelInfo.enclosingFrameData[pixelInfo.offset + i] = color;
}

function applyScifiEffect(pixelInfo) {
    var primitiveColors = ["red", "green", "blue"];
    for (var i = 0; i < 3; i++)
        pixelInfo.enclosingFrameData[pixelInfo.offset + i] = 
            Math.round(255 - pixelInfo[primitiveColors[i]]);
}