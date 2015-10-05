Meteor.startup(function() {
    var OHIF = window.OHIF || {};
    OHIF.viewer.functionList = {
        invert: function(element) {
            var viewport = cornerstone.getViewport(element);
            viewport.invert = !viewport.invert;
            cornerstone.setViewport(element, viewport);
        },
        playClip: function(element) {
            cornerstoneTools.playClip(element);
        },
        stopClip: function(element) {
            cornerstoneTools.stopClip(element);
        }
    };

    if (isTouchDevice()) {
        OHIF.viewer.tooltipConfig = {
            trigger: 'manual'
        };
    } else {
        OHIF.viewer.tooltipConfig = {
            trigger: 'hover'
        };
    }
});

Template.toolRow.helpers({
  studies : function() {
    var studies = Session.get('studies');
    return studies;
  }
});

Template.toolRow.events({
    'click .imageViewerTool': function(e) {
        var tool = e.currentTarget.id;
        console.log('Setting active tool to: ' + tool);
        toolManager.setActiveTool(tool);
    },
    'click .imageViewerCommand': function(e) {
        var command = e.currentTarget.id;
        if (!OHIF.viewer.functionList.hasOwnProperty(command)) {
            return;
        }

        // TODO = Add support for active viewports
        //var element = getActiveViewportElement();
        $('.imageViewerViewport').each(function() {
            var element = this;
            OHIF.viewer.functionList[command](element);
        });
    }
});

Template.toolRow.onRendered(function() {
    var tooltipButtons = $('[data-toggle="tooltip"]');
    tooltipButtons.tooltip(OHIF.viewer.tooltipConfig);

    // Enable tooltips for the layout button
    var extraTooltipButtons = $('[rel="tooltip"]');
    extraTooltipButtons.tooltip(OHIF.viewer.tooltipConfig);
});