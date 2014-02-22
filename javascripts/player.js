var Player = function( scene ) {
  var matMap = THREE.ImageUtils.loadTexture( "images/player.png" );
  var material = new THREE.MeshBasicMaterial({
    //color : 0xff0000,
    map : matMap,
    transparent : true
  });
  var geometry = new THREE.PlaneGeometry( 1, 1 );
  this.mesh = new THREE.Mesh( geometry, material );
  scene.add( this.mesh );
  
  this.speed = 0.1;
  this.dir = new THREE.Vector2( 1, 0 );

  this.setDir = function( keysPressed ) {
    if ( keysPressed.left ) {
      this.dir.x = -1;
      this.dir.y = 0;
      this.mesh.rotation.z = 0.5 * Math.PI;
    } else if ( keysPressed.right ) {
      this.dir.x = 1;
      this.dir.y = 0;
      this.mesh.rotation.z = 1.5 * Math.PI;
    } else if ( keysPressed.up ) {
      this.dir.x = 0;
      this.dir.y = 1;
      this.mesh.rotation.z = 0;
    } else if ( keysPressed.down ) {
      this.dir.x = 0;
      this.dir.y = -1;
      this.mesh.rotation.z = Math.PI;
    }
  };
  this.setDir( { right : true } );
  
  this.update = function() {
    this.mesh.position.x += this.dir.x * this.speed;
    this.mesh.position.y += this.dir.y * this.speed;
  };
};