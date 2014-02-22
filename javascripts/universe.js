
Universe = function() {
    
    // Set up camera
    var SCREEN_WIDTH = 8
    var SCREEN_HEIGHT = 8
    
    var aspectRatio = window.innerWidth / window.innerHeight;
    var near = 0.1;
    var far = 1000;
    var cameraScale = 15;
    this.camera = new THREE.OrthographicCamera(
        cameraScale * aspectRatio / - 2, cameraScale * aspectRatio / 2,
        cameraScale / 2, cameraScale / - 2, near, far );
    this.camera.position.z = 5;
    
    
    this.scene = new THREE.Scene();
    
    
    function randomNumberBothWays (max) {
        return Math.floor((Math.random() * max) - max/2) 
    }
    
    // Player
    this.player = new Player( this.scene );
    
    this.powerUp = new PowerUp(this.scene, randomNumberBothWays(SCREEN_WIDTH), randomNumberBothWays(SCREEN_HEIGHT));
    
    this.badGuy = new BadGuy(this.scene, randomNumberBothWays(SCREEN_WIDTH), randomNumberBothWays(SCREEN_HEIGHT));
    
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
              this.playaBeDeadYo()
        }
        
        if (this.badGuy.detectCollision( this.player.mesh.position, this.player.mesh.scale)) {
              this.playaBeDeadYo()
        }
        
        if (this.powerUp.detectCollision( this.player.mesh.position, this.player.mesh.scale)) {
              this.powerUp.removePowerUp()
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

    $(this).bind('powerUpPickUp', function (){
        this.powerUp = new PowerUp(this.scene, randomNumberBothWays(SCREEN_WIDTH), randomNumberBothWays(SCREEN_HEIGHT));
        this.player.speedUp();
    })

    this.playaBeDeadYo = function () {
        this.player.mesh.material.color = 0x000000;
        isPlaying = false;
    }
}