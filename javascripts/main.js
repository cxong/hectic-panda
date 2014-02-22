var scene = new THREE.Scene();


// Set up camera
var SCREEN_WIDTH = 8
var SCREEN_HEIGHT = 8

var aspectRatio = window.innerWidth / window.innerHeight;
var near = 0.1;
var far = 1000;
var camera = new THREE.OrthographicCamera(
  10 * aspectRatio / - 2, 10 * aspectRatio / 2,
  10 / 2, 10 / - 2, near, far );
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set up scene and objects

// Player
var player = new Player( scene );

var powerUp = new PowerUp(scene, SCREEN_WIDTH, SCREEN_HEIGHT);

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
//var dieSound = new Sound( 'sounds/spaceTrash4.mp3' );

// Render loop
var counter = 0;

function render() {
  requestAnimationFrame(render);
  
  // handle input
  if ( keysPressed.left ) {
    player.dir.x = -1;
    player.dir.y = 0;
  } else if ( keysPressed.right ) {
    player.dir.x = 1;
    player.dir.y = 0;
  } else if ( keysPressed.up ) {
    player.dir.x = 0;
    player.dir.y = 1;
  } else if ( keysPressed.down ) {
    player.dir.x = 0;
    player.dir.y = -1;
  }
  keysPressed = {};
  player.update();
  
  // hack to simulate item being eaten
  counter++
  if (counter % 180 == 0) {
	powerUp.removePowerUp()
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
