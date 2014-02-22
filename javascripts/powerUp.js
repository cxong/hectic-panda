var PowerUp = function(scene, xPos, yPos) {
	//console.log("power up position x=" + xPos + ";y=" + yPos)
	var matMap = THREE.ImageUtils.loadTexture( "images/fruit.png" );
	var material = new THREE.MeshBasicMaterial({
		//color : 0x0000ff,
		map : matMap,
		transparent : true
	});
	var geometry = new THREE.PlaneGeometry( 1, 1 );
	this.mesh = new THREE.Mesh( geometry, material );
	this.mesh.scale.x = 0.5;
	this.mesh.scale.y = 0.5;
	scene.add( this.mesh );
	
	this.mesh.position.x = xPos
	this.mesh.position.y = yPos
	this.mesh.z = 0;
	
	this.detectCollision = function( pos, scale) {
		return pos.x - scale.x / 2 < this.mesh.position.x + this.mesh.scale.x /2 && 
			pos.x + scale.x / 2 > this.mesh.position.x - this.mesh.scale.x /2 &&
			pos.y - scale.y / 2 < this.mesh.position.y + this.mesh.scale.y /2 &&
			pos.y + scale.y / 2 > this.mesh.position.y - this.mesh.scale.y /2		
	};
	
	this.removePowerUp = function() {
		jQuery.event.trigger("powerUpPickUp")
		scene.remove(this.mesh)
	}
}