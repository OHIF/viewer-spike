function loadSeriesIntoViewport(data) {
    if (!data.series || !data.viewport) {
        return;
    }

    var series = data.series;
    var element = data.viewport;

    var imageIds = [];
    series.instances.forEach(function(instance) {
        var imageId = getImageId(instance);
        imageIds.push(imageId);
    });

    var stack = {
        currentImageIdIndex: 0,
        imageIds: imageIds
    };

    cornerstone.enable(element);
    cornerstone.loadAndCacheImage(imageIds[stack.currentImageIdIndex]).then(function(image) {
        cornerstone.displayImage(element, image);

        var imagePlane = cornerstoneTools.metaData.get('imagePlane', image.imageId);

        cornerstoneTools.addStackStateManager(element, [ 'stack', 'playClip', 'referenceLines' ]);

        // Clear any old stack data
        cornerstoneTools.clearToolState(element, 'stack');
        cornerstoneTools.addToolState(element, 'stack', stack);

        // Enable mouse input
        cornerstoneTools.mouseInput.enable(element);
        cornerstoneTools.touchInput.enable(element);
        cornerstoneTools.mouseWheelInput.enable(element);

        var activeTool = toolManager.getActiveTool();
        toolManager.setActiveTool(activeTool);

        cornerstoneTools.magnify.enable(element);
    });
}

Template.imageViewerViewport.onRendered(function() {
    console.log('imageViewerViewport onRendered');
    var studies = Session.get('studies');
    var viewport = this.find(".imageViewerViewport");
    var viewportIndex = $(".imageViewerViewport").index(viewport);

    var data = {
        viewport: viewport
    };

    if (this.data.seriesInstanceUid !== undefined && this.data.studyInstanceUid !== undefined) {
        var studyInstanceUid = this.data.studyInstanceUid;
        var seriesInstanceUid = this.data.seriesInstanceUid;

        studies.every(function(study) {
            if (study.studyInstanceUid === studyInstanceUid) {
                study.seriesList.every(function(series) {
                    if (series.seriesInstanceUid === seriesInstanceUid) {
                        data.series = series;
                        return false;
                    }
                    return true;
                });
                return false;
            }
            return true;
        });
        console.log(data);
    } else {
        var stacks = [];
        studies.forEach(function(study) {
            study.seriesList.forEach(function(series) {
                stacks.push(series);
            });
        });
      
        if (viewportIndex > stacks.length) {
            return;
        }
        var stack = stacks[viewportIndex];

        data.series = stack;
    }
    loadSeriesIntoViewport(data);
});