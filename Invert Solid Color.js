function main() {
    var lyrs = getTargetLayers();
    for (var i = 0; i < lyrs.length; ++i) {
        var lyr = lyrs[i];
        if (lyr.kind == LayerKind.SOLIDFILL) {
            var color = getColor(lyr);
            for (var chan = 0; chan < color.length; ++chan) {
                color[chan] = 255 - color[chan];
            }
            setColor(lyr, color);
        }
    }
    setTargetLayers(lyrs);
}

function cTID(id) { return charIDToTypeID(id); }
function sTID(id) { return stringIDToTypeID(id); }

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
    for (var i = 0; i < layers.length; ++i) {
        var index = layers[i].itemIndex;
        try {
            activeDocument.backgroundLayer; // jshint ignore: line
            --index;
        } catch(e) { }
        selectLayerByIndex(index, true);
    }
}

function getColor(lyr) {
    activeDocument.activeLayer = lyr;

    var ref = new ActionReference();
    ref.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    var desc = executeActionGet(ref);
    var adjs = desc.getList(cTID('Adjs'));
    var clrDesc = adjs.getObjectValue(0);
    var color= clrDesc.getObjectValue(cTID('Clr '));

    var colorNames = ['Rd  ', 'Grn ', 'Bl  '];
    var rgb = [];
    for (var i = 0; i < colorNames.length; i++) {
            rgb.push(Math.round(color.getDouble(cTID(colorNames[i]))));
    }

    return rgb;
}

function setColor(lyr, rgb) {
    activeDocument.activeLayer = lyr;

    var desc1 = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(sTID('contentLayer'), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref);
    var desc2 = new ActionDescriptor();
    var desc3 = new ActionDescriptor();
    desc3.putDouble(cTID('Rd  '), rgb[0]);
    desc3.putDouble(cTID('Grn '), rgb[1]);
    desc3.putDouble(cTID('Bl  '), rgb[2]);
    desc2.putObject(cTID('Clr '), cTID('RGBC'), desc3);
    desc1.putObject(cTID('T   '), sTID('solidColorLayer'), desc2);
    executeAction(cTID('setd'), desc1, DialogModes.NO);
}

activeDocument.suspendHistory('Change Background', 'main();');