import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      this.statusBar.styleBlackTranslucent();
      // Console Swipe dan is login
      console.log(localStorage.getItem("isLogin") + " DAN " + localStorage.getItem("firstTime"))
      // Cek User Login
      if (localStorage.getItem("isLogin") == "true" && localStorage.getItem("firstTime") == "true") {
        this.navCtrl.navigateRoot('/swiper');
      } else if (localStorage.getItem("isLogin") == "true" && localStorage.getItem("firstTime") == "false") {
        this.navCtrl.navigateRoot('/tabs');
      } else if (localStorage.getItem("isLogin") == "false" || localStorage.getItem("isLogin") == null) {
        this.navCtrl.navigateRoot('');
      }
    });
  }

}
