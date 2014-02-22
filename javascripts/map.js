var Map = function( scene ) {
  var material = new THREE.MeshBasicMaterial({
    color : 0x003300
  });
  var geometry = new THREE.PlaneGeometry( 1, 1 );
  this.mesh = new THREE.Mesh( geometry, material );
  this.mesh.z = 1;
  this.mesh.scale.x = 16;
  this.mesh.scale.y = 16;
  scene.add( this.mesh );
  
  this.detectCollision = function( pos, scale ) {
    var hitLeft = pos.x - scale.x / 2 < this.mesh.position.x - this.mesh.scale.x / 2;
    var hitBottom = pos.y - scale.y / 2 < this.mesh.position.y - this.mesh.scale.y / 2;
    var hitRight = pos.x + scale.x / 2 > this.mesh.position.x + this.mesh.scale.x / 2;
    var hitTop = pos.y + scale.y / 2 > this.mesh.position.y + this.mesh.scale.y / 2;
    return hitLeft || hitBottom || hitRight || hitTop;
  };
};