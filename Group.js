function main() {
    var doc = activeDocument;
    group();
    var grp = doc.activeLayer;
    var lyr = grp.layers[0];
    grp.name = lyr.name;
    if (grp.layers.length == 1) {
        grp.opacity = lyr.opacity;
        lyr.opacity = 100;
        if (lyr.blendMode != BlendMode.NORMAL) {
      	    grp.blendMode = lyr.blendMode;
      	    lyr.blendMode = BlendMode.NORMAL;
      	}
    }
}
  
function group() {
    var idMk = charIDToTypeID( "Mk  " );
    var desc8 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref2 = new ActionReference();
    var idlayerSection = stringIDToTypeID( "layerSection" );
    ref2.putClass( idlayerSection );
    desc8.putReference( idnull, ref2 );
    var idFrom = charIDToTypeID( "From" );
    var ref3 = new ActionReference();
    var idLyr = charIDToTypeID( "Lyr " );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idTrgt = charIDToTypeID( "Trgt" );
    ref3.putEnumerated( idLyr, idOrdn, idTrgt );
    desc8.putReference( idFrom, ref3 );
    var idlayerSectionStart = stringIDToTypeID( "layerSectionStart" );
    desc8.putInteger( idlayerSectionStart, 1630 );
    var idlayerSectionEnd = stringIDToTypeID( "layerSectionEnd" );
    desc8.putInteger( idlayerSectionEnd, 1631 );
    var idNm = charIDToTypeID( "Nm  " );
    desc8.putString( idNm, "Group 2" );
    executeAction( idMk, desc8, DialogModes.NO );
}
  
activeDocument.suspendHistory('Group', 'main();');
