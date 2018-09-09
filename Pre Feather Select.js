function main() {
    var userMask = 0;
    getUserMask();
    featherSet(0);
    selectMask();
    featherSet(userMask);
}

function getUserMask() {
    ref = new ActionReference();
    ref.putIndex( charIDToTypeID('Lyr '), activeDocument.activeLayer.itemIndex);
    var desc = executeActionGet(ref);
    var layerName = desc.getString(charIDToTypeID('Nm  '));
    var layerType = typeIDToStringID(desc.getEnumerationValue( stringIDToTypeID('layerSection')));
    if (desc.hasKey(charIDToTypeID('Usrs'))) {
        userMask = (desc.getDouble(stringIDToTypeID('userMaskFeather')));
    };
};

function featherSet(amount) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putIndex( charIDToTypeID( 'Lyr ' ), activeDocument.activeLayer.itemIndex);
    desc.putReference( charIDToTypeID('null'), ref );
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble( stringIDToTypeID('userMaskFeather'), charIDToTypeID('#Pxl'), amount);
    desc.putObject( charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc2 );
    try {
        executeAction( charIDToTypeID('setd'), desc, DialogModes.NO );
    } catch(e) { }
};
    
function selectMask() {
    var idsetd = charIDToTypeID( "setd" );
    var desc14 = new ActionDescriptor();
    var idnull = charIDToTypeID( "null" );
    var ref10 = new ActionReference();
    var idChnl = charIDToTypeID( "Chnl" );
    var idfsel = charIDToTypeID( "fsel" );
    ref10.putProperty( idChnl, idfsel );
    desc14.putReference( idnull, ref10 );
    var idT = charIDToTypeID( "T   " );
    var ref11 = new ActionReference();
    var idChnl = charIDToTypeID( "Chnl" );
    var idOrdn = charIDToTypeID( "Ordn" );
    var idTrgt = charIDToTypeID( "Trgt" );
    ref11.putEnumerated( idChnl, idOrdn, idTrgt );
    desc14.putReference( idT, ref11 );
    executeAction( idsetd, desc14, DialogModes.NO );
}

main();