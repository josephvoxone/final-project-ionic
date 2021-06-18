import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { CartMealboxService } from '../service/cart-mealbox.service';
import { CartCbreakService } from '../service/cart-cbreak.service';

@Component({
  selector: 'app-cbreak-detail',
  templateUrl: './cbreak-detail.page.html',
  styleUrls: ['./cbreak-detail.page.scss'],
})
export class CbreakDetailPage implements OnInit {

  item: any = {};
  show: boolean = true;

  constructor(
    private cartService: CartCbreakService,
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
