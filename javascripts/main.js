var scene = new THREE.Scene();


// Set up camera
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

// Player
var player = new Player( scene );

// Map
var map = new Map( scene );

// Keyboard
var keysPressed = {};
document.addEventListener("keydown", onDocumentKeyDown, false);

// Sound
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
function render() {
  requestAnimationFrame(render);
  
  // handle input
  player.setDir( keysPressed );
  keysPressed = {};
  player.update();
  
  // Collide with map edge
  if ( map.isAtEdge( player.mesh.position, player.mesh.scale ) ) {
    console.log("YOU LOSE");
    player.mesh.material.color = 0x000000;
    player.speed *= -1;
    dieSound.play();
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