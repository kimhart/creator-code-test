// // Vimeo Player Presets

var iframe = document.querySelector('iframe');
var player = new Vimeo.Player(iframe);

player.on('play', function() {
    console.log('playing!');
});

player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});


// Cue Input Form

var addCueButton = document.getElementById('add-cue');
var cueForm = document.getElementById('cue-form');
var message = document.getElementById('message').value;

addCueButton.addEventListener('click', function(){
  player.pause();
  player.getCurrentTime().then(function(seconds) {
    console.log(Math.floor(seconds));
  }).catch(function(error) {
    console.log(error);
  });

  cueForm.classList.add('cue-form--open', 'fadeInDown');
})

cueForm.onsubmit = function(e){
  e.preventDefault();
  console.log('added cue')
}





