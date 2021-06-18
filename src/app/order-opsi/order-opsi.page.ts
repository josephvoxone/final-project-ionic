import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController, ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { TransaksiService } from '../service/transaksi.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-order-opsi',
  templateUrl: './order-opsi.page.html',
  styleUrls: ['./order-opsi.page.scss'],
})
export class OrderOpsiPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private transService: TransaksiService,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController,
    private camera: Camera,
    private loadingController: LoadingController,
    private navCtrl: NavController
  ) { }

  data: any = {};
  trans: any = { tanggal: '', jam: '', bank_name: '', nama_rekening: '', no_rekening: '', bukti_bayar: '' };
  minDate = moment().add(4, 'd').format();

  ngOnInit() {
    this.data = this.navParams.get('something');
    if (this.data.choice == 'tanggal') {
      this.data.title = "Ubah Tanggal";
    } else {
      this.data.title = "Konfirmasi Pembayaran";
    }
    console.log(this.data);
  }

  async updateTanggal() {
    // id, date_send, bank_name, no_rekening, bukti_bayar, status_order, status_aktif
    const toast = await this.toastController.create({
      duration: 2000,
      color: 'danger',
      position: 'top',
      buttons: [{ side: 'start', icon: 'alert' }]
    });
    if (this.trans.tanggal == "") {
      toast.message = 'Pastikan Tanggal Kirim sudah terisi';
      toast.present();
    } else if (this.trans.jam == "") {
      toast.message = 'Pastikan Jam pengiriman sudah terisi';
      toast.present();
    } else {
      let tanggalKirim = moment(this.trans.tanggal).format('YYYY-MM-DD') + " " + moment(this.trans.jam).format('HH:mm')
      this.data.date_send = tanggalKirim;
      this.data.status_order = 0;
      console.log(this.data);
      this.transService.updateTanggal(this.data).then((resp) => {
        console.log(resp["result"]);
        this.disModal(); this.navCtrl.navigateBack('/tabs/app/tabs/tab-order');
      });
    }
  }

  async konfirmasiBayar() {
    // id, bank_name, nama_rekening, no_rekening, bukti_bayar, status_order, status_aktif
    const toast = await this.toastController.create({
      duration: 2000,
      color: 'danger',
      position: 'top',
      buttons: [{ side: 'start', icon: 'alert' }]
    });
    if (this.trans.bank_name == "") {
      toast.message = 'Pastikan nama bank sudah terisi';
      toast.present();
    } else if (this.trans.nama_rekening == "") {
      toast.message = 'Pastikan nama rekening sudah terisi';
      toast.present();
    } else if (this.trans.no_rekening == "") {
      toast.message = 'Pastikan nomor rekening sudah terisi';
      toast.present();
    } else if (this.trans.bukti_bayar == "") {
      toast.message = 'Pastikan bukti bayar sudah terupload';
      toast.present();
    } else {
      const loading = await this.loadingController.create({
        message: 'Mengirim Bukti Bayar',
      });
      await loading.present();
      this.trans.id = this.data.id;
      this.trans.status_order = 1;
      console.log(this.trans);
      this.transService.updateBayar(this.trans).then((resp) => {
        console.log(resp["result"]);
        loading.dismiss();
        this.disModal(); this.navCtrl.navigateBack('/tabs/app/tabs/tab-order');
      });
    }

  }

  disModal() {
    this.modalCtrl.dismiss();
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
      this.trans.bukti_bayar = 'data:image/jpeg;base64,' + imageData;
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
      this.trans.bukti_bayar = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
      console.log(err);
    });
  }

  async presentChoice() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Unggah Bukti Bayar',
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
