

Template.thumbnail.onRendered(function() {
  //console.log(this);
  var instance = this.data.instances[0];
  var element = this.find('.viewer-thumbnail');
  //console.log(element);
  cornerstone.enable(element);

  //var imageId = getWADORSImageId(instance); // WADO-RS Retrieve Frame
  var imageId = 'dicomweb:' + instance.wadouri; // WADO-URI

  cornerstone.loadAndCacheImage(imageId).then(function(image) {
    console.log(image);
    cornerstone.displayImage(element, image);
  });
});