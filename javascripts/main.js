var scene = new THREE.Scene();
var clock = new THREE.Clock();


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
renderer.autoClear = false;
document.body.appendChild(renderer.domElement);

var splitScreenRenderer = new SplitScreenRenderer();

// Set up scene and objects

var isPlaying = true;

// Player
var player = new Player( scene );

var powerUp = new PowerUp(scene, randomNumberBothWays(SCREEN_WIDTH), randomNumberBothWays(SCREEN_HEIGHT));

var badGuy = new BadGuy(scene, randomNumberBothWays(SCREEN_WIDTH), randomNumberBothWays(SCREEN_HEIGHT));

var map = new Map( scene );


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
var music = new Sound( 'sounds/Orbital Colossus_0.mp3', 0.3 );
var deathMusic = new Sound( 'sounds/Aikys-Dying beast.mp3', 0.3 );
music.play();

// Render loop
var counter = 0;

function render() {
  counter ++
  requestAnimationFrame(render);
  var delta = clock.getDelta();

  if ( !isPlaying ) {
    return;
  }
  
  // handle input
  player.setDir( keysPressed );
  keysPressed = {};
  player.update( delta );
  
  badGuy.update( delta );
  
  if ( map.detectCollision( badGuy.mesh.position, badGuy.mesh.scale )) {
	badGuy.opposite()
  }
  
  // Collide with map edge
  if ( map.detectCollision( player.mesh.position, player.mesh.scale )) {
	playaBeDeadYo()
  }
  
  if (badGuy.detectCollision( player.mesh.position, player.mesh.scale)) {
	playaBeDeadYo()
  }
  
  if (powerUp.detectCollision( player.mesh.position, player.mesh.scale)) {
	powerUp.removePowerUp()
  }
  
  console.log("counter:" + counter + ",badGuy.counter:" + badGuy.counter)
  
  if (counter % badGuy.counter == 0) {
	badGuy.changeDirection()
  }
  
  
  var scenes = [scene, scene, scene, scene];
  var cameras = [camera, camera, camera, camera];
  
  renderer.clear(true);
  
  splitScreenRenderer.render(renderer, scenes, cameras, window.innerWidth, window.innerHeight)
}

function playaBeDeadYo() {
	player.mesh.material.color = 0x000000;
    //dieSound.play();
	music.stop();
	deathMusic.play();
    isPlaying = false;
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
	powerUp = new PowerUp(scene, randomNumberBothWays(SCREEN_WIDTH), randomNumberBothWays(SCREEN_HEIGHT));
  player.speedUp();
  pickupSound.play();
})

function randomNumberBothWays(max) {
	return Math.floor((Math.random() * max) - max/2) 
}

function randomNumber(max) {
	return Math.ceil((Math.random() * max)) 
}
