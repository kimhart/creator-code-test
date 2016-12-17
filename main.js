var iframe = document.querySelector('iframe');
var player = new Vimeo.Player(iframe);
var addCueButton = document.getElementById('add-cue');
var cueForm = document.getElementById('cue-form');
var submitButton = document.getElementById('submit-cue');
var timeInput = document.getElementById('time-stamp');

player.on('pause', function(){
  getPrettyTime();
  getExactSeconds();
})

player.on('seeked', function(){
  getPrettyTime();
  getExactSeconds();
})

function getExactSeconds() {
  player.getCurrentTime().then(function(seconds) {
    seconds = Math.floor(seconds);
    timeInput.value = seconds;
  }).catch(function(error) {
    console.log(error);
  });
};

function getPrettyTime() {
  var prettyTime;
  player.getCurrentTime().then(function(seconds) {
    seconds = Math.floor(seconds);
    prettyTime = formatSeconds(seconds);
    submitButton.textContent = "Submit Cue at " + prettyTime;
  }).catch(function(error) {
    console.log(error);
  });
};

function formatSeconds(seconds) {
  var minutes;
  var newSeconds;
  if (seconds > 60) {
    minutes = Math.floor(seconds / 60);
    newSeconds = Math.round(((seconds / 60) - minutes) * 60);
    if (newSeconds < 10) {
      return minutes + ":0" + newSeconds;
    } else {
      return minutes + ":" + newSeconds;
    }
  } else {
    if (seconds < 10) {
      return "0:0" + seconds;
    } else {
      return "0:" + seconds;
    }
  }
};


// Submit the cue to the list
cueForm.onsubmit = function(e){
  var message = document.getElementById('message').value;
  var placeholder = document.querySelector('.cue-placeholder');
  var timeStamp = timeInput.value;
  e.preventDefault();
  player.addCuePoint(timeStamp, {
      message: message
  }).then(function(id) {
      getCues();
  }).catch(function(error) {
      console.log(error);
  })
  var cueListContainer = document.getElementById('cue-list-container');
  var newCue = document.createElement('div');
  newCue.innerHTML = ('<div class="cue-body"><div class="cue-message"><span>'+ timeStamp + '</span>' + message + '</div><div class="cue-delete"><i class="material-icons delete">delete_forever</i></div></div>');
  cueListContainer.appendChild(newCue);
  cueForm.reset();
};

function getCues() {
  player.getCuePoints().then(function(cuePoints) {
    cuePoints.forEach(function(cue){
    })
  }).catch(function(error) {
      switch (error.name) {
        case 'UnsupportedError':
          // cue points are not supported with the current player or browser
          break;
        default:
            // some other error occurred
          break;
      }
  });
}



