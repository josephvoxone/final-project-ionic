import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController, ToastController, NavController } from '@ionic/angular';
import { CartService } from '../service/cart.service';
import { TransaksiService } from '../service/transaksi.service';
import { CartMealboxService } from '../service/cart-mealbox.service';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-mealbox-cart',
  templateUrl: './mealbox-cart.page.html',
  styleUrls: ['./mealbox-cart.page.scss'],
})
export class MealboxCartPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private cartService: CartMealboxService,
    private alertController: AlertController,
    private toastController: ToastController,
    private navCtrl: NavController,
    private transService: TransaksiService,
    private compService: CompanyService

  ) { }

  selectedItems = [];
  subtotal = 0; porsi = this.transService.htransMbox.porsi; total = 0;
  minPor = JSON.parse(localStorage.getItem("dataCompany")).nasikotak;

  ngOnInit() {
    if (this.transService.htransMbox.porsi < parseFloat(this.minPor)) {
      this.transService.htransMbox.porsi = this.minPor;
    }
    let items = this.cartService.getCart();
    this.porsi = this.transService.htransMbox.porsi;
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
            this.transService.htransMbox.porsi = data.porsi;
            this.ngOnInit();
          }
          console.log(data);
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

    // Set Porsi
    this.transService.htransMbox.porsi = this.porsi;
    console.log(this.cartService.getCart());

    var arrLabel = [];
    this.cartService.getCart().forEach(element => {
      var labelKey = element.name_label.split(",");
      labelKey.forEach(detailLabel => {
        // console.log(detailLabel);
        if (arrLabel[detailLabel] == undefined) {
          arrLabel[detailLabel] = 1;
        } else {
          arrLabel[detailLabel] += 1;
        }
      });
      // console.log(element.name_label);
    });

    console.log(arrLabel);

    // if( arrLabel["Olahan"] < 2 ){
    //   const toast = await this.toastController.create({
    //     message: "Harus 5 Olahan untuk pemesanan Nasi Kotak, tambahkan menu lagi",
    //     duration: 5000,
    //     position: "top",
    //     color: 'danger',
    //     buttons: [{ side: 'start', icon: 'information-circle' }]
    //   });
    //   toast.present();
    //   return;
    // }

    if (this.cartService.getCart().length < 5) {
      const toast = await this.toastController.create({
        message: "Harus 5 Menu untuk pemesanan Nasi Kotak, tambahkan menu lagi",
        duration: 5000,
        position: "top",
        color: 'danger',
        buttons: [{ side: 'start', icon: 'information-circle' }]
      });
      toast.present();
    } else if (this.cartService.getCart().length > 5) {
      const toast = await this.toastController.create({
        message: "Maksimal 5 Menu untuk pemesanan Nasi Kotak, hapus salah satu menu",
        duration: 5000,
        position: "top",
        color: 'danger',
        buttons: [{ side: 'start', icon: 'information-circle' }]
      });
      toast.present();
    } else {
      // Load Company
      this.compService.loadCompany().then((resp) => {
        console.log(resp);
        // Ketika Prasmanan
        this.navCtrl.navigateForward(['/order', { tipe: 'mealbox' }]);
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
