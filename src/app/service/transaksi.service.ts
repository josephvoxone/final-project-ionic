import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { LoadingController } from '@ionic/angular';
import { CartMealboxService } from './cart-mealbox.service';
import { CartCbreakService } from './cart-cbreak.service';

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {

  public htrans: any = {
    id_user: JSON.parse(localStorage.getItem("dataUser")).id,
    id_item_kategori: 1,  //Halaman Cart
    porsi: 50,             //Halaman Cart
    id_location: '',       //Halaman Order
    ongkir: '',            //Halaman Order
    total: '',             //Halaman Order
    catatan: '',           //Halaman Order
    date_send: '',         //Halaman Order
    id_decoration: '',
    bank_name: '',
    no_rekening: ''
  };

  public htransMbox: any = {
    id_user: JSON.parse(localStorage.getItem("dataUser")).id,
    id_item_kategori: 3,  //Halaman Cart
    porsi: 20,             //Halaman Cart
    id_location: '',       //Halaman Order
    ongkir: '',            //Halaman Order
    total: '',             //Halaman Order
    catatan: '',           //Halaman Order
    date_send: '',         //Halaman Order
    id_decoration: '',
    bank_name: '',
    no_rekening: ''
  };

  public htransCbreak: any = {
    id_user: JSON.parse(localStorage.getItem("dataUser")).id,
    id_item_kategori: 2,  //Halaman Cart
    porsi: 50,             //Halaman Cart
    id_location: '',       //Halaman Order
    ongkir: '',            //Halaman Order
    total: '',             //Halaman Order
    catatan: '',           //Halaman Order
    date_send: '',         //Halaman Order
    id_decoration: '',
    bank_name: '',
    no_rekening: ''
  };

  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private cartMbox: CartMealboxService,
    private cartCbreak: CartCbreakService,
    private loadingController: LoadingController
  ) { }

  convertParamGet(httpData: any) {
    let result_convert_array = "";
    if (httpData != []) {
      let convert_array = [];
      Object.keys(httpData).forEach(function (key) {
        let val = httpData[key];
        if (httpData[key] != undefined && httpData[key] != "" && httpData[key] != null) {
          let string_result_convert = key + "=" + httpData[key];
          convert_array.push(string_result_convert);
        }
      });
      result_convert_array = "&" + convert_array.join("&");
    }
    return result_convert_array;
  }

  getShowkode() {
    return new Promise((resolve) => {
      this.http.get("https://api.cateringsurabaya.co.id/index.php/api/Transaksi/showKode", { responseType: 'text' })
        .subscribe(data => {
          console.log(data); this.htrans.kode = data;
          resolve(data);
        });
    })
  }

  getHeader(data = '') {
    // id_htrans, id_kategori, id_user, kode, price, kode_unik, total, catatan, date_trans, date_send
    // bank_name, no_rekening, bukti_bayar, name_kategori, address, status_order - PRICE GAK JALAN
    return new Promise((resolve) => {
      this.http.get("https://api.cateringsurabaya.co.id/index.php/api/Transaksi/selectData?" + this.convertParamGet(data))
        .subscribe(data => {
          console.log(data);
          resolve(data);
        });
    })
  }

  getDetail(id) {
    // id
    return new Promise((resolve) => {
      this.http.get("https://api.cateringsurabaya.co.id/index.php/api/Transaksi/selectDetail?id_htrans=" + id)
        .subscribe(data => {
          console.log(data);
          resolve(data);
        });
    })
  }

  async insertData(tipe) {
    // id_user, id_item_kategori ,id_decoration, id_location, kode, ongkir, porsi, total, catatan,date_send   
    const loading = await this.loadingController.create({
      message: 'Membuat Pesanan'
    });
    await loading.present();
    // Seleski Tipe
    let allHtrans: any;
    console.log("TIPE : " + tipe);
    if (tipe == 'prasmanan') {
      this.htrans.dtrans = this.cartService.getCart(); console.log(this.htrans.dtrans.length);
      allHtrans = this.htrans;
    } else if (tipe == 'mealbox') {
      this.htransMbox.dtrans = this.cartMbox.getCart(); console.log(this.htransMbox.dtrans.length);
      allHtrans = this.htransMbox;
    } else if (tipe == 'cbreak') {
      this.htransCbreak.dtrans = this.cartCbreak.getCart(); console.log(this.htransCbreak.dtrans.length);
      allHtrans = this.htransCbreak;
    }
    console.log(allHtrans);
    return new Promise(async (resolve, reject) => {
      this.http.post("https://api.cateringsurabaya.co.id/index.php/api/Transaksi/insertDataAllData", JSON.stringify(allHtrans))
        .subscribe((data) => {
          if (data["result"]) {
            console.log(data); loading.dismiss(); resolve(data);
            // Cleaning
            if (tipe == 'prasmanan') {
              this.cartService.cleanCart();
              this.htrans.porsi = 50;
            } else if (tipe == 'mealbox') {
              this.cartMbox.cleanCart();
              this.htransMbox.porsi = 20;
            } else if (tipe == 'cbreak') {
              this.cartCbreak.cleanCart();
              this.htransCbreak.porsi = 50;
            }
          }
        }, error => {
          reject("Gagal Membuat Transaksi");
          console.log(error);
        });
    });
  }

  updateBayar(data) {
    // id, bank_name, no_rekening, bukti_bayar, status_order
    console.log(data);
    return new Promise((resolve, reject) => {
      this.http.post("https://api.cateringsurabaya.co.id/index.php/api/Transaksi/updateBayar", JSON.stringify(data))
        .subscribe(hasil => {
          resolve(hasil);
          console.log(data);
        }, error => {
          reject(error);
          console.log(error);
        });
    })
  }

  updateTanggal(data) {
    // id, date_send, status_order
    console.log(data);
    return new Promise((resolve, reject) => {
      this.http.post("https://api.cateringsurabaya.co.id/index.php/api/Transaksi/updateTanggal", JSON.stringify(data))
        .subscribe(hasil => {
          resolve(hasil);
          console.log(data);
        }, error => {
          reject(error);
          console.log(error);
        });
    })
  }

  updateStatus(data) {
    // id, status_order
    console.log(data);
    return new Promise((resolve, reject) => {
      this.http.post("https://api.cateringsurabaya.co.id/index.php/api/Transaksi/updateStatus", JSON.stringify(data))
        .subscribe(hasil => {
          resolve(hasil);
          console.log(data);
        }, error => {
          reject(error);
          console.log(error);
        });
    })
  }

  getReview(id) {
    // id
    return new Promise((resolve) => {
      this.http.get("https://api.cateringsurabaya.co.id/index.php/api/Laporan/selectReview?id_htrans=" + id)
        .subscribe(data => {
          console.log(data);
          resolve(data);
        });
    })
  }

}
