var Map = function( scene ) {
  var mapWidth = 16 * 1.4;
  var mapHeight = 10 * 1.4;
	var matMap = THREE.ImageUtils.loadTexture( "images/grass14.png" );
  matMap.wrapS = THREE.RepeatWrapping;
  matMap.wrapT = THREE.RepeatWrapping;
  matMap.repeat.x = mapWidth / 3.0;
  matMap.repeat.y = mapHeight / 3.0;
  var material = new THREE.MeshBasicMaterial({
    //color : 0x003300
    map : matMap
  });
  var geometry = new THREE.PlaneGeometry( 1, 1 );
  this.mesh = new THREE.Mesh( geometry, material );
  this.mesh.z = 1;
  this.mesh.scale.x = mapWidth;
  this.mesh.scale.y = mapHeight;
  scene.add( this.mesh );
  
  this.detectCollision = function( pos, scale ) {
    var hitLeft = pos.x - scale.x / 2 < this.mesh.position.x - this.mesh.scale.x / 2;
    var hitBottom = pos.y - scale.y / 2 < this.mesh.position.y - this.mesh.scale.y / 2;
    var hitRight = pos.x + scale.x / 2 > this.mesh.position.x + this.mesh.scale.x / 2;
    var hitTop = pos.y + scale.y / 2 > this.mesh.position.y + this.mesh.scale.y / 2;
    return hitLeft || hitBottom || hitRight || hitTop;
  };
};