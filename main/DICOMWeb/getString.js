DICOMWeb.getString = function(element, defaultValue) {
  if(!element) {
    return defaultValue;
  }
  if(!element.Value.length) {
    return defaultValue;
  }
  // NOTE: Orthanc does not split values into an array
  return element.Value.join('\\');
};