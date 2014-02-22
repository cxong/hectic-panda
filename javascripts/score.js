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