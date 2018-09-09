function main() {
    if (documents.length === 0) return;

    // Fails if there is no selection
    try {
        var bounds = app.activeDocument.selection.bounds;
    } catch(e) { return; }

    var l = bounds[0].value; // Left
    var t = bounds[1].value; // Top
    var r = bounds[2].value; // Right
    var b = bounds[3].value; // Bottom

    app.activeDocument.selection.select([
        [l, t],
        [r, t],
        [r, b],
        [l, b]
    ]);
}

main();