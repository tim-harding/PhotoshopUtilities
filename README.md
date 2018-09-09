# PhotoshopUtilities
A collection of small workflow enhancement scripts for Adobe Photoshop. 

### Batch Rename Layers
Pops up a UI that allows you to find and replace text in your active document.  

### Bounding Box
Converts a selection of any shape to the bounding box of that selection.  

### Duplicate Paths
Duplicates paths from one document to another.  This is an alternative to the often inappropriate default behavior, which will either merge all paths together when pasting or reposition them.

### Feather All Mask
Applies a 0.3 feather to all masks in a file.  This will oftentimes help fix aliasing problems.  

### Group
Similar to the normal grouping behavior, except that it matches the name, opacity, and blend mode of the topmost layer. 

### Invert Solid Color
Inverts the color of a solid color layer.  

### Invert
If there is an active selection, it is inverted.  Otherwise, the current layer's mask is inverted.  

### Locker/Unlocker
Locks or unlocks all layers in the active document.

### Masks
A combined tool for common operations on layer masks.
* If the document has a selection and the current layer has a mask, replace the layer mask with the selection while maintaining the amount of mask feather.  
* If the document has a selection and current layer lacks a mask, create a mask from the selection.
* If the document lacks a selection and the current layer has a mask, remove the layer mask.
* If the document lacks a selection and the current layer lacks a mask, create a blank white mask. 

### Multimatte to Alphas
All layers will be split into their constituent channels and stored as alphas in the document.  Useful for when alphas are output from a 3D rendering software as RGB, such as with Vray's multimatte functionality. 

### Pre Feather Select
Creates a selection from the mask of the active layer without the mask feather applied, while still maintaining the mask's feather.  

### Set Solid Color
Sets the color of a solid color layer to the foreground swatch.  

### Show Path
Pops up a dialog with the full file path of the active document.  Useful if you have multiple documents with the same name open and you need to know which lives where. 

### Solid Color
Creates a new solid color layer and selects the mask.

### Toggle Up/Down
Disables visibility of the current layer and enables visibility of the one above or below it and switching to that layer.  Useful if you have several options that you'd like to quickly toggle between.  

### XMP Editor
Pops up a rudimentary UI for adding metadata text, such as notes, to the active layer.  
