var iframe = document.querySelector('iframe');
var player = new Vimeo.Player(iframe);
var addCueButton = document.getElementById('add-cue');
var cueListContainer = document.getElementById('cue-list-container');
var cueForm = document.getElementById('cue-form');
var message = document.getElementById('message').value;
var submitButton = document.getElementById('submit-cue');
var message = document.getElementById('message').value;
var videoTitle = document.querySelector('.title');

player.on('pause', function(){
  getPrettyTime();
})

player.on('seeked', function(){
  getPrettyTime();
})

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
  e.preventDefault();
  player.addCuePoint(12, {
      message: message
  }).then(function(id) {
      getCues();
  }).catch(function(error) {
      switch (error.name) {
          case 'UnsupportedError':
              // cue points are not supported with the current player or browser
              break;
          case 'RangeError':
              // the time was less than 0 or greater than the video’s duration
              break;
          default:
              // some other error occurred
              break;
      }
  });
}

function getCues() {
  player.getCuePoints().then(function(cuePoints) {
      console.log(cuePoints[0].time)
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



