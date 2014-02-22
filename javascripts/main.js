var scene = new THREE.Scene();


// Set up camera
var SCREEN_WIDTH = 8
var SCREEN_HEIGHT = 8

var aspectRatio = window.innerWidth / window.innerHeight;
var near = 0.1;
var far = 1000;
var cameraScale = 15;
var camera = new THREE.OrthographicCamera(
  cameraScale * aspectRatio / - 2, cameraScale * aspectRatio / 2,
  cameraScale / 2, cameraScale / - 2, near, far );
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up scene and objects

var isPlaying = true;

// Player
var player = new Player( scene );

var powerUp = new PowerUp(scene, randomNumber(SCREEN_WIDTH), randomNumber(SCREEN_HEIGHT));

var map = new Map( scene );


// Keyboard
var keysPressed = {};
document.addEventListener("keydown", onDocumentKeyDown, false);

// 
var Sound = function ( source ) {
  var audio = document.createElement( 'audio' );
  var aSource = document.createElement( 'source' );
  aSource.src = source;
  audio.appendChild( aSource );
  this.play = function () {
    audio.play();
  }
}
//var flapSound = new Sound( 'sounds/phaseJump2.mp3' );
//var passSound = new Sound( 'sounds/powerUp2.mp3' );
var dieSound = new Sound( 'sounds/explosion.ogg' );

// Render loop
var counter = 0;

function render() {
  requestAnimationFrame(render);

  if ( !isPlaying ) {
    return;
  }
  
  // handle input
  player.setDir( keysPressed );
  keysPressed = {};
  player.update();
  
  // hack to simulate item being eaten
  counter++
  if (counter % 180 == 0) {
	powerUp.removePowerUp()
  }
  
  // Collide with map edge
  if ( map.isAtEdge( player.mesh.position, player.mesh.scale ) ) {
    console.log("YOU LOSE");
    player.mesh.material.color = 0x000000;
    dieSound.play();
    isPlaying = false;
  }
  
  renderer.render( scene, camera );
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
	powerUp = new PowerUp(scene, randomNumber(SCREEN_WIDTH), randomNumber(SCREEN_HEIGHT));
})

function randomNumber(max) {
	var number = (Math.random() * max) - max/2
	console.log(number)
	return Math.floor(number) 
}
