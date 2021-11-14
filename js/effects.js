function generateCurrentFrameOf(video) {
    if (video.paused || video.ended) return;
    
    var bufferCanvas = document.getElementById("buffer");
    var bufferContext = bufferCanvas.getContext("2d");
    bufferContext.drawImage(
        video, 0, 0, bufferCanvas.width, bufferCanvas.height);
    var frame = bufferContext.getImageData(
        0, 0, bufferCanvas.width, bufferCanvas.height);
    return frame;
}

function processEachPixelOf(frame) {
    // each pixel has four values: RGBA.
    var numberOfPixels = frame.data.length / 4;
    for (var i = 0; i < numberOfPixels; i++) {
        var pixelInfo = {
            red: frame.data[i * 4 + 0],
            green: frame.data[i * 4 + 1],
            blue: frame.data[i * 4 + 2],
            frameData: frame.data
        };
        addEffectIfChosenBy(pixelInfo);
    }
}

function addEffectIfChosenBy(pixelInfo) {
    if (effectFunction) {
        effectFunction(pixelInfo);
    }
}

function display(frame) {
    document.getElementById("display")
        .getContext("2d").putImageData(frame, 0, 0);
}