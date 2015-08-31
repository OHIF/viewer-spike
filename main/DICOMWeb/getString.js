DICOMWeb.getString = function(element, defaultValue) {
  if(!element) {
    return defaultValue;
  }
  if(!element.Value.length) {
    return defaultValue;
  }
  return element.Value[0].toString();
};