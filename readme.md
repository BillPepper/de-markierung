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

## Known Issues

- CORS is a pain in the ass
- When building the productin code the dev code will throw errors caused by the
  node_modules folder 
