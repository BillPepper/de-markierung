# De-Markierung Chrome-Plugin Repo

## Installation

### Dev
- Clone the repo to your local drive
- Enable the dev-mode in chrome://extensions/
- Click 'load unpacked' and point to the root of the folder

### Production
- Clone the repo to your local drive
- run 'npm install'
- run 'npm run build'
- Enable the dev-mode in chrome://extensions/
- Click 'load unpacked' and point to the 'dist' folder

### Build
- Clone the repo to your local drive
- In Chrome go to chrome://extensions/
- In Dev-Mode click 'pack extension'

### Installation
- Download the crx file from git
- Go to chrome://extensions/
- Drag the file into the extensions window
- Done! Enjoy a buggy experience ;)

## Known Issues

- CORS is a pain in the ass
- When building the productin code the dev code will throw errors caused by the
  node_modules folder 


Copyright 2019, Mattes Wenzel, all right reserved.
