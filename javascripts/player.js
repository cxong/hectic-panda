var Player = function( scene, copyPlayer ) {
  var matMap = THREE.ImageUtils.loadTexture( "images/Panda_0.png" );
  var matAnimator = new TextureAnimator(
    matMap, 3, 4, 75 ); // texture, #horiz, #vert, duration.
  var material = new THREE.MeshBasicMaterial({
    //color : 0xff0000,
    map : matMap,
    transparent : true
  });
  var geometry = new THREE.PlaneGeometry( 1, 1 );
  this.mesh = new THREE.Mesh( geometry, material );
  if (scene != null) {
	scene.add( this.mesh );
  }
  
  this.speed = copyPlayer.speed;
  this.mesh.position.x = copyPlayer.mesh.position.x
  this.mesh.position.y = copyPlayer.mesh.position.y
  
  this.dir = copyPlayer.dir//new THREE.Vector2( 1, 0 );

  this.setDir = function( keysPressed ) {
    if ( keysPressed.left ) {
      this.dir.x = -1;
      this.dir.y = 0;
      matAnimator.setPose( 0 );
    } else if ( keysPressed.right ) {
      this.dir.x = 1;
      this.dir.y = 0;
      matAnimator.setPose( 1 );
    } else if ( keysPressed.up ) {
      this.dir.x = 0;
      this.dir.y = 1;
      matAnimator.setPose( 2 );
    } else if ( keysPressed.down ) {
      this.dir.x = 0;
      this.dir.y = -1;
      matAnimator.setPose( 3 );
    }
  };
  //this.setDir( { right : true } );
  
  this.speedUp = function() {
    this.speed *= 1.01;
  }
  
  this.update = function( delta ) {
    this.mesh.position.x += this.dir.x * this.speed;
    this.mesh.position.y += this.dir.y * this.speed;
    matAnimator.update( 1000 * delta );
  };
};