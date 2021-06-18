import { Component, OnInit } from '@angular/core';
import { ItemService } from '../service/item.service';
import { ModalController, NavController } from '@ionic/angular';
import { PrasmananCartPage } from '../prasmanan-cart/prasmanan-cart.page';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-prasmanan',
  templateUrl: './prasmanan.page.html',
  styleUrls: ['./prasmanan.page.scss'],
})
export class PrasmananPage implements OnInit {

  items: any; itemsFav: any;
  cart: any = [];

  constructor(
    private itemService: ItemService,
    private modalCtrl: ModalController,
    private cartService: CartService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.items = null; let kueri: any = { id_kategori: 1 };
    this.itemService.loadItem(kueri).then((resp) => {
      if (resp["success"]) { this.items = resp["result"]; }
    });
    this.itemService.loadItem(kueri).then((resp) => {
      if (resp["success"]) {
        resp["result"].length = 5;
        this.itemsFav = resp["result"].sort((a, b) => 0 - (parseFloat(a.jumlah_rate) > parseFloat(b.jumlah_rate) ? 1 : -1));
      }
    });
    this.cart = this.cartService.getCart();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }

  gotoPras(item) {
    localStorage.setItem("passing", JSON.stringify(item));
    this.navCtrl.navigateForward('/prasmanan-detail');
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: PrasmananCartPage
    });
    modal.present();
  }

  filterSearch() {

  }

}
