import { Injectable } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: any = {};

  constructor(
    private loadingController: LoadingController,
    private http: HttpClient,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {
    // Load User Data
    this.user = JSON.parse(localStorage.getItem("dataUser"));
  }

  // INIT DATA USER
  public loadUser() {
    return new Promise((resolve, reject) => {
      this.http.get("https://api.cateringsurabaya.co.id/index.php/api/Master_User/selectData?id=" + this.user.id)
        .subscribe(data => {
          console.log("===== Initilize Load User Data =====")
          localStorage.setItem("dataUser", JSON.stringify(data["result"][0]));
          resolve(data);
        });
    })
  }

  public updateUser(data) {
    // Butuh (id,name,address)
    return new Promise((resolve, reject) => {
      this.http.post("https://api.cateringsurabaya.co.id/index.php/api/Master_User/updateData", JSON.stringify(data))
        .subscribe(data => {
          resolve("Berhasil Ubah Profil");
          console.log(data);
          this.loadUser();
        }, error => {
          reject("Gagal Ubah Profil");
          console.log(error);
        });
    })
  }


  // LOGIN SERVICE
  public async login(user) {
    const loading = await this.loadingController.create({
      message: 'Verifikasi Akun',
    });
    await loading.present();

    this.http.post("https://api.cateringsurabaya.co.id/index.php/api/Login_User/selectData", JSON.stringify(user))
      .subscribe(async data => {
        if (data["success"]) {
          loading.dismiss();
          // Somewhere ketika berhasil Login
          localStorage.setItem("dataUser", JSON.stringify(data["result"][0]));
          this.user = JSON.parse(localStorage.getItem("dataUser"));
          // =======  Cara Mendapatkan Object ======= 
          // console.log(JSON.parse(localStorage.getItem("dataUser"))["id"]);
          console.log(JSON.parse(localStorage.getItem("dataUser")));

          localStorage.setItem("isLogin", "true");
          localStorage.setItem("firstTime", "true");

          // Pengecekan ketika first time
          if (localStorage.getItem("firstTime") == "true") {
            this.navCtrl.navigateRoot('/swiper');
          } else {
            this.navCtrl.navigateRoot('/tabs');
          }
        } else {
          loading.dismiss();
          const toast = await this.toastController.create({
            duration: 2000,
            color: 'danger',
            message: 'E-mail / password tidak valid. Masukkan data dengan benar',
            buttons: [
              {
                side: 'start',
                icon: 'alert'
              }
            ]
          });
          toast.present();
        }
        console.log(data);
      }, async error => {
        const toast = await this.toastController.create({
          duration: 2000,
          color: 'danger',
          message: 'Koneksi tidak stabil',
          buttons: [{ side: 'start', icon: 'wifi' }]
        });
        toast.present();
        loading.dismiss();
        console.log(error);
      });

  }

  // LOGOUT SERVICE
  public logOut() {
    localStorage.clear();
    this.navCtrl.navigateRoot('');
  }


  // ALAMAT SERVICE
  public loadAlamat() {
    return new Promise((resolve, reject) => {
      this.http.get("https://api.cateringsurabaya.co.id/index.php/api/Master_Location/selectData?id_user=" + this.user.id)
        .subscribe(data => {
          console.log("===== Load Alamat =====")
          resolve(data);
        });
    })
  }

  public insertAlamat(data) {
    // ======= Cara Menggunakan Promise yang Baik dan Benar ======= 
    // data(id,name,adress,kecamatan,kelurahan,kodepos,detail)
    return new Promise((resolve, reject) => {
      this.http.post("https://api.cateringsurabaya.co.id/index.php/api/Master_Location/insertData", JSON.stringify(data))
        .subscribe(data => {
          resolve("Berhasil Tambah Alamat");
        }, error => {
          reject("Gagal Tambah Alamat");
          console.log(error);
        });
    })
  }

  public updateAlamat(data) {
    // Butuh (id,name,address, kecamatan,kelurahan,kodepos,detail)
    return new Promise((resolve, reject) => {
      this.http.post("https://api.cateringsurabaya.co.id/index.php/api/Master_Location/updateData", JSON.stringify(data))
        .subscribe(data => {
          resolve("Berhasil Update Alamat");
          console.log(data);
        }, error => {
          reject("Gagal Update Alamat");
          console.log(error);
        });
    })
  }

  public deleteAlamat(data) {
    // Butuh (id)
    return new Promise((resolve, reject) => {
      this.http.post("https://api.cateringsurabaya.co.id/index.php/api/Master_Location/deleteData", JSON.stringify(data))
        .subscribe(data => {
          resolve("Berhasil Hapus Alamat");
          console.log(data);
        }, error => {
          reject("Gagal Hapus Alamat");
          console.log(error);
        });
    })
  }


  // PASSWORD SERVICE
  public updatePass(data) {
    // Butuh (id, password)
    return new Promise((resolve, reject) => {
      this.http.post("https://api.cateringsurabaya.co.id/index.php/api/Master_User/updatePass", JSON.stringify(data))
        .subscribe(data => {
          console.log(data);
          resolve("Berhasil Ubah Password");
        }, error => {
          reject("Gagal Ubah Password");
          console.log(error);
        });
    })
  }

  public lokasiAPI() {
    // 3578 = ID Surabaya
    return new Promise((resolve, reject) => {
      this.http.get("https://kodepos-2d475.firebaseio.com/kota_kab/k142.json?print=pretty")
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject("Jaringan tidak stabil");
          console.log(error);
        });
    })
  }

  public lokasiKelurahan(id) {
    // ID Kelurahan
    return new Promise((resolve, reject) => {
      this.http.get("http://api.iksgroup.co.id/apilokasi/kelurahan?kecamatan=" + id)
        .subscribe(data => {
          resolve(data);
        }, error => {
          reject("Jaringan tidak stabil");
          console.log(error);
        });
    })
  }
}
