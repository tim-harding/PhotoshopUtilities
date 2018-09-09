function main(flipUp) {
    var doc = activeDocument;
    var layer = doc.activeLayer;
    var parent = layer.parent;
    
    var layerIndex;
    for (var i = 0; i < parent.layers.length; ++i) {
        if (parent.layers[i] == layer) {
            layerIndex = i;
            break;
        }
    }
        
    var nextLayer = layer;
    try {
        nextLayer = parent.layers[layerIndex + (flipUp ? -1 : 1)];
    } catch(e) { return; }

    layer.visible = false;
    nextLayer.visible = true;
    doc.activeLayer = nextLayer;
}
    
main(false);