function main() {
    var doc = app.activeDocument;
    doc.activeLayer = doc.layers[0];
    lock(doc);
}

function lock(set) {
    var layer;
    for (var i = 0; i < set.layers.length; ++i) {
        layer = set.layers[i];
        layer.allLocked = true;
        if (layer.typename === 'LayerSet') {
            lock(layer);
        }
    }
}

main();