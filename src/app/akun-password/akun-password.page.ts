import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { Md5 } from 'ts-md5';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-akun-password',
  templateUrl: './akun-password.page.html',
  styleUrls: ['./akun-password.page.scss'],
})
export class AkunPasswordPage implements OnInit {

  pass: any = { lama: '', password: '', conn: '' };

  constructor(
    private userService: UserService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  async updatePass() {
    const toast = await this.toastController.create({
      duration: 2000,
      position: 'top',
      buttons: [{ side: 'start', icon: 'alert' }]
    });

    let hashLama = Md5.hashStr(this.pass.lama);

    if (this.pass.password != this.pass.conn) {
      toast.color = "danger";
      toast.message = 'Pastikan Password konfirmasi sama';
      toast.present();
    } else if (hashLama != JSON.parse(localStorage.getItem("dataUser")).password) {
      toast.color = "danger";
      toast.message = 'Pastikan Password lama valid';
      toast.present();
    } else {
      this.pass.id = JSON.parse(localStorage.getItem("dataUser")).id;
      this.userService.updatePass(this.pass).then((resp) => {
        toast.position = "top";
        toast.color = "success";
        toast.message = resp.toString();
        toast.present(); this.userService.loadUser();
        this.navCtrl.back();
      }).catch((err) => {
        toast.color = "danger";
        toast.message = err.toString();
        toast.present();
      });

    }
  }

}
