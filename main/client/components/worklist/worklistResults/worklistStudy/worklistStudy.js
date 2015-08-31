Template.worklistStudy.events({
  'click' : function() {
    console.log(this);
    Router.go('viewer', {_id: this.studyInstanceUid});

    /*console.time('GetStudyMetadata');
    Meteor.call('GetStudyMetadata', this.url, function(error, result) {
      console.timeEnd('GetStudyMetadata');
      console.log(result);
    });
    */
  }
});