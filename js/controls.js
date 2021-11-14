function play(video) {
    if (video.ended) video.load();
    video.play();
}