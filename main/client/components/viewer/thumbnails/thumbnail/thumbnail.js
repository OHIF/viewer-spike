Template.thumbnail.onRendered(function() {
  //console.log(this);
  var image = this.data.instances[0];
  var element = this.find('.viewer-thumbnail');
  //console.log(element);
  cornerstone.enable(element);
  var imageId = 'dicomweb:' + image.uri;

  cornerstone.loadAndCacheImage(imageId).then(function(image) {
    cornerstone.displayImage(element, image);
  });
});