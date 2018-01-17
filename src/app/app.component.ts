import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Constants } from './app.constants';
import * as firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    translate: TranslateService
  ) {

    // Config firebase by google
    let config = {
      apiKey: "AIzaSyCweKU6JKA5Peppq6pVw3Iur7eIyZj7rGc",
      authDomain: "i3chat-75016.firebaseapp.com",
      databaseURL: "https://i3chat-75016.firebaseio.com",
      projectId: "i3chat-75016",
      storageBucket: "i3chat-75016.appspot.com",
      messagingSenderId: "386067578103"
    };
    firebase.initializeApp(config);
    let agr = JSON.parse(window.localStorage.getItem('Agreement@' + Constants.URL));
    if (agr && agr.status) {
      this.rootPage = 'NavtabsPage';
    } else {
      this.rootPage = 'WalkthroughPage';
    }

    translate.addLangs(['en', 'th']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|th/) ? browserLang : 'en');

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

