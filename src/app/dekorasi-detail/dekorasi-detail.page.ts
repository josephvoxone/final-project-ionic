import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { TransaksiService } from '../service/transaksi.service';
import { DekorasiService } from '../service/dekorasi.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-dekorasi-detail',
  templateUrl: './dekorasi-detail.page.html',
  styleUrls: ['./dekorasi-detail.page.scss'],
})
export class DekorasiDetailPage implements OnInit {

  item: any = {}; tipe: any;
  show: boolean = true;

  constructor(
    private toastController: ToastController,
    private navCtrl: NavController,
    private tranService: TransaksiService,
    private decorService: DekorasiService,
    private photoViewer: PhotoViewer,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.tipe = this.route.snapshot.paramMap.get('tipe');
    this.item = JSON.parse(localStorage.getItem("passing"));
    console.log(this.item);
  }

  async setDecor(item) {
    const toast = await this.toastController.create({
      message: "Berhasil Dipilih",
      duration: 2000,
      position: "top",
      color: 'warning',
      buttons: [{ side: 'start', icon: 'done-all' }]
    });
    toast.present();
    this.tranService.htrans.id_decoration = item.id;
    this.decorService.dekorOrder = item;
    this.navCtrl.navigateBack(['/order', { tipe: this.tipe }]);
  }


  imageClick() {
    this.photoViewer.show(this.item.image);
  }


  showMore() {
    this.show = false;
  }

}
