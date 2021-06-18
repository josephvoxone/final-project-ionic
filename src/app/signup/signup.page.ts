import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  // Deklarasi Model User
  user: any = {
    name: '', password: '', email: '', phone: '', birthday: '', gender: '',
  };

  passMail: boolean = false; passPhone: boolean = false

  constructor(private toastController: ToastController, private navCtrl: NavController, private alertController: AlertController, private http: HttpClient) { }

  ngOnInit() {
  }

  async validateRegist() {
    const toast = await this.toastController.create({
      duration: 2000,
      color: 'danger',
      buttons: [{ side: 'start', icon: 'alert' }]
    });

    if (this.user.name == '' || this.user.password == '' || this.user.email == '' || this.user.phone == '' || this.user.birthday == '' || this.user.gender == '') {
      toast.message = 'Semua field wajib diisi.';
      toast.present();
    } else if (this.user.password.length < 7) {
      toast.message = 'Password kurang baik. Coba berikan lebih dari 6 karakter.';
      toast.present();
    } else {
      this.cekMail(); this.cekPhone();
    }
  }

  cekPhone() {
    return this.http.get("https://api.cateringsurabaya.co.id/index.php/api/Master_User/selectData?phone=" + this.user.phone)
      .subscribe(async data => {
        if (data["success"]) {
          this.passPhone = false;
          const toast = await this.toastController.create({
            duration: 2000, color: 'danger',
            message: 'Nomor sudah terdaftar, gunakan nomor yang lain',
            buttons: [{ side: 'start', icon: 'alert' }]
          });
          toast.present();
          return false;
        } else {
          this.passPhone = true;
          if (this.passMail && this.passPhone) {
            console.log(this.user);
            localStorage.setItem("passing", JSON.stringify(this.user));
            this.navCtrl.navigateForward('signin-valid');
          }
          return true;
        }
      }, async error => {
        console.log(error);
      });
  }

  cekMail() {
    return this.http.get("https://api.cateringsurabaya.co.id/index.php/api/Master_User/selectData?email=" + this.user.email)
      .subscribe(async data => {
        if (data["success"]) {
          this.passMail = false;
          const toast = await this.toastController.create({
            duration: 2000, color: 'danger',
            message: 'Email sudah terdaftar, gunakan email lainnya.',
            buttons: [{ side: 'start', icon: 'alert' }]
          });
          toast.present();
          return false;
        } else {
          this.passMail = true;
          console.log(data);
          if (this.passMail && this.passPhone) {
            console.log(this.user);
            localStorage.setItem("passing", JSON.stringify(this.user));
            this.navCtrl.navigateForward('signin-valid');
          }
          return true;
        }
      }, error => {
        console.log(error);
      });
  }

}

