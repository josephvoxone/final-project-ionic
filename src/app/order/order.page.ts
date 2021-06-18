import { Component, OnInit, ViewChild } from '@angular/core';
import { TransaksiService } from '../service/transaksi.service';
import { CartService } from '../service/cart.service';
import { PrasmananCartPage } from '../prasmanan-cart/prasmanan-cart.page';
import { ModalController, IonContent, ToastController, NavController, LoadingController } from '@ionic/angular';
import { UserService } from '../service/user.service';
import * as moment from 'moment';
import { DekorasiService } from '../service/dekorasi.service';
import { CompanyService } from '../service/company.service';
import { ActivatedRoute } from '@angular/router';
import { CartMealboxService } from '../service/cart-mealbox.service';
import { CartCbreakService } from '../service/cart-cbreak.service';
import { CbreakCartPage } from '../cbreak-cart/cbreak-cart.page';
import { MealboxCartPage } from '../mealbox-cart/mealbox-cart.page';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})

export class OrderPage implements OnInit {

  constructor(
    private transaksiService: TransaksiService,
    private cartService: CartService,
    private cartMealbox: CartMealboxService,
    private cartCbreak: CartCbreakService,
    private modalCtrl: ModalController,
    private userService: UserService,
    private toastController: ToastController,
    private navCtrl: NavController,
    public decorService: DekorasiService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
  ) { }

  @ViewChild(IonContent) content: IonContent;

  trans: any = {
    ongkir: JSON.parse(localStorage.getItem("dataCompany")).ongkir, tanggal: '', jam: '', id_location: ''
  }

  selectedItems = []; alamat: any = []; decor: any = []; tipe: any;
  subtotal; porsi; total;

  minDate = moment().add(4, 'd').format(); langDate = moment(this.minDate, 'YYYY-MM-DD').locale('ID').format('ll')

  ngOnInit() {
  }

  async ionViewWillEnter() {
    // Setup ID User
    this.transaksiService.htrans.id_user = JSON.parse(localStorage.getItem("dataUser")).id;
    this.transaksiService.htransCbreak.id_user = JSON.parse(localStorage.getItem("dataUser")).id;
    this.transaksiService.htransMbox.id_user = JSON.parse(localStorage.getItem("dataUser")).id;
    
    // Menyeleksi Tipe
    this.tipe = this.route.snapshot.paramMap.get('tipe');
    // Load Pertama Kali Dekor
    if (this.transaksiService.htrans.id_decoration == '') {
      await this.decorService.loadDecor().then((resp) => {
        console.log(resp["success"]);
        if (resp["success"]) {
          // this.decor = resp["result"][0];
          this.decorService.dekorOrder = resp["result"][0];
          this.transaksiService.htrans.id_decoration = resp["result"][0].id;
          this.transaksiService.htransCbreak.id_decoration = resp["result"][0].id;
          this.transaksiService.htransMbox.id_decoration = resp["result"][0].id;
          console.log(this.decorService.dekorOrder.name);
        }
      });
      // Setting Ongkir
      this.trans.ongkir = parseInt(JSON.parse(localStorage.getItem("dataCompany")).ongkir);
    }
    // Load Company
    this.companyService.loadCompany();

    // Load Alamat
    await this.userService.loadAlamat().then((resp) => {
      if (resp["success"]) { this.alamat = resp["result"]; this.trans.id_location = this.alamat[0].id }
    });

    // Sortir Tipe
    if (this.tipe == 'prasmanan') {
      // Set Porsi
      this.porsi = this.transaksiService.htrans.porsi;
      let items = this.cartService.getCart();
      this.selectedItems = Object.keys(items).map(key => items[key]);
    } else if (this.tipe == 'mealbox') {
      // Set Porsi
      this.porsi = this.transaksiService.htransMbox.porsi;
      let items = this.cartMealbox.getCart();
      this.selectedItems = Object.keys(items).map(key => items[key]);
    } else if (this.tipe == 'cbreak') {
      // Set Porsi
      this.porsi = this.transaksiService.htransCbreak.porsi;
      let items = this.cartCbreak.getCart();
      this.selectedItems = Object.keys(items).map(key => items[key]);
    }

    this.subtotal = this.selectedItems.reduce((a, b) => a + parseFloat(b.price), 0);
    this.total = (this.subtotal * this.porsi) + parseFloat(this.trans.ongkir);
    // console.log(this.transaksiService.getHtrans());
  }

  async openCart() {
    if (this.tipe == 'prasmanan') {
      this.navCtrl.navigateForward('prasmanan');
      const modal = await this.modalCtrl.create({ component: PrasmananCartPage });
      modal.present();
    } else if (this.tipe == 'mealbox') {
      this.navCtrl.navigateForward('mealbox');
      const modal = await this.modalCtrl.create({ component: MealboxCartPage });
      modal.present();
    } else if (this.tipe == 'cbreak') {
      this.navCtrl.navigateForward('cbreak');
      const modal = await this.modalCtrl.create({ component: CbreakCartPage });
      modal.present();
    }
  }

  async confirmOrder() {
    const toast = await this.toastController.create({
      duration: 2000,
      color: 'danger',
      position: 'top',
      buttons: [{ side: 'start', icon: 'alert' }]
    });

    if (this.trans.tanggal == "") {
      this.content.scrollToTop(500); //Scroll to Top
      toast.message = 'Pastikan Tanggal Kirim sudah terisi';
      toast.present();
    } else if (this.trans.jam == "") {
      this.content.scrollToTop(500); //Scroll to Top
      toast.message = 'Pastikan Jam pengiriman sudah terisi';
      toast.present();
    } else if (this.trans.id_location == "") {
      this.content.scrollToTop(500); //Scroll to Top
      toast.message = 'Pastikan Alamat pengiriman sudah terpilih';
      toast.present();
    } else {
      this.content.scrollToBottom(500); //Scroll to Bottom
      if (this.tipe == 'prasmanan') {
        this.transaksiService.htrans.id_location = this.trans.id_location;
        this.transaksiService.htrans.ongkir = this.trans.ongkir;
        this.transaksiService.htrans.total = this.total;
        this.transaksiService.htrans.catatan = this.trans.catatan;
        let tanggalKirim = moment(this.trans.tanggal).format('YYYY-MM-DD') + " " + moment(this.trans.jam).format('HH:mm')
        this.transaksiService.htrans.date_send = tanggalKirim;
      } else if (this.tipe == 'mealbox') {
        this.transaksiService.htransMbox.id_location = this.trans.id_location;
        this.transaksiService.htransMbox.ongkir = this.trans.ongkir;
        this.transaksiService.htransMbox.total = this.total;
        this.transaksiService.htransMbox.catatan = this.trans.catatan;
        let tanggalKirim = moment(this.trans.tanggal).format('YYYY-MM-DD') + " " + moment(this.trans.jam).format('HH:mm')
        this.transaksiService.htransMbox.date_send = tanggalKirim;
      } else if (this.tipe == 'cbreak') {
        this.transaksiService.htransCbreak.id_location = this.trans.id_location;
        this.transaksiService.htransCbreak.ongkir = this.trans.ongkir;
        this.transaksiService.htransCbreak.total = this.total;
        this.transaksiService.htransCbreak.catatan = this.trans.catatan;
        let tanggalKirim = moment(this.trans.tanggal).format('YYYY-MM-DD') + " " + moment(this.trans.jam).format('HH:mm')
        this.transaksiService.htransCbreak.date_send = tanggalKirim;
      }

      this.transaksiService.insertData(this.tipe).then((resp) => {
        if (resp["success"]) {
          console.log(resp); this.navCtrl.navigateForward(['/order-selesai', { id: resp['id'] }]);
        }
      });

    }
    // console.log(this.transaksiService.getHtrans());
  }
}