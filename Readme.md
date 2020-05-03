# Stalking Android App
An android app for stalking platform

### Features Supported

- Search Global Stocks
- See Stock valuation trend

### Tech stack

- React native
- [Alphavantage](https://www.alphavantage.co) api's used to fetch data

#### How to run app in local ?

- Import project in any file editor (Intellij preferably)
- use command line to navigate to project and execute these commands step by step
  ```
  expo start 
  ```
  The command will install app depencies and start a ui with help of which you can connect development phone/emulator
- Build debug apk 
```
react-native bundle --dev false --platform android --entry-file index.js --bundle-output ./android/app/src/main/assets/index.android.bundle --assets-dest ./android/app/src/main/res
cd android
/gradlew assembleDebug
```
You will find apk under directory path `android/app/src/debug`