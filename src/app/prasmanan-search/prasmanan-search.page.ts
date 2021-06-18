import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { ItemService } from '../service/item.service';
import { CartService } from '../service/cart.service';
import { PrasmananCartPage } from '../prasmanan-cart/prasmanan-cart.page';

@Component({
  selector: 'app-prasmanan-search',
  templateUrl: './prasmanan-search.page.html',
  styleUrls: ['./prasmanan-search.page.scss'],
})
export class PrasmananSearchPage implements OnInit {

  data: any; items: any; kueri: any = { search: '', id_kategori: 1 }; label: any;
  cart: any = []; loading: boolean = false; found: boolean = true; dataMenu: any;

  constructor(
    private itemService: ItemService,
    private modalCtrl: ModalController,
    private cartService: CartService,
    private navCtrl: NavController,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.items = null; this.cart = this.cartService.getCart();
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

  async filterItem() {
    this.dataMenu = [
      {
        type: 'checkbox',
        label: 'Makanan',
        value: 'Makanan',
        checked: true
      },
      {
        type: 'checkbox',
        label: 'Ayam',
        value: 'Ayam'
      },
      {
        type: 'checkbox',
        label: 'Minuman',
        value: 'Minuman'
      },
      {
        type: 'checkbox',
        label: 'Sayur',
        value: 'Sayur'
      },
      {
        type: 'checkbox',
        label: 'Sup',
        value: 'Sup'
      }
    ];

    const alert = await this.alertController.create({
      header: 'Filter',
      subHeader: 'Filter menu berdasarkan',
      inputs: this.dataMenu,
      buttons: [
        {
          text: 'Reset', role: 'cancel', handler: () => {
            this.items = this.data;
          }
        },
        {
          text: 'Filter',
          handler: data => {
            console.log(this.data);
            this.items = this.data.filter(({ name_label }) => data.some(n => name_label.includes(n)));
            if (this.items.length == 0) { this.found = false; this.items = null };
            console.log(this.items);
          }
        }
      ]
    });

    await alert.present();
  }

  async sortItem() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Urutkan berdasarkan',
      buttons: [{
        text: 'Harga Tertinggi',
        icon: 'trending-up',
        handler: () => {
          this.items = this.items.sort((a, b) => 0 - (parseFloat(a.price) > parseFloat(b.price) ? 1 : -1));
        }
      }, {
        text: 'Harga Terendah',
        icon: 'trending-down',
        handler: () => {
          this.items = this.items.sort((a, b) => 0 - (parseFloat(a.price) > parseFloat(b.price) ? -1 : 1));
        }
      }, {
        text: 'Rating Tertinggi',
        icon: 'star',
        handler: () => {
          this.items = this.items.sort((a, b) => 0 - (parseFloat(a.jumlah_rate) > parseFloat(b.jumlah_rate) ? 1 : -1));
        }
      }, {
        text: 'Rating Terendah',
        icon: 'star-half',
        handler: () => {
          this.items = this.items.sort((a, b) => 0 - (parseFloat(a.jumlah_rate) > parseFloat(b.jumlah_rate) ? -1 : 1));
        }
      }, {
        text: 'Batal',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    actionSheet.present()
  }

  findItem() {
    this.items = null;
    if (this.kueri.search != '') {
      this.loading = true;
      this.itemService.loadItem(this.kueri).then((resp) => {
        if (resp["success"]) { this.data = resp["result"]; this.found = true; this.items = this.data } else { this.found = false; }
        this.loading = false;
      });
    }
  }

}
