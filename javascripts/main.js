
var clock = new THREE.Clock();
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;
document.body.appendChild(renderer.domElement);

var splitScreenRenderer = new SplitScreenRenderer();

// Set up scene and objects
var gameState = "start";  // start, playing, end

// Keyboard
var keysPressed = {};
document.addEventListener("keydown", onDocumentKeyDown, false);

// 
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
}
var pickupSound = new Sound( 'sounds/ding.ogg', 1.0 );
var dieSound = new Sound( 'sounds/explosion.ogg', 1.0 );
var music = new Sound( 'sounds/Orbital Colossus_0.ogg', 0.3 );
var deathMusic = new Sound( 'sounds/Aikys-Dying beast.ogg', 0.3 );
music.play();

var splash = new Splash( "images/logo.png", 400, 231 );
var loseSplash = new Splash( "images/lose.png", 413, 350 );

// Render loop
var counter = 0;

var universes = [new Universe(),new Universe(),new Universe(),new Universe()];

function render() {
  counter ++
  requestAnimationFrame(render);
  var delta = clock.getDelta();

  if ( gameState == "start" ) {
    splash.render( renderer );
    // Check for key presses
    if ( keysPressed.left || keysPressed.right || keysPressed.up || keysPressed.down ) {
      gameState = "playing";
    }
  } else if ( gameState == "end" ) {
    loseSplash.render( renderer );
    // Check for key presses
    if ( keysPressed.left || keysPressed.right || keysPressed.up || keysPressed.down ) {
      location.reload();
    }
  }
  if ( gameState != "playing" ) {
    return;
  }
  
  var scenes = [];
  var cameras = [];
  
  for(var i = 0; i < universes.length; ++i) {
    var universe = universes[i];
    universe.update(counter, delta, keysPressed);
    scenes[i] = universe.getScene();
    cameras[i] = universe.getCamera();
  }
  
  renderer.clear(true);
  
  splitScreenRenderer.render(renderer, scenes, cameras, window.innerWidth, window.innerHeight)
  
  keysPressed = {};
}

function playaBeDeadYo( player ) {
	player.mesh.material.color = 0x000000;
    //dieSound.play();
	music.stop();
	deathMusic.play();
  gameState = "end";
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
  }
}

render();

    $(document).bind('powerUpPickUp', function (){
      pickupSound.play();
    });
