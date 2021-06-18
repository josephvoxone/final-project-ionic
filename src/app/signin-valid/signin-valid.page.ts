import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Firebase } from '@ionic-native/firebase/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin-valid',
  templateUrl: './signin-valid.page.html',
  styleUrls: ['./signin-valid.page.scss'],
})
export class SigninValidPage implements OnInit {

  user: any = {};

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private http: HttpClient,
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private fireBase: Firebase,
    private toastController: ToastController,
    private route: ActivatedRoute,
  ) { }

  phone: any = {};
  idverifikasi: string; code: string;

  ngOnInit() { }

  ionViewWillEnter() {
    this.user = JSON.parse(localStorage.getItem("passing"));
    console.log(this.user);
    this.kirimUlang();
  }

  otpController(event, next, prev) {
    if (event.target.value.length < 1 && prev) {
      prev.setFocus()
    } else if (next && event.target.value.length > 0) {
      next.setFocus();
    } else {
      return 0;
    }
  }

  async verifOTP() {
    const toast = await this.toastController.create({
      duration: 2000,
      position: "top",
      color: 'danger',
      buttons: [{ side: 'start', icon: 'information-circle' }]
    });
    this.code = (this.phone.satu + this.phone.dua + this.phone.tiga + this.phone.empat + this.phone.lima + this.phone.enam).toString();
    console.log(this.code);
    if (this.code.length == 6) {
      const loader = await this.loadingController.create({
        message: 'Verifikasi kode',
        duration: 10000
      });
      await loader.present();

      let signInCredential = await firebase.auth.PhoneAuthProvider.credential(this.idverifikasi, this.code);
      this.afAuth.auth.signInAndRetrieveDataWithCredential(signInCredential).then((success) => {
        console.log("id" + success.user.uid);
        // Insert User
        if (this.route.snapshot.paramMap.get('mode') == 'pw') {
          this.navCtrl.navigateForward('/forgotpw-reset');
        } else {
          this.http.post("https://api.cateringsurabaya.co.id/index.php/api/Master_User/insertData", JSON.stringify(this.user))
            .subscribe(data => {
              console.log(data);
              this.alertRegistered();
              this.navCtrl.navigateBack('/signin');
            }, error => {
              console.log(error);
            });
        }
        loader.dismiss();
      }).then().catch(er => {
        // Signin Credentials
        console.log(er);
        loader.dismiss();
        toast.message = "Kode verifikasi tidak valid";
        toast.present();
      });
    } else {
      toast.message = "Pastikan Kode verifikasi terisi";
      toast.present();
    }
  }

  async sendCode() {
    const alert = await this.alertController.create({
      header: 'Tidak terkirim ?',
      message: 'Kirim ulang kode verifikasi OTP',
      buttons: [{
        text: 'Batal', role: 'cancel',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Iya',
        handler: () => { this.kirimUlang(); }
      }]
    });
    await alert.present();
  }

  async kirimUlang() {
    let phone = "+62" + this.user.phone;
    console.log(phone);
    this.fireBase.verifyPhoneNumber(phone, 60).then((credential) => {
      this.idverifikasi = credential.verificationId; /**  FOR ANDROID    **/
      // this.verificationId = credential; /**  FOR IOS **/
      console.log(credential);
    }).catch((error) => {
      console.error(error)
    });
  }


  async alertRegistered() {
    const toast = await this.toastController.create({
      message: 'Selamat anda berhasil mendaftar',
      position: 'bottom',
      buttons: [{ side: 'start', icon: 'done-all' }, { text: 'OKAY' }]
    });
    toast.present();
  }

}
