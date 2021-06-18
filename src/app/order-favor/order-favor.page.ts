import { Component, OnInit } from '@angular/core';
import { TransaksiService } from '../service/transaksi.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { RatingService } from '../service/rating.service';

@Component({
  selector: 'app-order-favor',
  templateUrl: './order-favor.page.html',
  styleUrls: ['./order-favor.page.scss'],
})
export class OrderFavorPage implements OnInit {

  constructor(
    private transService: TransaksiService,
    private alertController: AlertController,
    private ratingService: RatingService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) { }

  review: any = {}
  selectedItems: any = [];
  itemfavor: any = [];

  ngOnInit() {
    this.review = JSON.parse(localStorage.getItem("passing"));
    this.review.id_user = JSON.parse(localStorage.getItem("dataUser")).id;
    this.transService.getDetail(this.review.id_htrans).then((resp) => {
      this.selectedItems = resp["result"];
    });
    console.log(this.review);
    console.log(this.selectedItems);
  }

  getCheckboxValues(ev, id_item) {
    let id = { id_item: id_item, id_htrans: this.review.id_htrans, id_user: JSON.parse(localStorage.getItem("dataUser")).id }
    if (ev.target.checked) {
      this.itemfavor.push(id);
    } else {
      let el = this.itemfavor.find(itm => itm.id_item === id.id_item);
      if (el) { this.itemfavor.splice(this.itemfavor.indexOf(el), 1) };
    }
    console.log(this.itemfavor);
  }

  async goKirim() {
    // Dibatalkan
    const alert = await this.alertController.create({});
    if (this.itemfavor.length == 0) {
      alert.header = 'Tidak ada menu favorit';
      alert.message = "Apakah anda yakin melanjutkan tanpa memilih menu favorit ?";
      alert.buttons = [{
        text: 'Batal', role: 'cancel', cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel: blah');
        }
      }, {
        text: 'Yakin',
        handler: () => {
          // Fungsi
          this.insertReview();
        }
      }
      ]
      alert.present();
    } else {
      this.insertReview();
    }
  }

  async insertReview() {
    this.review.item_favorite = this.itemfavor;
    console.log(this.review);
    const toast = await this.toastController.create({
      message: "Terima Kasih sudah memberikan umpan balik",
      duration: 2000, position: "top", color: 'success',
      buttons: [{ side: 'start', icon: 'happy' }]
    });
    this.ratingService.insertData(this.review).then((resp) => {
      if (resp["success"]) {
        toast.present(); console.log(resp);
        this.navCtrl.navigateForward(['/order-selesai', { id: this.review.id_htrans }]);
      }
    });
  }

}
