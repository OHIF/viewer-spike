function getImageId(instance) {
  if(instance.wadouri) {
    return 'dicomweb:' + instance.wadouri; // WADO-URI
  } else {
    return getWADORSImageId(instance); // WADO-RS Retrieve Frame
  }
}



Template.thumbnail.onRendered(function() {
  //console.log(this);
  var instance = this.data.instances[0];
  var element = this.find('.viewer-thumbnail');
  //console.log(element);
  cornerstone.enable(element);

  var imageId = getImageId(instance);

  cornerstone.loadAndCacheImage(imageId).then(function(image) {
    console.log(image);
    cornerstone.displayImage(element, image);
  });
});