import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { CartMealboxService } from '../service/cart-mealbox.service';

@Component({
  selector: 'app-mealbox-detail',
  templateUrl: './mealbox-detail.page.html',
  styleUrls: ['./mealbox-detail.page.scss'],
})
export class MealboxDetailPage implements OnInit {

  item: any = {};
  show: boolean = true;

  constructor(
    private cartService: CartMealboxService,
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
