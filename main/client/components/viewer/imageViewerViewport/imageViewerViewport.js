function loadSeriesIntoViewport(data) {
    if (!data.series || !data.viewport) {
        return;
    }

    var series = data.series;
    var element = data.viewport;
    var viewportIndex = $(".imageViewerViewport").index(data.viewport);

    var imageIds = [];
    series.instances.forEach(function(instance) {
        var imageId = getImageId(instance);
        imageIds.push(imageId);
        addMetaData(imageId, instance);
    });

    var stack = {
        currentImageIdIndex: 0,
        imageIds: imageIds
    };

    // NOTE: This uses the experimental WebGL renderer for Cornerstone!
    cornerstone.enable(element, cornerstone.webGL.renderer.render);
    // If you have problems, replace it with this line instead:
    // cornerstone.enable(element);

    cornerstone.loadAndCacheImage(imageIds[stack.currentImageIdIndex]).then(function(image) {
        cornerstone.displayImage(element, image);
        
        cornerstone.resize(element, true);

        var imagePlane = cornerstoneTools.metaData.get('imagePlane', image.imageId);

        cornerstoneTools.addStackStateManager(element, [ 'stack', 'playClip', 'referenceLines' ]);

        // Enable orientation markers, if applicable
        var viewport = cornerstone.getViewport(element);
        updateOrientationMarkers(element, viewport);

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

        function onImageRendered(e, eventData) {
            Session.set('CornerstoneImageRendered' + viewportIndex, Random.id());
        }

        $(element).off('CornerstoneImageRendered', onImageRendered);
        $(element).on('CornerstoneImageRendered', onImageRendered);
        Session.set('CornerstoneImageRendered' + viewportIndex, Random.id());

        function onNewImage(e, eventData) {
            Session.set('CornerstoneNewImage' + viewportIndex, Random.id());
        }

        $(element).off('CornerstoneNewImage', onNewImage);
        $(element).on('CornerstoneNewImage', onNewImage);
        Session.set('CornerstoneNewImage' + viewportIndex, Random.id());
    });
}

Template.imageViewerViewport.onRendered(function() {
    console.log('imageViewerViewport onRendered');
    var studies = Session.get('studies');
    var viewport = this.find(".imageViewerViewport");
    var viewportIndex = $(".imageViewerViewport").index(viewport);

    this.data.viewportIndex = viewportIndex;

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