var metaDataLookup = {};

addMetaData = function(imageId, metaData) {
    // If there is sufficient information, populate
    // the imagePlane object for easier use in the Viewer
    if (metaData.frameOfReferenceUID &&
        metaData.imageOrientationPatient &&
        metaData.imagePositionPatient) {

        var imageOrientation = metaData.imageOrientationPatient.split('\\');
        var imagePosition = metaData.imagePositionPatient.split('\\');

        var columnPixelSpacing = 1.0;
        var rowPixelSpacing = 1.0;
        if (metaData.pixelSpacing) {
            var split = metaData.pixelSpacing.split('\\');
            rowPixelSpacing = parseFloat(split[0]);
            columnPixelSpacing = parseFloat(split[1]);
        }
        
        metaData.imagePlane = {
            frameOfReferenceUID: metaData.frameOfReferenceUID,
            rows: metaData.rows,
            columns: metaData.columns,
            rowCosines: new cornerstoneMath.Vector3(imageOrientation[0], imageOrientation[1], imageOrientation[2]),
            columnCosines: new cornerstoneMath.Vector3(imageOrientation[3], imageOrientation[4], imageOrientation[5]),
            imagePositionPatient: new cornerstoneMath.Vector3(imagePosition[0], imagePosition[1], imagePosition[2]),
            rowPixelSpacing: rowPixelSpacing,
            columnPixelSpacing: columnPixelSpacing,
        };
    }

    // Add the metaData to the imageId lookup object
    metaDataLookup[imageId] = metaData;
};

function provider(type, imageId) {
    var imageMetaData = metaDataLookup[imageId];
    if (!imageMetaData) {
        return;
    }

    if (imageMetaData.hasOwnProperty(type)) {
        return imageMetaData[type];
    }
}

Meteor.startup(function() {
    cornerstoneTools.metaData.addProvider(provider);
});
