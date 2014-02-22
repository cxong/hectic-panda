var PowerUp = function(scene, xPos, yPos) {
	console.log("power up position x=" + xPos + ";y=" + yPos)
	var matMap = THREE.ImageUtils.loadTexture( "images/shroom.png" );
	var material = new THREE.MeshBasicMaterial({
		map : matMap,
		transparent : true
	});
	var geometry = new THREE.PlaneGeometry( 0.5, 0.5 );
	this.mesh = new THREE.Mesh( geometry, material );
	scene.add( this.mesh );
	
	this.mesh.position.x = xPos
	this.mesh.position.y = yPos
	this.mesh.z = 0;
	
	this.removePowerUp = function() {
		jQuery.event.trigger("powerUpPickUp")
		scene.remove(this.mesh)
	}
}