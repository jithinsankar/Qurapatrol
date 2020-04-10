# Track Me APP
Track Me app is for people who want to go out for emergencies during lockdown time. This app updates the persons location in to a coud database so that the authority could monitor the persons position in realtime.

## Prerequisites

Make sure you have Expo installed.

`npm install --global expo-cli`

## Installation

Install all packages using

`npm install`

or

`yarn install`


![alt text](https://github.com/jithinsankar/Qurapatrol/blob/master/TrackME/Screenshots/QR%20Code.jpeg)
## Usage

For those who have access to the Firebase console. Copy the configuration from there:

```javascript
const firebaseConfig = {
  apiKey: 'AIXXX',
  authDomain: 'XXX-test.firebaseapp.com',
  databaseURL: 'https://XXX-test.firebaseio.com',
  projectId: 'XXX-test',
  storageBucket: 'XXX-test.appspot.com',
  messagingSenderId: '000000',
  appId: '1:XXX:web:XXX',
  measurementId: 'G-XXXX'
};
```

In this project, paste the configuration inside `src/config/firebase.js`;

## Starting the Application

Just execute the `expo start` command.
# Quarapatrol


