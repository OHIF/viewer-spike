DICOMWeb.getImageFrame = function(uri, callback) {
  console.log('getImageFrame');
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "arraybuffer";
    //xhr.setRequestHeader('Accept', 'multipart/related;type=application/octet-stream');
    xhr.open("get", uri, true);
    xhr.onreadystatechange = function (oEvent) {
      // TODO: consider sending out progress messages here as we receive the pixel data
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // request succeeded, create an image object and resolve the deferred

          // Parse the DICOM File
          var imageFrameAsArrayBuffer = xhr.response;
          var response = new Uint8Array(xhr.response);
          var header = '';
          var length = 0;
          for(var offset = 0; offset < response.length; offset++) {
            header += String.fromCharCode(response[offset]);
            var index = header.indexOf('Content-Type: application/octet-stream');
            if(index > 0) {
              var split = header.split('\n');
              var boundary = split[0]
              length = response.length - offset - boundary.length;
              console.log(boundary);
              break;
            }
          }
          //var offset = 64;
          resolve({
            arrayBuffer: imageFrameAsArrayBuffer,
            offset: offset,
            length: length
          });
        }
        else {
          // request failed, reject the deferred
          reject(xhr.response);
        }
      }
    };
    xhr.send();
  });
};