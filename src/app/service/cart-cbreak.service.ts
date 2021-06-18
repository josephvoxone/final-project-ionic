import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CartCbreakService {

  private cart: any = [];
  private data: any = [];

  constructor(
    private toastController: ToastController,
  ) { }

  getItem() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  async addItem(item) {
    const toast = await this.toastController.create({
      duration: 2000,
      position: "top",
      buttons: [{ side: 'start', icon: 'done-all' }]
    });
    let items = this.getCart();
    let data = Object.assign({ id_item: item.id }, item);
    if (items.some(e => e.id === item.id)) {
      toast.message = "Sudah Ditambahkan";
      toast.color = 'warning';
      toast.present();
    } else {
      toast.message = "Berhasil Ditambahkan";
      toast.color = 'success';
      toast.present();
      this.cart.push(data);
    }
  }

  deleteItem(i) {
    if (i === 0) {
      this.cart.shift();
    } else {
      this.cart.splice(i, 1);
    }
  }

  cleanCart() {
    this.cart = []; this.data = [];
  }
}
