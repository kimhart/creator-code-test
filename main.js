var iframe = document.querySelector('iframe');
var player = new Vimeo.Player(iframe);
var addCueButton = document.getElementById('add-cue');
var cueForm = document.getElementById('cue-form');
var submitButton = document.getElementById('submit-cue');
var timeInput = document.getElementById('time-stamp');

player.on('pause', function(){
  getExactSeconds();
  getPrettyTime();
})

player.on('seeked', function(){
  getExactSeconds();
  getPrettyTime();
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
  player.getCurrentTime().then(function(seconds) {
    seconds = Math.floor(seconds);
    var prettyTime = formatSeconds(seconds);
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


cueForm.onsubmit = function(e){
  e.preventDefault();

  var message = document.getElementById('message').value;
  var placeholder = document.querySelector('.cue-placeholder');
  var cueListContainer = document.getElementById('cue-list-container');
  var newCue = document.createElement('div');
  var formError = document.querySelector('.form-error');
  var timeStamp = timeInput.value;

  if (timeStamp) {

    if (placeholder) {
      placeholder.remove();
    };

    player.addCuePoint(timeStamp, {
        message: message
    }).then(function(id) {
        getCues();
    }).catch(function(error) {
        console.log(error);
    });

    newCue.innerHTML = ('<div class="cue-body"><div class="cue-message"><span>'+ timeStamp + '</span>' + message + '</div><div class="cue-delete"><i class="material-icons delete">delete_forever</i></div></div>');
    cueListContainer.appendChild(newCue);
    cueForm.reset();
    getCues();
  } else {
    var errorText = document.createTextNode('Please choose a display time for this cue.');
    formError.appendChild(errorText);
    setTimeout(function(){
      formError.classList.add('fadeOutDown');
    }, 2000);

  };
};


function getCues() {
  player.getCuePoints().then(function(cuePoints) {
    cuePoints.forEach(function(cue){
      console.log(cue);
    })
  }).catch(function(error) {
      console.log(error);
  });
}



