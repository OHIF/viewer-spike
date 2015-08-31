Meteor.methods({
  'GetStudyMetadata' : function(studyInstanceUid) {
    console.log('GetStudyMetadata(%s)', studyInstanceUid);

    var server = Meteor.settings.dicomWeb.endpoints[0];

    return Services.QIDO.Instances(server, studyInstanceUid);
  }
});