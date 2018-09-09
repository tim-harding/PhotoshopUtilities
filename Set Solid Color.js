#include stdlib.js;

function main() {
	if (app.documents.length === 0 ||
		app.activeDocument.activeLayer.kind !== LayerKind.SOLIDFILL
	) return;
	var color = getColor(app.activeDocument.activeLayer);
	var pickerColor = app.foregroundColor;
	app.foregroundColor = color;
	app.showColorPicker();
	setColor(app.activeDocument.activeLayer, app.foregroundColor);
	app.foregroundColor = pickerColor;
}

function setColor(lyr, rgb) {
    var usrLyr = activeDocument.activeLayer;
    activeDocument.activeLayer = lyr;

    var desc = new ActionDescriptor();
	var ref = new ActionReference();
	ref.putEnumerated(sTID('contentLayer'), cTID('Ordn'), cTID('Trgt'));
	desc.putReference(cTID('null'), ref);
	var desc1 = new ActionDescriptor();
	var desc2 = new ActionDescriptor();
	desc2.putDouble(cTID('Rd  '), rgb[0]);
	desc2.putDouble(cTID('Grn '), rgb[1]);
	desc2.putDouble(cTID('Bl  '), rgb[2]);
	desc1.putObject(cTID('Clr '), cTID('RGBC'), desc2);
	desc.putObject(cTID('T   '), sTID('solidColorLayer'), desc1);
	executeAction(cTID('setd'), desc, DialogModes.NO);

    activeDocument.activeLayer = usrLyr;
}

function getColor(lyr) {
    var desc = Stdlib.getLayerDescriptor(activeDocument, lyr);
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

main();