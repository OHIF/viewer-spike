if(!Session.get('worklistPatientNameFilter')) {
  Session.set('worklistPatientNameFilter', 'SIIM^Joe');
}

search();

Template.worklistSearch.onRendered(function() {
  $('#inputName').val(Session.get('worklistPatientNameFilter'));
  $('#inputPatientId').val(Session.get('worklistPatientIdFilter'));
  $('#inputAccessionNumber').val(Session.get('worklistAccessionNumberFilter'));
});

function getFilter(name) {
  var filter = Session.get(name);
  if(filter && filter.length && filter.substr(filter.length - 1) !== '*') {
    filter += '*';
  }
  return filter;
}

function search() {
  var filter = {
    patientName: getFilter('worklistPatientNameFilter'),
    patientId: getFilter('worklistPatientIdFilter'),
    accessionNumber: getFilter('worklistAccessionNumberFilter'),
    //studyDate:
  };

  Studies.remove({});
  Meteor.call('WorklistSearch', filter, function(error, studies) {
    console.log(studies);
    studies.forEach(function(study) {
      Studies.insert(study);
    });
  });

}

Template.worklistSearch.events({
  'click button' :function(event) {
    Session.set('worklistPatientNameFilter', $('#inputName').val());
    Session.set('worklistPatientIdFilter', $('#inputPatientId').val());
    Session.set('worklistAccessionNumberFilter', $('#inputAccessionNumber').val());

    search();

    return false;
  }
});