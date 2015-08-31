DICOMWeb.getName = function(element, defaultValue) {
  if(!element) {
    return defaultValue;
  }
  if(!element.Value.length) {
    return defaultValue;
  }
  // DCM4CHEE returns the name as Alphabetic
  if(element.Value[0].Alphabetic) {
    return element.Value[0].Alphabetic;
  }
  // Orthanc does not return the nae as Alphabetic which is probably a bug so we have
  // this workaround
  return element.Value[0];
};