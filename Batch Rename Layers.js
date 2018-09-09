function UI() { 
    var find, replace, window;

    function show() {
        window = new Window('dialog', 'Batch Rename');
        var findGrp = window.add('group');
        findGrp.orientation = 'row';
        findGrp.add('statictext', undefined, 'Find');
        find = findGrp.add('edittext', undefined, '');  
        find.characters = 20;
        find.active = true;
        var replaceGrp = window.add('group');
        replaceGrp.orientation = 'row';
        replaceGrp.add('statictext', undefined, 'Replace');
        replace = replaceGrp.add('edittext', undefined, '');
        replace.characters = 18;
        var buttonGrp = window.add('group');
        buttonGrp.add('button', undefined, 'Cancel');
        var okay = buttonGrp.add('button', undefined, 'OK');
        okay.onClick = _okayButtonHandler;
        window.alignChildren = 'left';
        window.show();
    }

    function _nameWithinGroup(group, find, replace) {
        for (var i = 0; i < group.layers.length; i++) {
            var layer = group.layers[i];

            var re = new RegExp(find, 'gi');
            layer.name = layer.name.replace(re, replace);

            if (layer.typename == 'LayerSet') {
                _nameWithinGroup(layer, find, replace);
            }
        }
    }

    function _okayButtonHandler() {
        _nameWithinGroup(activeDocument, find.text, replace.text);
        window.close();
    }

    return {
        show: show
    };
}

function main() {
    var ui = new UI();
    ui.show();
}

activeDocument.suspendHistory('Batch Rename', 'main();');