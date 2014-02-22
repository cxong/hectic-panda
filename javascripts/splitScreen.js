
SplitScreenRenderer = function() {
    this.render = function(renderer, scenes, cameras, screenWidth, screenHeight) {
        
        var axisCount = Math.ceil(Math.sqrt(scenes.length));
        var width = screenWidth / axisCount;
        var height = screenHeight / axisCount;
        
        var left = 0;
        var sceneIndex = 0;
        
        for (var i = 0; i < axisCount; ++i, left += width) {
            
            var bottom = 0;
            
            for(var j = 0; j < axisCount; ++j, ++sceneIndex, bottom += height) {
                renderer.setViewport( left, bottom, width, height );
                renderer.render(scenes[sceneIndex], cameras[sceneIndex], null, false);
            }
        }
    }
}