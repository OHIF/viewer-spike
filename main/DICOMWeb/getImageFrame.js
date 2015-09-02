DICOMWeb.getImageFrame = function(uri, callback) {
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

          // Parse the multi-part mime response
          var imageFrameAsArrayBuffer = xhr.response;
          var response = new Uint8Array(xhr.response);
          var tokenIndex = findIndexOfString(response, '\n\r\n');
          //console.log('tokenIndex=',tokenIndex);
          var header = uint8ArrayToString(response, 0, tokenIndex);
          //console.log('header.length=', header.length);
          var split = header.split('\r\n');
          //console.log(split);
          var boundary = split[0];
          //console.log('boundary=', boundary);
          var offset = tokenIndex + 4;
          //console.log('offset', offset);
          var endIndex = findIndexOfString(response, boundary, offset);
          var length = endIndex - offset - 1;
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