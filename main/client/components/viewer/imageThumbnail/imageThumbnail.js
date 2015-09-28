Template.imageThumbnail.onRendered(function() {
  var instance = this.data.instances[0];
  var element = this.find('.imageThumbnail');
  cornerstone.enable(element);

  $(element).data('seriesInstanceUid', Template.parentData(0).seriesInstanceUid);
  $(element).data('studyInstanceUid', Template.parentData(1).studyInstanceUid);

  var imageId = getImageId(instance);

  cornerstone.loadAndCacheImage(imageId).then(function(image) {
    cornerstone.displayImage(element, image);
  });
});