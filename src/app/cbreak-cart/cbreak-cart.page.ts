import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, NavController } from '@ionic/angular';
import { CartService } from '../service/cart.service';
import { TransaksiService } from '../service/transaksi.service';
import { CartCbreakService } from '../service/cart-cbreak.service';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-cbreak-cart',
  templateUrl: './cbreak-cart.page.html',
  styleUrls: ['./cbreak-cart.page.scss'],
})
export class CbreakCartPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private cartService: CartCbreakService,
    private alertController: AlertController,
    private toastController: ToastController,
    private navCtrl: NavController,
    private transService: TransaksiService,
    private compService: CompanyService
  ) { }

  selectedItems = [];
  subtotal = 0; total = 0; minPor = JSON.parse(localStorage.getItem("dataCompany")).coffeebreak; porsi = this.transService.htransCbreak.porsi

  ngOnInit() {
    if (this.transService.htransCbreak.porsi < parseFloat(this.minPor)) {
      this.transService.htransCbreak.porsi = this.minPor;
    }
    this.porsi = this.transService.htransCbreak.porsi;
    let items = this.cartService.getCart();
    this.selectedItems = Object.keys(items).map(key => items[key])
    this.subtotal = items.reduce((a, b) => a + parseFloat(b.price), 0);
    this.total = this.subtotal * this.porsi;
  }

  disModal() {
    this.modalCtrl.dismiss();
  }

  hapusItem(i) {
    const index = this.selectedItems.indexOf(i);
    if (index > -1) {
      this.cartService.deleteItem(index);
      this.selectedItems.splice(index, 1);
    }
    this.subtotal = this.selectedItems.reduce((a, b) => a + parseFloat(b.price), 0);
    this.ngOnInit();
  }

  async setPorsi() {
    const alert = await this.alertController.create({
      header: 'Porsi',
      inputs: [{
        name: 'porsi',
        type: 'number',
        placeholder: "Min. " + this.minPor + ' Porsi',
        min: this.minPor,
        // max: 3000
      }],
      buttons: [{
        text: 'Batal',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ubah',
        handler: (data) => {
          if (parseFloat(data.porsi) < this.minPor) {
            this.minPorsi();
          } else if (parseFloat(data.porsi) > 5000) {
            this.maxPorsi();
          } else {
            // this.porsi = data.porsi;
            this.transService.htransCbreak.porsi = data.porsi;
            this.ngOnInit();
          }
        }
      }]
    });

    await alert.present();
  }

  async minPorsi() {
    const toast = await this.toastController.create({
      message: "Minimal " + this.minPor + " Porsi",
      duration: 2000,
      position: "top",
      color: 'danger',
      buttons: [{ side: 'start', icon: 'information-circle' }]
    });
    toast.present();
  }

  async maxPorsi() {
    const toast = await this.toastController.create({
      message: "Maksimal 5000 Porsi",
      duration: 2000,
      position: "top",
      color: 'danger',
      buttons: [{ side: 'start', icon: 'information-circle' }]
    });
    toast.present();
  }

  async confirmOrder() {
    const toast = await this.toastController.create({
      duration: 5000, position: "top", color: 'danger',
      buttons: [{ side: 'start', icon: 'restaurant' }]
    });

    if (this.cartService.getCart().length < 5) {
      toast.message = "Minimal 5 Menu untuk pemesanan Coffee Break, tambahkan menu lagi";
      toast.present();
    } else {
      // Load Company
      this.compService.loadCompany();
      // Set Porsi
      this.transService.htransCbreak.porsi = this.porsi;
      // Load Company
      this.compService.loadCompany().then((resp) => {
        console.log(resp);
        // Ketika Prasmanan
        this.navCtrl.navigateForward(['/order', { tipe: 'cbreak' }]);
        this.modalCtrl.dismiss();
      }).catch(async (err) => {
        const toast = await this.toastController.create({
          message: err,
          duration: 2000,
          position: "bottom",
          color: 'danger',
          buttons: [{ side: 'start', icon: 'wifi' }]
        });
        toast.present();
      });
    }
  }
}
