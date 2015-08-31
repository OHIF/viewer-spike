Studies = new Mongo.Collection(null);

Template.worklistResults.helpers({
  studies : function() {
    return Studies.find();
  }
});