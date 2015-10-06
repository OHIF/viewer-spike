# OHIF Image Viewer
This repository is used to spike the OHIF viewer based on Orthanc, meteor and cornerstone.  It is also being tested
against SIIM's DCM4CHEE instance which is based on an April 2015 build

## Pre-requisites
Install [Meteor](https://www.meteor.com/)

## Starting with medken's orthanc server
````
cd main
bin/medkenOrthanc.sh
````

## Starting with SIIM's DCM4CHEE server
````
cd main
bin/siimDCM4CHEE.sh
````

## Starting with Medical Connections Public Server (unverified)
````
cd main
bin/medicalConnections.sh
````

After the Meteor server has started, open web browser to localhost:3000

## Running locally with Orthanc & Docker
### Requirements
You must have the following installed:
- Docker
- node.js and NPM (node package manager)
- Meteor

### Instructions
1. **Start Orthanc in Docker:** Open a terminal Tab/window. Run the docker container for Orthanc with all plugins enabled (may need sudo, depending on OS):
    ````
    docker run -p 4242:4242 -p 8042:8042 --rm jodogne/orthanc-plugins
    ````

2. **Start the proxy for Orthanc:** Open a new Terminal tab/window. Go to /main and run
    ````
    cd etc
    ./setupLocalOrthanc.sh
    ````
    This does three things. First, it checks the docker machine's IP. Next, it updates the /etc/nodeCORSProxy.js file to proxy this IP. Finally, it starts the proxy server with node.

3. **Start Meteor:** Open another Terminal tab/window to start the Meteor server
    ````
    cd main
    ./bin/localhostOrthanc.sh
    ````

### Usage
- **To see images** use the OHIF Viewer at http://localhost:3000
- **To upload images** use Orthanc at http://localhost:8042

# Notes

- This repository is currently using the Experimental Cornerstone WebGL Renderer. If you encounter any odd behaviour, you can disable this renderer in client/components/viewer/imageViewerViewport/imageViewerViewport.js.

### Testing WADO-RS RetrieveFrames
Set the imageRendering property in the dicomWeb endpoint to 'wadors'.  Note that this should work for grayscale images
but hasn't been verfied yet (DCM4CHEE is returning invalid pixel data).  Support for color and compressed transfer
syntaxes has not been implemented yet.
