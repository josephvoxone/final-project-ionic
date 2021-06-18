import { Component, OnInit } from '@angular/core';
import { TransaksiService } from '../service/transaksi.service';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { ToastController, ActionSheetController, AlertController, ModalController, NavController, Platform } from '@ionic/angular';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { OrderOpsiPage } from '../order-opsi/order-opsi.page';

@Component({
  selector: 'app-order-selesai',
  templateUrl: './order-selesai.page.html',
  styleUrls: ['./order-selesai.page.scss'],
})
export class OrderSelesaiPage implements OnInit {

  constructor(
    private transService: TransaksiService,
    private clipboard: Clipboard,
    private toastController: ToastController,
    private route: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private platform:Platform
  ) { 
    // Ketika Diback Button =)
    this.platform.backButton.subscribe(() => {
      this.navCtrl.navigateBack(['/tabs/app/tabs/tab-order']);
    });  
  }

  trans: any = {
    status_text: '', tgl_kirim: '', tgl_trans: '', subtotal: '', bukti_bayar: ''
  };
  company: any = {
    no_rek: JSON.parse(localStorage.getItem("dataCompany")).no_rek,
    bank_name: JSON.parse(localStorage.getItem("dataCompany")).bank_name,
    nama_rek: JSON.parse(localStorage.getItem("dataCompany")).nama_rek
  }
  selectedItems: any = []; review: any = { rate_taste: 0, rate_work: 0, rate_time: 'Tepat Waktu' };

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }
  
  ngOnInit() {
    this.ionViewWillEnter()
  }

  ionViewWillEnter() {
    let htrans: any = {}; htrans.id_htrans = this.route.snapshot.paramMap.get('id');
    this.transService.getHeader(htrans).then((resp) => {
      this.trans = resp["result"][0];
      // Calculate Subtotal
      this.trans.subtotal = parseFloat(this.trans.total) - parseFloat(this.trans.ongkir)
      // Status Transaksi
      // 0. Menunggu Diterima 1. Menunggu Pembayaran
      // -1. Dibatalkan -2. Tidak Diterima(Jadwal Padat) -3.Pembayaran tidak valid -4.Expired
      // 2. Diproses 3. Mengirim 4. Terkirim
      switch (parseInt(this.trans.status_order)) {
        case 0:
          this.trans.status_text = "Menunggu Diterima";
          this.trans.icon = "hourglass";
          this.trans.info = "Pesanan anda sedang dikonfirmasi oleh pihak katering, pembayaran akan ditampilkan setelah dikonfirmasi.";
          break;
        case 1:
          if (this.trans.bukti_bayar != null) {
            this.trans.status_text = "Pembayaran sedang diproses";
            this.trans.info = "Terima kasih sudah memasukan bukti pembayaran, bukti pembayaran sedang dikonfirmasi.";
          }
          else {
            this.trans.status_text = "Menunggu Pembayaran";
            this.trans.info = "Silakan transfer di nomor rekening katering yang tersedia.";
          }
          this.trans.icon = "wallet";
          break;
        case 2:
          this.trans.status_text = "Diproses";
          this.trans.icon = "color-wand";
          this.trans.info = "Pesanan katering anda sedang dibuat sesuai dengan jadwal pesanan anda.";
          break;
        case 3:
          this.trans.status_text = "Mengirim";
          this.trans.icon = "car";
          this.trans.info = "Pihak katering sedang mengirim ke tempat anda.";
          break;
        case 4:
          this.trans.status_text = "Selesai";
          this.trans.icon = "done-all";
          break;
        case -1:
          this.trans.status_text = "Dibatalkan";
          this.trans.icon = "close-circle";
          break;
        case -2:
          this.trans.status_text = "Tidak Diterima(Jadwal Padat)";
          this.trans.icon = "calendar";
          this.trans.info = "Pesanan anda ditolak, anda dapat mengubah jadwal pesanan.";
          break;
        case -3:
          this.trans.status_text = "Pembayaran Tidak Valid";
          this.trans.icon = "warning";
          this.trans.info = "Silakan masukkan bukti pembayaran yang valid.";
          break;
        case -3:
          this.trans.status_text = "Expired";
          this.trans.icon = "timer";
          break;
        default:
          this.trans.status_text = "Loading..";
          this.trans.icon = "refresh";
          break;
      }
      this.trans.tgl_kirim = moment(this.trans.date_send, 'YYYY-MM-DD hh:mm').locale('ID').format('lll');
      this.trans.tgl_trans = moment(this.trans.date_trans, 'YYYY-MM-DD hh:mm').locale('ID').format('lll');
    });
    this.transService.getDetail(htrans.id_htrans).then((resp) => {
      this.selectedItems = resp["result"];
    });
    // Pengecekan Review
    this.transService.getReview(htrans.id_htrans).then((resp) => {
      this.review = resp["result"];
      console.log(this.review)
    });
  }

  async copyClip(data) {
    const toast = await this.toastController.create({
      message: "Berhasil Salin",
      duration: 2000,
      color: 'success',
      buttons: [{ side: 'start', icon: 'browsers' }]
    });
    toast.present();
    this.clipboard.copy(data);
  }

  async openCart(choice) {
    console.log(choice);
    const modal = await this.modalCtrl.create({
      component: OrderOpsiPage,
      componentProps: {
        something: choice,
        other: { couldAlsoBeAnObject: true }
      }
    });
    modal.present();
  }

  async updateDate(choice = '') {
    // id, date_trans, bank_name, no_rekening, bukti_bayar, status_order, status_aktif
    let data: any = {}; data.id = this.route.snapshot.paramMap.get('id');

    if (choice == 'tanggal') {
      // Ubah Tanggal
      if (this.trans.bukti_bayar == null || this.trans.bukti_bayar == '') {
        data.choice = 'tanggal';
        this.openCart(data);
      } else {
        const toast = await this.toastController.create({
          message: "Pembayaran Sedang Diproses",
          duration: 2000,
          position: "bottom",
          color: 'danger',
          buttons: [{ side: 'start', icon: 'information-circle' }]
        });
        toast.present();
      }
    } else if (choice == 'bayar') {
      // Tampilkan Modal
      if (this.trans.bukti_bayar == null || this.trans.bukti_bayar == '') {
        data.choice = 'bayar';
        this.openCart(data);
      } else {
        const toast = await this.toastController.create({
          message: "Pembayaran Sedang Diproses",
          duration: 2000,
          position: "bottom",
          color: 'danger',
          buttons: [{ side: 'start', icon: 'information-circle' }]
        });
        toast.present();
      }
    } else {
      // Dibatalkan
      const alert = await this.alertController.create({
        header: 'Batalkan Pesanan',
        message: 'Apakah anda yakin ingin membatalkan pesanan ini ?',
        buttons: [
          {
            text: 'Batal',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Yakin',
            handler: () => {
              data.status_order = -1;
              this.transService.updateStatus(data).then((resp) => {
                console.log(resp["result"]);
                this.navCtrl.navigateBack('/tabs/app/tabs/tab-order');
              });
            }
          }
        ]
      });
      await alert.present();
    }

  }

  async presentChoice() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Atur Pesanan anda',
      buttons: []
    });
    if (this.trans.status_order == 1 || this.trans.status_order == -3) {
      // Konfirmasi Ketika
      actionSheet.buttons = [{
        text: 'Ubah Tanggal Pengiriman',
        icon: 'calendar',
        handler: () => {
          this.updateDate('tanggal');
        }
      }, {
        text: 'Konfirmasi Pembayaran',
        icon: 'card',
        handler: () => {
          this.updateDate('bayar');
        }
      }, {
        text: 'Batalkan Pesanan',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.updateDate();
        }
      }, {
        text: 'Batal',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    } else if (this.trans.status_order == 0 || this.trans.status_order == -2) {
      // Ubah Tanggal Ketika
      actionSheet.buttons = [{
        text: 'Ubah Tanggal Pengiriman',
        icon: 'calendar',
        handler: () => {
          this.updateDate('tanggal');
        }
      }, {
        text: 'Batalkan Pesanan',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.updateDate();
        }
      }, {
        text: 'Batal',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    }
    actionSheet.present();
  }

}
