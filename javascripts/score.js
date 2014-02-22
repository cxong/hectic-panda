var Score = function() {
  this.value = 0;
  this.scoreText = document.createElement('div');
  this.scoreText.style.position = 'fixed';
  this.scoreText.style.top = 50 + "%";
  this.scoreText.style.left = 50 + "%";
  this.scoreText.innerHTML = this.value;
  //this.scoreText.
  this.scoreText.style.fontFamily = 'Sans-serif';
  this.scoreText.style.color = 'yellow';
  this.scoreText.style.fontSize = "24px";
  document.body.appendChild( this.scoreText );
  
  this.change = function( delta ) {
    this.value += delta;
    this.scoreText.innerHTML = this.value;
  }
  this.set = function( value ) {
    this.value = value;
    this.scoreText.innerHTML = this.value;
  }
}
var score;

var HighScore = function() {
  this.value = getHighScore();
  this.scoreText = document.createElement('div');
  this.scoreText.style.position = 'fixed';
  this.scoreText.style.top = 1 + "%";
  this.scoreText.style.left = 1 + "%";
  this.scoreText.innerHTML = "High Score: " + this.value;
  //this.scoreText.
  this.scoreText.style.fontFamily = 'Sans-serif';
  this.scoreText.style.color = 'yellow';
  this.scoreText.style.fontSize = "24px";
  document.body.appendChild( this.scoreText );
  
  this.set = function( value ) {
    this.value = value;
    this.scoreText.innerHTML = "High Score: " + this.value;
	document.cookie="highScore=" + this.value;
  }
}

function getHighScore() {
	var cookies = document.cookie.split(";")
	var hs = 0
	for (var i = 0;i < cookies.length; ++i) {
		var cookie = {name:cookies[i].split("=")[0], value:cookies[i].split("=")[1]}
		if (cookie.name == "highScore") {
			hs = cookie.value
		}
	}
	return hs;
}

var highScore