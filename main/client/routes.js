Router.configure({
  layoutTemplate: 'layout',
  //loadingTemplate: '',
  notFoundTemplate: 'notFound'
});



Router.route('/', function () {
  this.render('worklist', {
  });
});

ViewerStudies = new Mongo.Collection(null);

Router.route('/viewer/:_id', {
  layoutTemplate: '',
  name: 'viewer',
  onBeforeAction: function() {
    var self = this;
    Meteor.call('GetStudyMetadata', this.params._id, function(error, result) {
      console.log(result);
      result.seriesList.sort(function(a,b) {
        return a.seriesNumber - b.seriesNumber;
      });
      result.seriesList.forEach(function(series){
        series.instances.sort(function(a,b) {
          return a.instanceNumber - b.instanceNumber;
        });
      });
      Session.set('metadata', result);
      self.render('viewer');
    });
  }
});


