import { Component, OnInit } from '@angular/core';
import { ItemService } from '../service/item.service';
import { ModalController, NavController } from '@ionic/angular';
import { MealboxCartPage } from '../mealbox-cart/mealbox-cart.page';
import { CartMealboxService } from '../service/cart-mealbox.service';

@Component({
  selector: 'app-mealbox',
  templateUrl: './mealbox.page.html',
  styleUrls: ['./mealbox.page.scss'],
})
export class MealboxPage implements OnInit {

  items: any; itemsFav: any;
  cart: any = [];

  constructor(
    private itemService: ItemService,
    private modalCtrl: ModalController,
    private cartService: CartMealboxService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.items = null; let kueri: any = { id_kategori: 3 };
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
    this.navCtrl.navigateForward('/mealbox-detail');
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: MealboxCartPage
    });
    modal.present();
  }

}
