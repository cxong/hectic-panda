
SplitScreenRenderer = function() {
    this.render = function(renderer, scenes, cameras, screenWidth, screenHeight, desiredAspectRatio) {
        
        var xAxisCount = Math.ceil(Math.sqrt(scenes.length));
        var width = screenWidth / xAxisCount;
        
        var yAxisCount;
        var height;
        
        if(scenes.length <= (xAxisCount * (xAxisCount - 1))) {
            yAxisCount = xAxisCount - 1;
        } else {
            yAxisCount = xAxisCount;
        }
        
        height = screenHeight / yAxisCount;
        
        var aspectRatio = width / height;
        
        if (aspectRatio > desiredAspectRatio) {
            width = height * desiredAspectRatio;
        } else {
            height = width / desiredAspectRatio;
        }
        
        
        var sceneIndex = 0;
        
            
        var bottom = (screenHeight - height * yAxisCount) / 2;
        
        for(var j = 0; j < yAxisCount && sceneIndex < scenes.length; ++j, bottom += height) {
            
            var left = (screenWidth - width * xAxisCount) / 2;
        
            for (var i = 0; i < xAxisCount && sceneIndex < scenes.length; ++i, ++sceneIndex, left += width) {
                renderer.setViewport( left, bottom, width, height );
                renderer.render(scenes[sceneIndex], cameras[sceneIndex], null, false);
            }
        }
    }
}