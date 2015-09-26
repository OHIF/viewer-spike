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
    }
});