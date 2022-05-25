let audioStatus;
let audioPlayed;
let audioName;

$(document).on('keydown', function(e) {
    let keyID = e.key.toUpperCase();
    checkAudioStatus();
    playAudio(keyID);
});

$('.drum-pad').on('click', function() {
    let padID = $(this).attr('id');
    checkAudioStatus();
    playAudio(padID);
});

function playAudio(padClicked) {
    $('.clip').each(function() {
        let padClipId = $(this).attr('id');
        if (padClicked === padClipId) {
            audioName = $(this).attr('value');
            $(this).on('playing ended', updateAudioStatus);
            audioPlayed = $(this).get(0);
            audioPlayed.play();
            return false;
        }
    });
}

function updateAudioStatus(e) {
    if (e.type === 'playing') {
        audioStatus = true;
    } else if (e.type === 'ended') {
        audioStatus = false;
    }
    updatePadDisplay();
}

function checkAudioStatus() {
    if (audioStatus){
        audioPlayed.pause();
        audioPlayed.currentTime = 0;
    }
}

function updatePadDisplay() {
    if (!audioStatus) {
        return $('#display-text').html('Don\'t waste a minute!');
    }
    $('#display-text').html(audioName);
}

