var SCREEN_WIDTH = 8
var SCREEN_HEIGHT = 8

Universe = function(player) {
    
    // Set up camera
    
    var aspectRatio = window.innerWidth / window.innerHeight;
    var near = 0.1;
    var far = 1000;
    var cameraScale = 15;
    this.camera = new THREE.OrthographicCamera(
        cameraScale * aspectRatio / - 2, cameraScale * aspectRatio / 2,
        cameraScale / 2, cameraScale / - 2, near, far );
    this.camera.position.z = 5;
	
	var self = this
    
    this.scene = new THREE.Scene();
 
    // Player
    this.player = new Player( this.scene, player);

    var position = GenerateRandomPositionAwayFromPlayer( this.player.mesh.position );
    this.powerUp = new PowerUp(this.scene, position.x, position.y );

    position = GenerateRandomPositionAwayFromPlayer( this.player.mesh.position );
    this.badGuy = new BadGuy(this.scene, position.x, position.y );
    
    this.map = new Map( this.scene );


    this.update = function(counter, delta, keysPressed) {
        
        // handle input
        this.player.setDir( keysPressed );
        this.player.update(delta);
        
        this.badGuy.update(delta);
        
        if ( this.map.detectCollision( this.badGuy.mesh.position, this.badGuy.mesh.scale )) {
              this.badGuy.opposite()
        }
        
        // Collide with map edge
        if ( this.map.detectCollision( this.player.mesh.position, this.player.mesh.scale )) {
            playaBeDeadYo( this.player );
        }
        
        if (this.badGuy.detectCollision( this.player.mesh.position, this.player.mesh.scale)) {
           playaBeDeadYo( this.player );
        }
        
        if (this.powerUp.detectCollision( this.player.mesh.position, this.player.mesh.scale)) {
              this.powerUp.removePowerUp(this.player)
        }
      
        if (counter % this.badGuy.counter == 0) {
              this.badGuy.changeDirection()
        }
    }
    
    this.getScene = function() {
        return this.scene;
    }
    
    this.getCamera = function() {
        return this.camera;
    }

    $(document).bind('powerUpPickUp', function (event, scene, player){
		if (scene == self.scene) {
			var position = GenerateRandomPositionAwayFromPlayer( self.player.mesh.position );
			self.powerUp = new PowerUp(self.scene, position.x, position.y );
		}
        self.player.speedUp();
    });
}

function randomNumberBothWays (max) {
    return Math.floor((Math.random() * max) - max/2) 
}

function GenerateRandomPositionAwayFromPlayer( playerPosition ) {
    var position = { x : 0, y : 0 };
    var minDistance = 2.0;
    do {
        position.x = randomNumberBothWays(SCREEN_WIDTH);
        position.y = randomNumberBothWays(SCREEN_HEIGHT);
    } while ( Math.abs( position.x - playerPosition.x ) < minDistance || Math.abs( position.y - playerPosition.y ) < minDistance );
    return position;
}