import { Component, OnInit } from '@angular/core';
import { ItemService } from '../service/item.service';
import { ModalController, NavController } from '@ionic/angular';
import { CbreakCartPage } from '../cbreak-cart/cbreak-cart.page';
import { CartCbreakService } from '../service/cart-cbreak.service';

@Component({
  selector: 'app-cbreak',
  templateUrl: './cbreak.page.html',
  styleUrls: ['./cbreak.page.scss'],
})
export class CbreakPage implements OnInit {

  items: any; itemsFav: any;
  cart: any = [];

  constructor(
    private itemService: ItemService,
    private modalCtrl: ModalController,
    private cartService: CartCbreakService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.items = null; let kueri: any = { id_kategori: 2 };
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
    this.navCtrl.navigateForward('/cbreak-detail');
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CbreakCartPage
    });
    modal.present();
  }

  filterSearch() {

  }
}
