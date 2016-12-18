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
  var formError = document.querySelector('.form-error');
  var allCues = document.querySelector('.all-cues');
  var timeStamp = timeInput.value;

  if (timeStamp) {

    if (placeholder) {
      placeholder.remove();
    };

    if (allCues) {
      allCues.remove();
    }

    player.addCuePoint(timeStamp, {
        message: message
    }).then(function(id) {
        cueForm.reset();
    }).catch(function(error) {
        console.log(error);
    });

    listCues();

  } else {
    var errorText = document.createTextNode('Please choose a display time for this cue.');
    formError.appendChild(errorText);
    setTimeout(function(){
      formError.classList.add('fadeOutDown');
    }, 2000);

  };
};


function listCues() { 
  var cueListContainer = document.getElementById('cue-list-container');
  player.getCuePoints().then(function(cuePoints) {
    cuePoints.forEach(function(cue){
      var newCue = document.createElement('div');
      newCue.innerHTML = ('<div class="cue-body"><div class="cue-message"><span>'+ formatSeconds(cue.time) + '</span>' + cue.data.message + '</div><div class="cue-delete"><i class="material-icons delete">delete_forever</i></div></div>');
      cueListContainer.appendChild(newCue);
    })
  }).catch(function(error) {
      console.log(error);
  })
};


player.removeCuePoint('09ecf4e4-b587-42cf-ad9f-e666b679c9ab').then(function(id) {
    // cue point was removed successfully
}).catch(function(error) {
    switch (error.name) {
        case 'UnsupportedError':
            // cue points are not supported with the current player or browser
            break;

        case 'InvalidCuePoint':
            // a cue point with the id passed wasn’t found
            break;

        default:
            // some other error occurred
            break;
    }
});





