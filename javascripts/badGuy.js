var BadGuy = function(scene, xPos, yPos) {
	var matMap = THREE.ImageUtils.loadTexture( "images/spider_4.png" );
  var matAnimator = new TextureAnimator(
    matMap, 6, 4, 75 ); // texture, #horiz, #vert, duration.
	var material = new THREE.MeshBasicMaterial({
		map : matMap,
		transparent : true
	});
	var geometry = new THREE.PlaneGeometry( 1, 1 );
	this.mesh = new THREE.Mesh( geometry, material );
	this.mesh.scale.x = 1;
	this.mesh.scale.y = 1;
	scene.add( this.mesh );
	
	this.mesh.position.x = xPos
	this.mesh.position.y = yPos
	this.mesh.z = 0;
	
	this.counter = randomNumber(150)
	
	this.speed = 0.1;
	this.dir = new THREE.Vector2( 1, 0 );
	var direction = null;
	
	this.update = function( delta ) {
		this.mesh.position.x += this.dir.x * this.speed;
		this.mesh.position.y += this.dir.y * this.speed;
    matAnimator.update( 1000 * delta );
	};
	
	this.setDir = function( keysPressed ) {
		if ( keysPressed.left ) {
		  this.dir.x = -1;
		  this.dir.y = 0;
      matAnimator.setPose( 2 );
		  direction = "left"
		} else if ( keysPressed.right ) {
		  this.dir.x = 1;
		  this.dir.y = 0;
      matAnimator.setPose( 1 );
		  direction = "right"
		} else if ( keysPressed.up ) {
		  this.dir.x = 0;
		  this.dir.y = 1;
      matAnimator.setPose( 0 );
		  direction = "up"
		} else if ( keysPressed.down ) {
		  this.dir.x = 0;
		  this.dir.y = -1;
      matAnimator.setPose( 3 );
		  direction = "down"
		}
	};
	
	this.setDir( { right : true } );
	
	this.opposite = function () {
		if (direction == "down") {
			this.setDir( { up : true } );
		} else if (direction == "up") {
			this.setDir( { down : true } );
		} else if (direction == "left") {
			this.setDir( { right : true } );
		} else if (direction == "right") {
			this.setDir( { left : true } );
		} 
		counter = randomNumber(150)
	}
	
	this.detectCollision = function( pos, scale) {
		return pos.x - scale.x / 2 < this.mesh.position.x + this.mesh.scale.x /2 && 
			pos.x + scale.x / 2 > this.mesh.position.x - this.mesh.scale.x /2 &&
			pos.y - scale.y / 2 < this.mesh.position.y + this.mesh.scale.y /2 &&
			pos.y + scale.y / 2 > this.mesh.position.y - this.mesh.scale.y /2		
	};
	
	this.changeDirection = function() {
		this.counter = randomNumber(150)
		var newDirection = randomNumber(4)
		if (newDirection == 1) {
			this.setDir( { up : true } );
		} else if (newDirection == 2) {
			this.setDir( { down : true } );
		} else if (newDirection == 3) {
			this.setDir( { left : true } );
		} else if (newDirection == 4) {
			this.setDir( { right : true } );
		}
	}
}

function randomNumber(max) {
	return Math.ceil((Math.random() * max)) 
}