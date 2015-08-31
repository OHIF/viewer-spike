DICOMWeb.getString = function(element, defaultValue) {
  if(!element) {
    return defaultValue;
  }
  return element.Value[0].toString();
};