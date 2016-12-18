var iframe = document.querySelector('iframe');
var player = new Vimeo.Player(iframe);
var addCueButton = document.getElementById('add-cue');
var cueOverlay = document.querySelector('.cue-overlay');
var cueForm = document.getElementById('cue-form');
var submitButton = document.getElementById('submit-cue');
var timeInput = document.getElementById('time-stamp');
var cueListContainer = document.getElementById('cue-list-container');

// On a pause or seek, record times
player.on('pause', function(){
  getExactSeconds();
  getPrettyTime();
})

player.on('seeked', function(){
  getExactSeconds();
  getPrettyTime();
})

 player.on('cuepoint', function(){
  console.log('ok');
  cueOverlay.innerHTML = ("<p>Cue happened!</p>");
  setTimeout(function(){
    cueOverlay.innerHTML = ("");
  }, 2000);
})


// Round down the seconds to a whole number
function getExactSeconds() {
  player.getCurrentTime().then(function(seconds) {
    seconds = Math.floor(seconds);
    timeInput.value = seconds;
  }).catch(function(error) {
    console.log(error);
  });
};

// Pretty-print the time on the submit button
function getPrettyTime() {
  player.getCurrentTime().then(function(seconds) {
    seconds = Math.floor(seconds);
    var prettyTime = formatSeconds(seconds);
    submitButton.textContent = "Submit Cue at " + prettyTime;
  }).catch(function(error) {
    console.log(error);
  });
};

// Format seconds so 21 displays 0:21, 5 displays as 0:05, 62 displays as 1:02, etc.
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

// Handle submission of a new cue
cueForm.onsubmit = function(e){
  e.preventDefault();
  var message = document.getElementById('message').value;
  var placeholder = document.querySelector('.cue-placeholder');
  var formError = document.querySelector('.form-error');
  var allCues = document.querySelector('.all-cues');
  var timeStamp = timeInput.value;
  // If a timestamp is assigned with the video
  if (timeStamp) {
    // if a placeholder exists, remove it 
    if (placeholder) {
      placeholder.remove();
    };
    // add cues to the list + give them IDs
    player.addCuePoint(timeStamp, {
        message: message
    }).then(function(id) {
        cueForm.reset();
    }).catch(function(error) {
        console.log(error);
    });
    // list the cues on the page
    listCues();
  // If a timestamp is not specified, show error
  } else {
    var errorText = document.createTextNode('Please choose a display time for this cue.');
    formError.appendChild(errorText);
    setTimeout(function(){
      formError.classList.add('fadeOutDown');
    }, 2000);
  };
};

// Append all cues to the "Your Cues" list under the video
function listCues() { 
  var allCues = document.querySelector('.all-cues');
  var cueBody = document.querySelectorAll('.cue-body');

  player.getCuePoints().then(function(cuePoints) {
    // If cues exist, loop through them and clear before appending new list
    if (cueBody) {
      cueBody.forEach(function(cue){
        cue.remove();
      })
    };

    // Loop through current cues and append them 
    cuePoints.forEach(function(cue){
      var newCue = document.createElement('div');
      var id = cue.id;
      var message = cue.data.message;
      var time = cue.time;
      // Add cue to 'Your Cues' feed
      newCue.classList.add('cue-body');
      newCue.innerHTML = ('<div class="cue-message"><span>' + formatSeconds(time) + '</span>' + message + '</div><div class="cue-delete"><i  id="'+ id +'" class="material-icons delete">delete_forever</i></div>');
      allCues.appendChild(newCue);
    });
  }).catch(function(error) {
      console.log(error);
  })
};


// Listen for clicks on trash, delete cue, remove from page
function deleteCue(id) {
  player.removeCuePoint(id).then(function(id) {
      console.log('Deleted cue id: ' + id);
  }).catch(function(error) {
      console.log(error);
  });
}

cueListContainer.addEventListener('click', function(e) {
  var cueID = e.target.id;
  deleteCue(cueID);
  listCues();
});





