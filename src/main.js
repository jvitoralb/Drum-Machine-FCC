let audioVolume = 0.5;
let audioStatus;
let audioPlayed;
let audioName;

$('#switch').on('click', function(e) {
    let switchBtn = e.target.id;

    if (switchBtn === 'switchOn') {
        $('.drum-pad').on('click', handlePadKey);
        $(document).on('keydown', filterKey);
    } else if (switchBtn === 'switchOff') {
        $('.drum-pad').off('click', handlePadKey);
        $(document).off('keydown', filterKey);
        checkAudioStatus();
        updatePadDisplay('Looking for a tailor?');
    }
})

function filterKey(e) {
    $('.drum-pad').each(function() {
        if (e.key.toUpperCase() === $(this).attr('id')) {
            handlePadKey(e)
        }
    });
}

function handlePadKey(e) {
    let padKey;

    if (e.type === 'keydown') {
        padKey = e.key.toUpperCase();
    } else if (e.type === 'click') {
        padKey = $(this).attr('id');
    }
    checkAudioStatus();
    playAudio(padKey);
}

function playAudio(padClicked) {
    $('.clip').each(function() {
        let padClipId = $(this).attr('id');
        if (padClicked === padClipId) {
            audioName = $(this).attr('value');
            $(this).on('playing ended', updateAudioStatus);
            audioPlayed = $(this).get(0);
            audioPlayed.volume = audioVolume;
            audioPlayed.play();
            return false;
        }
    });
}

$('#volume-control').on('input', function(e) {
    let volume = e.target.value;
    audioVolume = volume / 10;
    audioPlayed.volume = volume / 10;
});

function updateAudioStatus(e) {
    if (e.type === 'playing') {
        audioStatus = true;
        updatePadDisplay(audioName);
    } else if (e.type === 'ended') {
        audioStatus = false;
        updatePadDisplay('Don\'t waste a minute!');
    }
}

function checkAudioStatus() {
    if (audioStatus){
        audioPlayed.pause();
        audioPlayed.currentTime = 0;
    }
}

function updatePadDisplay(content) {
    $('#display-text').html(content);
}

