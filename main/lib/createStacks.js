createStacks = function(study) {
  var stacks = [];
  // TODO: Split by multi-frame, modality, image size, etc
  study.seriesList.forEach(function(series) {
    stacks.push(series);
  });
  return stacks;
};