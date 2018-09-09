function main() {
    if (!activeDocument) return;
    var doc = activeDocument;
    var docHasSelection = checkSelection(doc);
    try {
        if (docHasSelection) {
            doc.selection.invert();
        } else {
            invertMask(doc);
        }
    } catch(e) { };
}

function checkSelection(doc) {
    var res = false;
    var as = doc.activeHistoryState;
    doc.selection.deselect();
    if (as != doc.activeHistoryState) {
        res = true;
        doc.activeHistoryState = as;
    }
    return res;
}
    
var invertMask = function(doc) {
    if (!doc.activeLayer) return;
    var lyr = doc.activeLayer;
    
    // target mask to invert
    (function() {
        var idslct = charIDToTypeID("slct");
        var desc2 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref1 = new ActionReference();
        var idChnl = charIDToTypeID("Chnl");
        var idChnl = charIDToTypeID("Chnl");
        var idMsk = charIDToTypeID("Msk ");
        ref1.putEnumerated(idChnl, idChnl, idMsk);
        desc2.putReference(idnull, ref1);
        var idMkVs = charIDToTypeID("MkVs");
        desc2.putBoolean(idMkVs, false);
        executeAction(idslct, desc2, DialogModes.NO);
    }());
    
    // invert it
    (function() {
        var idInvr = charIDToTypeID("Invr");
        executeAction(idInvr, undefined, DialogModes.NO);
    }());
}
    
main();
