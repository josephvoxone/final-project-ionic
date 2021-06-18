import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgotpw',
  templateUrl: './forgotpw.page.html',
  styleUrls: ['./forgotpw.page.scss'],
})
export class ForgotpwPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  user: any = { phone: '' };

  ngOnInit() {
  }


  async forgotPW() {
    const toast = await this.toastController.create({
      duration: 2000, color: 'danger',
      message: 'Pastikan akun yang digunakan terdaftar !',
      buttons: [{ side: 'start', icon: 'contact' }]
    });
    return this.http.get("https://api.cateringsurabaya.co.id/index.php/api/Master_User/selectData?phone=" + this.user.phone)
      .subscribe(data => {
        if (!data["success"]) {
          toast.message = 'Pastikan nomor telepon akun yang digunakan terdaftar !';
          toast.present();
          return false;
        } else {
          localStorage.setItem("passing", JSON.stringify(data['result'][0]));
          this.navCtrl.navigateForward(['signin-valid', { mode: 'pw' }]);
          return true;
        }
      }, error => {
        toast.message = 'Jaringan tidak stabil !';
        toast.present();
      });
  }


}
