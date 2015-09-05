# viewer-spike
This repository is used to spike the OHIF viewer based on Orthanc, meteor and cornerstone.  It is also being tested
against SIIM's DCM4CHEE instance which is based on an April 2015 build

## starting with medken's orthanc server

> cd main

> bin/medkenOrthanc.sh

## starting with SIIM's DCM4CHEE server

> cd main

> bin/siimDCM4CHEE.sh

after server has started, open web browser to localhost:3000

## Testing WADO-RS RetrieveFrames

Set the imageRendering property in the dicomWeb endpoint to 'wadors'.  Note that this should work for grayscale images
but hasn't been verfied yet (DCM4CHEE is returning invalid pixel data).  Support for color and compressed transfer
syntaxes has not been implemented yet.
