import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-akun-alamat',
  templateUrl: './akun-alamat.page.html',
  styleUrls: ['./akun-alamat.page.scss'],
})
export class AkunAlamatPage implements OnInit {

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
  ) { }

  alamat: any = [];

  ngOnInit() {
    this.ionViewWillEnter()
  }

  ionViewWillEnter() {
    // Load Data Alamat (id,name,address)
    this.userService.loadAlamat().then((resp) => {
      if (resp["success"]) { this.alamat = resp["result"]; }
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  goDetail(item) {
    localStorage.setItem("passing", JSON.stringify(item));
    this.navCtrl.navigateForward('/akun-alamatopsi');
  }

}
