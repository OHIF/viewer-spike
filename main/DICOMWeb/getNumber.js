DICOMWeb.getNumber = function(element, defaultValue) {
  if(!element) {
    return defaultValue;
  }
  if(!element.Value.length) {
    return defaultValue;
  }
  return parseFloat(element.Value[0]);
};