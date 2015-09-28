Meteor.startup(function() {
    var OHIF = window.OHIF || {};
    OHIF.viewer.functionList = {
        invert: function(element) {
            var viewport = cornerstone.getViewport(element);
            viewport.invert = !viewport.invert;
            cornerstone.setViewport(element, viewport);
        }
    };
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

        var element = getActiveViewportElement();
        OHIF.viewer.functionList[command](element);
    }
});