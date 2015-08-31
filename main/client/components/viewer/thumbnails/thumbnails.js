Template.thumbnails.helpers({
  thumbnails: function() {
    return Session.get('metadata').seriesList;
  }
});