
var clock = new THREE.Clock();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;
document.body.appendChild(renderer.domElement);

var splitScreenRenderer = new SplitScreenRenderer();

// Set up scene and objects
var gameState;  // start, playing, end
var dieTime;

// Keyboard
var keysPressed = {};
document.addEventListener("keydown", onDocumentKeyDown, false);

// Sound
// Get around Chrome's bs
window.onload = function() {
  var audioContext = new AudioContext();
  // One-liner to resume playback when user interacted with the page.
  document.addEventListener('click', function() {
    audioContext.resume().then(function() {
      if (music.audio.paused) {
        music.play();
      }
    });
  });
}
var Sound = function ( source, volume ) {
  var audio = document.createElement( 'audio' );
  audio.volume = volume;
  var aSource = document.createElement( 'source' );
  aSource.src = source;
  audio.appendChild( aSource );
  this.play = function () {
    audio.load();
    audio.play();
  }
  this.stop = function () {
	audio.pause();
  }
  this.audio = audio;
}
var pickupSound = new Sound( 'sounds/ding.ogg', 1.0 );
var splitSound = new Sound( 'sounds/laser6.mp3', 1.0 );
var music = new Sound( 'sounds/Orbital Colossus_0.ogg', 0.3 );
var deathMusic = new Sound( 'sounds/Aikys-Dying beast.ogg', 0.3 );

var splash = new Splash( "images/logo.png", 400, 231 );
var loseSplash = new Splash( "images/lose.png", 280, 128 );

var almightPlayer = {"mesh": {
						"position": {
							"x" : 0,
							"y" : 0
						}
					 },
					 "speed": 0.11,
					 "dir": new THREE.Vector2( 1, 0 )}



window.addEventListener('resize',
  function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    splash.resize(window.innerWidth, window.innerHeight);
    loseSplash.resize(window.innerWidth, window.innerHeight);
  }, false);

// Render loop
var counter;

var universes;

var score = new Score();
var highScore = new HighScore();

function start() {
  score.hide();
  highScore.hide();
  score.set(0);
  deathMusic.stop();
  music.play();
  gameState = "start";
  dieTime = null;
  counter = 0;
  universes = [new Universe(almightPlayer)];
}

function render() {
  counter ++
  requestAnimationFrame(render);
  var delta = clock.getDelta();

  if ( gameState == "start" ) {
    splash.render( renderer );
    // Check for key presses
    if ( keysPressed.left || keysPressed.right || keysPressed.up || keysPressed.down ) {
      gameState = "playing";
      score.show();
      highScore.show();
    }
    return;
  }
  
  var scenes = [];
  var cameras = [];
  
  if ( gameState == "playing" ) {
    for(var i = 0; i < universes.length; ++i) {
      var universe = universes[i];
      universe.update(counter, delta, keysPressed);
    }
  }
  
  for(var i = 0; i < universes.length; ++i) {
    var universe = universes[i];
    scenes[i] = universe.getScene();
    cameras[i] = universe.getCamera();
  }
  
  renderer.clear(true);
  
  splitScreenRenderer.render(renderer, scenes, cameras, window.innerWidth, window.innerHeight, 16 / 10)
  
  if ( gameState == "end" ) {
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    loseSplash.render( renderer );
	if (score.value > highScore.value) {
		highScore.set(score.value)
	}
    // Check for key presses
    // Wait a while before reloading to prevent reloading immediately
    // because the player is still pressing keys hectically
    var isStillHectic = clock.elapsedTime - dieTime < 0.5;
    var hasPressed = keysPressed.left || keysPressed.right || keysPressed.up || keysPressed.down;
    if ( !isStillHectic && hasPressed ) {
      start();
    }
  }
  
  keysPressed = {};
}

function playaBeDeadYo( player ) {
	player.mesh.material.color = 0x000000;
	music.stop();
	deathMusic.play();
  gameState = "end";
  dieTime = clock.elapsedTime;
}

function onDocumentKeyDown( event ) {
  var keyCode = event.which;
  if ( keyCode == 37 ) {  // left
    keysPressed.left = true;
  } else if ( keyCode == 39 ) { // right
    keysPressed.right = true;
  } else if ( keyCode == 38 ) { // up
    keysPressed.up = true;
  } else if ( keyCode == 40 ) { // down
    keysPressed.down = true;
  } else if ( keyCode == 70 ) { // F
    toggleFullScreen();
  }
}

function toggleFullScreen() {
  if (THREEx.FullScreen.available()) {
    if( THREEx.FullScreen.activated() ){
      THREEx.FullScreen.cancel();
    }else{
      THREEx.FullScreen.request();
    }
  }
}

start();
render();

    $(document).bind('powerUpPickUp', function (event, scene, player){
      pickupSound.play();
	  score.change( 1 );
	  if (score.value > highScore.value) {
		highScore.set(score.value)
	  }
	  if (score.value % 3 == 0)  {
			universes[universes.length] = new Universe(player);
			splitSound.play();
		}
    });
