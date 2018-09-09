function main() {
    if (documents.length) userMaskFeatherIfZero(0.3);
}

function userMaskFeatherIfZero(feather) {
    // Records the number of layers
    var ref = new ActionReference();
    ref.putProperty( charIDToTypeID("Prpr"), charIDToTypeID('NmbL'));
    ref.putEnumerated( charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    var count = executeActionGet(ref).getInteger(charIDToTypeID('NmbL')) + 1;

    // Iteration starts at 1 if there is a background layer
    var i = 0;
    try {
        var test = activeDocument.backgroundLayer; // Fails when there is no background layer
    } catch(e) {
        i = 1;
    }

    // Iterate over layers
    for (i; i < count; ++i) {
        if (i === 0) continue;
        ref = new ActionReference();
        ref.putIndex( charIDToTypeID('Lyr '), i);
        var desc = executeActionGet(ref);
        var layerName = desc.getString(charIDToTypeID('Nm  '));
        if(layerName.match(/^<\/Layer group/) ) continue;
        var layerType = typeIDToStringID(desc.getEnumerationValue( stringIDToTypeID('layerSection')));
        if(desc.hasKey(charIDToTypeID('Usrs'))){
            if(desc.getDouble(stringIDToTypeID('userMaskFeather')) === 0) {
                userMaskFeather(i, feather);
            }
        }
    }
}

function userMaskFeather(i, amount) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putIndex( charIDToTypeID('Lyr '), i);
    desc.putReference( charIDToTypeID('null'), ref );
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(stringIDToTypeID('userMaskFeather'), charIDToTypeID('#Pxl'), amount);
    desc.putObject( charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc2 );
    try{
        executeAction( charIDToTypeID('setd'), desc, DialogModes.NO );
    } catch(e) {}
}

main();
