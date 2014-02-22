var Player = function( scene ) {
  var material = new THREE.MeshBasicMaterial({
    color : 0xff0000
  });
  var geometry = new THREE.PlaneGeometry( 1, 1 );
  this.mesh = new THREE.Mesh( geometry, material );
  scene.add( this.mesh );
  
  this.speed = 0.1;
  this.dir = new THREE.Vector2( 1, 0 );
  this.mesh.z = 0;
  
  this.update = function() {
    this.mesh.position.x += this.dir.x * this.speed;
    this.mesh.position.y += this.dir.y * this.speed;
  };
};