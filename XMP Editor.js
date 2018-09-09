function main() {
    var layer = app.activeDocument.activeLayer;

    var metadata;
    try {
        metadata = layer.xmpMetadata.rawData;
    } catch(e) {
        metadata = '';
    }

    showUI(metadata);
}

function showUI(metadata) {
    var window = new Window('dialog', 'Layer XMP Metadata');
    var metadataBox = window.add('edittext', undefined, metadata);
    metadataBox.active = true;
    var buttonGroup = window.add('group');
    buttonGroup.orientation = 'row';
    var cancel = buttonGroup.add('button', undefined, 'Cancel');
    var okay = buttonGroup.add('button', undefined, 'OK');

    okay.onClick = function() {
        setMetadata(metadataBox.text);
        window.close();
    }

    window.show();
}

function setMetadata(metadata) {
    var layer = app.activeDocument.activeLayer;
    layer.xmpMetadata.rawData = metadata;
}

main();