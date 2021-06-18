import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { AlertController } from '@ionic/angular';
import { Market } from '@ionic-native/market/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-tab-akun',
  templateUrl: 'tab-akun.page.html',
  styleUrls: ['tab-akun.page.scss'],
})
export class TabAkunPage implements OnInit {

  constructor(
    private userService: UserService,
    private alertController: AlertController,
    private market: Market,
    private callNumber: CallNumber
  ) { }

  ngOnInit() { }

  async signOut() {
    const alert = await this.alertController.create({
      header: 'Sign Out',
      message: 'Apakah anda yakin ingin keluar dari aplikasi ?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yakin',
          handler: () => {
            this.userService.logOut();
          }
        }
      ]
    });
    await alert.present();
  }

  async marketOpen() {
    const alert = await this.alertController.create({
      header: 'Beta Tester',
      message: 'Apakah anda ingin berpartisipasi menjadi beta tester ?',
      buttons: [
        {
          text: 'Enggak Deh',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Iya Dong',
          handler: () => {
            this.market.open('com.kateringku.app');
          }
        }
      ]
    });
    await alert.present();
  }

  async callCS() {
    const alert = await this.alertController.create({
      header: 'Telepon Layanan Pelanggan',
      message: 'Apakah anda yakin ingin telepon layanan pelanggan ?',
      buttons: [{
        text: 'Batal', role: 'cancel', cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Yakin',
        handler: () => {
          this.callNumber.callNumber(JSON.parse(localStorage.getItem("dataCompany")).phone, true);
        }
      }]
    });
    await alert.present();

  }

  async marketSurvey() {
    const alert = await this.alertController.create({
      header: 'Review Aplikasi',
      message: 'Apakah anda ingin memberikan ulasan pada aplikasi ini ?',
      buttons: [
        {
          text: 'Nanti Aja',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Iya Dong',
          handler: () => {
            this.market.open('com.kateringku.app');
          }
        }
      ]
    });
    await alert.present();
    
  }

}
