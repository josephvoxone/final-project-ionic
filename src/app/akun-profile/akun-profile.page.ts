import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ToastController, NavController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-akun-profile',
  templateUrl: './akun-profile.page.html',
  styleUrls: ['./akun-profile.page.scss'],
})
export class AkunProfilePage implements OnInit {

  user: any = {name:"",email:"",phone:""}; userold: any = {};

  constructor(
    private userService: UserService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private camera: Camera,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userService.loadUser().then((resp) => {
      this.user = resp["result"][0];
      if (this.user.gender == 0 && this.user.image == "") {
        this.user.imageDis = "assets/local/avatar/avatar-0.png";
      } else if (this.user.gender == 1 && this.user.image == "") {
        this.user.imageDis = "assets/local/avatar/avatar-1.png";
      } else if (this.user.image !== "" || this.user.image !== null) {
        this.user.imageDis = this.user.image;
      }
    }).catch((err) => {
      console.log(err);
    });

    this.userService.loadUser().then((resp) => {
      this.userold = resp["result"][0];
    }).catch((err) => {
      console.log(err);
    });
  }

  async updateProf() {
    const toast = await this.toastController.create({
      duration: 2000,
      position: "top",
      buttons: [{ side: 'start', icon: 'done-all' }]
    });
    if (this.user.name == "" || this.user.email == "" || this.user.phone == "") {
      toast.message = "Field tidak boleh Kosong"; toast.color = 'danger'; toast.present();
    } else {
      this.userService.updateUser(this.user).then((resp) => {
        toast.message = resp.toString(); toast.color = 'success';
        toast.present();
        this.navCtrl.back();
        console.log(resp);
      }).catch((err) => {
        toast.message = err.toString(); toast.color = 'danger';
        toast.present();
        this.navCtrl.back();
        console.log(err);
      });
    }
    return true;
  }

  uploadPhoto() {
    const options: CameraOptions = {
      quality: 50,
      targetWidth: 600,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true //may not work with some deices
    }

    this.camera.getPicture(options).then(async (imageData) => {
      const loading = await this.loadingController.create({
        message: 'Mengunggah Gambar',
      });
      await loading.present();
      this.user.image = 'data:image/jpeg;base64,' + imageData;
      this.user.imageDis = 'data:image/jpeg;base64,' + imageData;
      if (this.updateProf()) { loading.dismiss(); } else { loading.dismiss() }
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  galeriPhoto() {
    const options: CameraOptions = {
      quality: 50,
      targetWidth: 600,
      targetHeight: 600,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true //may not work with some deices
    }

    this.camera.getPicture(options).then(async (imageData) => {
      const loading = await this.loadingController.create({
        message: 'Mengunggah Gambar',
      });
      await loading.present();
      this.user.image = 'data:image/jpeg;base64,' + imageData;
      this.user.imageDis = 'data:image/jpeg;base64,' + imageData;
      if (this.updateProf()) { loading.dismiss(); } else { loading.dismiss() }
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  async presentChoice() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Atur Photo Profile',
      buttons: [{
        text: 'Kamera',
        icon: 'camera',
        handler: () => {
          this.uploadPhoto();
        }
      }, {
        text: 'Galeri',
        icon: 'images',
        handler: () => {
          this.galeriPhoto();
        }
      }, {
        text: 'Batal',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }



}
