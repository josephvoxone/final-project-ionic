import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CartService } from '../service/cart.service';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-prasmanan-detail',
  templateUrl: './prasmanan-detail.page.html',
  styleUrls: ['./prasmanan-detail.page.scss'],
})
export class PrasmananDetailPage implements OnInit {

  item: any = {};
  show: boolean = true;

  constructor(
    private cartService: CartService,
    private navCtrl: NavController,
    private photoViewer: PhotoViewer
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.item = JSON.parse(localStorage.getItem("passing"));
    console.log(this.item);
  }

  addProduct() {
    this.cartService.addItem(this.item);
    this.navCtrl.back();
  }

  imageClick() {
    this.photoViewer.show(this.item.image);
  }

  showMore(){
    this.show = false;
  }

}
