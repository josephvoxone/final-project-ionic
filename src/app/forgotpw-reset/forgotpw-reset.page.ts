import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-forgotpw-reset',
  templateUrl: './forgotpw-reset.page.html',
  styleUrls: ['./forgotpw-reset.page.scss'],
})
export class ForgotpwResetPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private userService: UserService
  ) { }

  user: any = { password: '', con: '' };

  ngOnInit() {
  }

  async resetPW() {
    const toast = await this.toastController.create({
      duration: 3000,
      position: 'top',
      buttons: [{ side: 'start', icon: 'alert' }]
    });

    if (this.user.password != this.user.con) {
      toast.color = "danger";
      toast.message = 'Pastikan Password konfirmasi sama';
      toast.present();
    } else {
      this.user.id = JSON.parse(localStorage.getItem("passing")).id;
      this.userService.updatePass(this.user).then((resp) => {
        toast.color = "success";
        toast.message = resp.toString();
        toast.present();
        this.navCtrl.navigateBack('welcome');
      }).catch((err) => {
        toast.color = "danger";
        toast.message = err.toString();
        toast.present();
      });
    }
  }

}
