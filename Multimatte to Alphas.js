function main() {
    var doc = app.activeDocument;
    var targetLayers = getTargetLayers();

    solidColorLayer(0, 0, 0);
    var tmp = doc.activeLayer;
    tmp.move(doc.layers[0], ElementPlacement.PLACEBEFORE);

    var alphaCount = 1;
    for (var target_i = 0; target_i < targetLayers.length; ++target_i) {
        var layer = targetLayers[target_i].duplicate(tmp, ElementPlacement.PLACEBEFORE);
        layer.visible = true;
        for (var channel_i = 0; channel_i < 3; ++channel_i) {
            selectChannel(channel_i);
            saveSelection('mm' + (alphaCount++).toString());
        }
        layer.remove();
    }
    tmp.remove();
    setTargetLayers(targetLayers);
} 

function cTID(id) { return charIDToTypeID(id); }
function sTID(id) { return stringIDToTypeID(id); }

function solidColorLayer(red, green, blue) {
    var desc6 = new ActionDescriptor();
    var ref2 = new ActionReference();
    ref2.putClass(sTID('contentLayer'));
    desc6.putReference(cTID('null'), ref2);
    var desc7 = new ActionDescriptor();
    var desc8 = new ActionDescriptor();
    var desc9 = new ActionDescriptor();
    desc9.putDouble(cTID('Rd  '), red);
    desc9.putDouble(cTID('Grn '), green);
    desc9.putDouble(cTID('Bl  '), blue);
    desc8.putObject(cTID('Clr '), cTID('RGBC'), desc9);
    desc7.putObject(cTID('Type'), sTID('solidColorLayer'), desc8);
    desc6.putObject(cTID('Usng'), sTID('contentLayer'), desc7);
    executeAction(cTID('Mk  '), desc6, DialogModes.NO);
}

function selectChannel(channel) {
    var channelCharId = channel === 0 ? "Rd  " : (channel === 1 ? 'Bl  ' : 'Grn ');
    var desc11 = new ActionDescriptor();
    var ref3 = new ActionReference();
    ref3.putProperty(cTID('Chnl'), cTID('fsel'));
    desc11.putReference(cTID('null'), ref3);
    var ref4 = new ActionReference();
    ref4.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID(channelCharId));
    desc11.putReference(cTID('T   '), ref4);
    executeAction(cTID('setd'), desc11, DialogModes.NO);
}

function saveSelection(name) {
    var desc18 = new ActionDescriptor();
    var ref9 = new ActionReference();
    ref9.putProperty(cTID('Chnl'), cTID('fsel'));
    desc18.putReference(cTID('null'), ref9);
    desc18.putString(cTID('Nm  '), name);
    executeAction(cTID('Dplc'), desc18, DialogModes.NO)
}

function selectLayerByIndex(index, add){
    add = add === undefined ? false : add;
    var ref = new ActionReference();
    ref.putIndex(cTID('Lyr '), index);
    var desc = new ActionDescriptor();
    desc.putReference(cTID('null'), ref );
    if (add) {
        desc.putEnumerated(
            sTID('selectionModifier'), 
            sTID('selectionModifierType'), 
            sTID('addToSelection')
        );
    }
    desc.putBoolean(cTID("MkVs"), false);
    try {
        executeAction(cTID("slct"), desc, DialogModes.NO);
    } catch(e) { }
}

function getTargetLayers() {
    var selectedLayers = [];
    var ref = new ActionReference();
    ref.putEnumerated(cTID('Dcmn'), cTID('Ordn'), cTID('Trgt'));
    var desc = executeActionGet(ref);
    var tlID = sTID('targetLayers');
    if (desc.hasKey(tlID)) {
        desc = desc.getList(tlID);
        for (var i = 0; i < desc.count; ++i) {
            var index = desc.getReference(i).getIndex();
            try {
                activeDocument.backgroundLayer; // jshint ignore: line
            } catch(e) { ++index; }
            selectLayerByIndex(index);
            selectedLayers.push(activeDocument.activeLayer);
        }
    }
    return selectedLayers;
}

function setTargetLayers(layers) {
    var doc = app.activeDocument;
    if (layers.length > 0) {
        var visible = layers[0].visible;
        doc.activeLayer = layers[0];
        layers[0].visible = visible;
    }
    for (var i = 1; i < layers.length; ++i) {
        var index = layers[i].itemIndex;
        try {
            doc.backgroundLayer; // jshint ignore: line
            --index;
        } catch(e) { }
        selectLayerByIndex(index, true);
    }
}

if (app.documents.length > 0)
    app.activeDocument.suspendHistory('Multimatte', 'main();');