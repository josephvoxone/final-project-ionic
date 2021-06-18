import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-akun-alamatopsi',
  templateUrl: './akun-alamatopsi.page.html',
  styleUrls: ['./akun-alamatopsi.page.scss'],
})
export class AkunAlamatopsiPage implements OnInit {

  user: any = { name: '', address: '' }; userold: any = {};
  mode: any = {}; title: string; passKodepos: boolean = false;

  constructor(
    private toastController: ToastController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.user.id_user = JSON.parse(localStorage.getItem("dataUser")).id;
    this.mode = this.route.snapshot.paramMap.get('mode');
    console.log(this.mode);
    if (this.mode == 'insert') { this.title = "Tambahkan Alamat" }
    else {
      this.title = "Ubah Alamat";
      this.user = JSON.parse(localStorage.getItem("passing"));
      this.userold = JSON.parse(localStorage.getItem("passing"));
    }
  }

  async tambahAlamat() {
    const toast = await this.toastController.create({
      duration: 2000,
      color: 'success',
      buttons: [{ side: 'start', icon: 'done-all' }]
    });
    // Load Kode Pos
    return this.userService.lokasiAPI().then((data: any) => {
      console.log(data);
      if (data.find(x => x.kodepos == this.user.kodepos)) {
        let datax = data.find(x => x.kodepos == this.user.kodepos);
        this.user.kecamatan = datax.kecamatan; this.user.kelurahan = datax.kelurahan;
        this.userService.insertAlamat(this.user).then((resp) => {
          toast.message = resp.toString();
          toast.present();
          this.navCtrl.back();
        }).catch((err) => {
          toast.message = err.toString();
          toast.present();
        });
        return true;
      } else {
        toast.buttons = [{ side: 'start', icon: 'map' }]; toast.color = 'danger';
        toast.message = "Kode post tidak valid, katering hanya tersedia di Surabaya";
        toast.present();
        return false;
      }
    }).catch((err) => {
      toast.buttons = [{ side: 'start', icon: 'wifi' }]; toast.color = 'danger';
      toast.message = err;
      toast.present();
      return false;
    });
  }

  async updateAlamat() {
    const toast = await this.toastController.create({
      duration: 2000,
      color: 'success',
      buttons: [{ side: 'start', icon: 'done-all' }]
    });

    // Load Kode Pos
    return this.userService.lokasiAPI().then((data: any) => {
      if (data.find(x => x.kodepos == this.user.kodepos)) {
        console.log(data.find(x => x.kodepos == this.user.kodepos));
        this.userService.updateAlamat(this.user).then((resp) => {
          toast.message = resp.toString();
          toast.present();
          this.navCtrl.back();
        }).catch((err) => {
          toast.message = err.toString();
          toast.present();
        });
        return true;
      } else {
        toast.buttons = [{ side: 'start', icon: 'map' }]; toast.color = 'danger';
        toast.message = "Kode post tidak valid, katering hanya tersedia di Surabaya";
        toast.present();
        return false;
      }
    }).catch((err) => {
      toast.buttons = [{ side: 'start', icon: 'wifi' }]; toast.color = 'danger';
      toast.message = err;
      toast.present();
      return false;
    });
  }

  async hapusAlamat() {
    const toast = await this.toastController.create({
      duration: 2000,
      color: 'success',
      buttons: [{ side: 'start', icon: 'done-all' }]
    });

    this.userService.deleteAlamat(this.user).then((resp) => {
      toast.message = resp.toString();
      toast.present();
      this.navCtrl.back();
    }).catch((err) => {
      toast.message = err.toString();
      toast.present();
    });
  }

}
