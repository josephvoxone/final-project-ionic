import { Component } from '@angular/core';
import { TransaksiService } from '../service/transaksi.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tab-order',
  templateUrl: 'tab-order.page.html',
  styleUrls: ['tab-order.page.scss'],
})
export class TabOrderPage {

  constructor(
    private tranService: TransaksiService,
  ) { }

  headers: any = []; dataTrans: any = []; loading: boolean;

  ngOnInit() {
    let ev: any = { target: [] }; ev.target.value = 'proses';
    this.gantiStatus(ev);
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.target.complete();
    }, 2000);
  }


  gantiStatus(ev: any = '') {
    console.log('Segment changed', ev.target.value); this.loading = true;
    // id_htrans, id_kategori, id_user, kode, price, kode_unik, total, catatan, date_trans, date_send
    // bank_name, no_rekening, bukti_bayar, name_kategori, address, status_order - PRICE GAK JALAN
    let user: any = {}; user.id_user = JSON.parse(localStorage.getItem("dataUser")).id;
    this.tranService.getHeader(user).then((resp) => {
      this.dataTrans = resp["result"];
      if (resp["success"]) {
        // Status Transaksi
        // 0. Menunggu Diterima 1. Menunggu Pembayaran
        // -1. Dibatalkan -2. Tidak Diterima(Jadwal Padat)  -3.Pembayaran tidak valid -4.Expired
        // 2. Diproses 3. Mengirim 4. Terkirim
        this.dataTrans.forEach(data => {
          switch (parseInt(data.status_order)) {
            case 0:
              data.status_text = "Menunggu Diterima";
              data.icon = "hourglass";
              break;
            case 1:
              if (data.bukti_bayar != null) { data.status_text = "Pembayaran sedang diproses"; }
              else { data.status_text = "Menunggu Pembayaran"; }
              data.icon = "wallet";
              break;
            case 2:
              data.status_text = "Diproses";
              data.icon = "color-wand";
              break;
            case 3:
              data.status_text = "Mengirim";
              data.icon = "car";
              break;
            case 4:
              data.status_text = "Selesai";
              data.icon = "done-all";
              break;
            case -1:
              data.status_text = "Dibatalkan";
              data.icon = "close-circle";
              break;
            case -2:
              data.status_text = "Tidak Diterima(Jadwal Padat)";
              data.icon = "calendar";
              break;
            case -3:
              data.status_text = "Pembayaran tidak valid";
              data.icon = "warning";
              break;
            case -4:
              data.status_text = "Expired";
              data.icon = "timer";
              break;
            default:
              data.status_text = "Loading..";
              data.icon = "hourglass";
              break;
          }
          // Setting Waktu
          data.waktu = moment(data.date_send, 'YYYY-MM-DD hh:mm').locale('ID').format('lll');
        });

        // Change Segment
        if (ev.target.value == 'selesai') {
          this.headers = this.dataTrans.filter(e => e.status_order == 4);
        } else if (ev.target.value == 'batal') {
          this.headers = this.dataTrans.filter(e => e.status_order == -4 || e.status_order == -1);
        } else {
          // Else Proses
          this.headers = this.dataTrans.filter(e => e.status_order < 4 && e.status_order != -1 && e.status_order != -4);
        }
      }
      console.log(this.headers);
      this.loading = false;
    })
  }

}

